import * as React from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SafeAreaView, ScrollView } from "react-native";
import { isSome } from "fp-ts/lib/Option";
import BaseScreenComponent from "../../../../../components/screens/BaseScreenComponent";
import ListItemComponent from "../../../../../components/screens/ListItemComponent";
import TextboxWithSuggestion from "../../../../../components/ui/TextboxWithSuggestion";
import { emptyContextualHelp } from "../../../../../utils/emptyContextualHelp";
import { IOStyles } from "../../../../../components/core/variables/IOStyles";
import { H1 } from "../../../../../components/core/typography/H1";
import { GlobalState } from "../../../../../store/reducers/types";
import {
  svGenerateVoucherAvailableMunicipality,
  svGenerateVoucherBack,
  svGenerateVoucherCancel,
  svGenerateVoucherFailure,
  svGenerateVoucherSelectUniversity
} from "../../store/actions/voucherGeneration";
import FooterWithButtons from "../../../../../components/ui/FooterWithButtons";
import { University } from "../../types/SvVoucherRequest";
import { selectedBeneficiaryCategorySelector } from "../../store/reducers/voucherGeneration/voucherRequest";
import { navigateToSvSelectFlightsDateScreen } from "../../navigation/actions";
import I18n from "../../../../../i18n";

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const StudentSelectDestinationScreen = (
  props: Props
): React.ReactElement | null => {
  const elementRef = useRef(null);
  const backButtonProps = {
    primary: false,
    bordered: true,
    onPress: props.back,
    title: "Back"
  };
  const continueButtonProps = {
    primary: false,
    bordered: true,
    onPress: props.navigateToSelectFlightsDateScreen,
    title: "Continue"
  };

  if (
    isSome(props.selectedBeneficiaryCategory) &&
    props.selectedBeneficiaryCategory.value !== "student"
  ) {
    props.failure("The selected category is not Student");
    return null;
  }

  return (
    <BaseScreenComponent
      goBack={true}
      contextualHelp={emptyContextualHelp}
      headerTitle={I18n.t("bonus.sv.headerTitle")}
    >
      <SafeAreaView
        style={IOStyles.flex}
        testID={"StudentSelectDestinationScreen"}
        ref={elementRef}
      >
        <ScrollView style={[IOStyles.horizontalContentPadding]}>
          <H1>
            {I18n.t(
              "bonus.sv.voucherGeneration.student.selectDestination.title"
            )}
          </H1>
          <TextboxWithSuggestion<string>
            data={props.data}
            renderItem={s => (
              <ListItemComponent title={s.item} subTitle={s.item} />
            )}
            onChangeText={t => props.municipality()}
          />
        </ScrollView>
        <FooterWithButtons
          type={"TwoButtonsInlineHalf"}
          leftButton={backButtonProps}
          rightButton={continueButtonProps}
        />
      </SafeAreaView>
    </BaseScreenComponent>
  );
};

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  back: () => dispatch(svGenerateVoucherBack()),
  cancel: () => dispatch(svGenerateVoucherCancel()),
  municipality: () =>
    dispatch(svGenerateVoucherAvailableMunicipality.request("asd")),
  failure: (reason: string) => dispatch(svGenerateVoucherFailure(reason)),
  selectUniversity: (university: University) =>
    dispatch(svGenerateVoucherSelectUniversity(university)),
  navigateToSelectFlightsDateScreen: () => navigateToSvSelectFlightsDateScreen()
});
const mapStateToProps = (state: GlobalState) => {
  console.log("state update");
  return {
    selectedBeneficiaryCategory: selectedBeneficiaryCategorySelector(state),
    data: [makeid(1), makeid(1)]
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentSelectDestinationScreen);
