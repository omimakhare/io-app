import { RouteProp, useRoute } from "@react-navigation/native";
import { useSelector } from "@xstate/react";
import { ListItem as NBListItem } from "native-base";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { SelfConsentDTO } from "../../../../../definitions/idpay/onboarding/SelfConsentDTO";
import { VSpacer } from "../../../../components/core/spacer/Spacer";
import { Body } from "../../../../components/core/typography/Body";
import { H1 } from "../../../../components/core/typography/H1";
import { H4 } from "../../../../components/core/typography/H4";
import { Link } from "../../../../components/core/typography/Link";
import { IOColors } from "../../../../components/core/variables/IOColors";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import BaseScreenComponent from "../../../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../../../components/ui/FooterWithButtons";
import IconFont from "../../../../components/ui/IconFont";
import I18n from "../../../../i18n";
import { IDPayOnboardingParamsList } from "../navigation/navigator";
import { useOnboardingMachineService } from "../xstate/provider";
import {
  multiRequiredCriteriaSelector,
  selectMultiConsents
} from "../xstate/selectors";

const styles = StyleSheet.create({
  maxheight: {
    height: "100%"
  }
});

type ListItemProps = {
  text: string;
  checked: boolean;
  onPress: () => void;
};

const CustomListItem = ({ text, onPress, checked }: ListItemProps) => (
  <NBListItem
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12
    }}
    onPress={onPress}
  >
    <H4 weight={checked ? "SemiBold" : "Regular"} color={"bluegreyDark"}>
      {text}
    </H4>
    <IconFont
      name={checked ? "io-radio-on" : "io-radio-off"}
      size={22}
      color={checked ? IOColors.blue : IOColors.bluegrey}
    />
  </NBListItem>
);

type MultiValuePrerequisitesScreenRouteParams = {
  index: number;
};

type MultiValuePrerequisitesRouteProps = RouteProp<
  IDPayOnboardingParamsList,
  "IDPAY_ONBOARDING_MULTI_SELF_DECLARATIONS"
>;

const MultiValuePrerequisitesScreen = () => {
  const { params } = useRoute<MultiValuePrerequisitesRouteProps>();
  const machine = useOnboardingMachineService();

  const criteriaList = useSelector(machine, multiRequiredCriteriaSelector);
  const selectedCriteria = criteriaList[params.index];

  const userConsents = useSelector(machine, selectMultiConsents);
  const currentChoice = userConsents[selectedCriteria.code]?.value;
  const currentChoiceIndex =
    currentChoice !== undefined
      ? selectedCriteria?.value.indexOf(currentChoice)
      : undefined;

  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>(
    currentChoiceIndex
  );

  const handleGoBack = () => machine.send({ type: "GO_BACK" });

  const continueOnPress = () => {
    if (selectedIndex === undefined) {
      return;
    }

    const data: SelfConsentDTO = {
      ...selectedCriteria,
      value: selectedCriteria.value[selectedIndex]
    };

    machine.send({
      type: "ACCEPT_REQUIRED_MULTI_CRITERIA",
      data
    });
  };

  if (selectedCriteria === undefined) {
    return null;
  }

  return (
    <SafeAreaView style={IOStyles.flex}>
      <BaseScreenComponent
        goBack={handleGoBack}
        headerTitle={I18n.t("idpay.onboarding.headerTitle")}
      >
        <View style={IOStyles.horizontalContentPadding}>
          <H1>{I18n.t("idpay.onboarding.multiPrerequisites.header")}</H1>
          <VSpacer size={16} />
          <Body>{I18n.t("idpay.onboarding.multiPrerequisites.body")}</Body>
          <Link>{I18n.t("idpay.onboarding.multiPrerequisites.link")}</Link>
          <VSpacer size={24} />
          <H4>{selectedCriteria.description}</H4>
          <ScrollView style={styles.maxheight}>
            {selectedCriteria.value.map((requisite, index) => (
              <CustomListItem
                key={index}
                text={requisite}
                checked={index === selectedIndex}
                onPress={() => setSelectedIndex(index)}
              />
            ))}
          </ScrollView>
        </View>
      </BaseScreenComponent>
      <FooterWithButtons
        type="TwoButtonsInlineHalf"
        leftButton={{
          onPress: handleGoBack,
          title: I18n.t("global.buttons.back"),
          bordered: true
        }}
        rightButton={{
          onPress: continueOnPress,
          disabled: selectedIndex === undefined,
          title: I18n.t("global.buttons.continue"),
          bordered: false
        }}
      />
    </SafeAreaView>
  );
};

export type { MultiValuePrerequisitesScreenRouteParams };

export default MultiValuePrerequisitesScreen;
