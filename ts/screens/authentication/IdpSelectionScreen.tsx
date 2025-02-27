import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { connect, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  IOColors,
  VSpacer,
  IOSpacingScale,
  ButtonOutline
} from "@pagopa/io-app-design-system";
import IdpsGrid from "../../components/IdpsGrid";
import BaseScreenComponent, {
  ContextualHelpPropsMarkdown
} from "../../components/screens/BaseScreenComponent";
import I18n from "../../i18n";
import { idpSelected } from "../../store/actions/authentication";
import { GlobalState } from "../../store/reducers/types";
import { idpsSelector, idpsStateSelector } from "../../store/reducers/content";
import { SpidIdp } from "../../../definitions/content/SpidIdp";
import { LocalIdpsFallback } from "../../utils/idps";
import { loadIdps } from "../../store/actions/content";
import LoadingSpinnerOverlay from "../../components/LoadingSpinnerOverlay";
import { isLoading } from "../../features/bonus/bpd/model/RemoteValue";
import { assistanceToolConfigSelector } from "../../store/reducers/backendStatus";
import {
  assistanceToolRemoteConfig,
  handleSendAssistanceLog
} from "../../utils/supportAssistance";
import ROUTES from "../../navigation/routes";
import { IOStackNavigationProp } from "../../navigation/params/AppParamsList";
import { AuthenticationParamsList } from "../../navigation/params/AuthenticationParamsList";
import { H1 } from "../../components/core/typography/H1";
import { IOStyles } from "../../components/core/variables/IOStyles";
import { IdpData } from "../../../definitions/content/IdpData";
import { nativeLoginSelector } from "../../features/nativeLogin/store/reducers";
import { isNativeLoginEnabledSelector } from "../../features/nativeLogin/store/selectors";
import { Body } from "../../components/core/typography/Body";
import { isFastLoginEnabledSelector } from "../../features/fastLogin/store/selectors";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const TestIdp: SpidIdp = {
  id: "test" as keyof IdpData,
  name: "Test Idp",
  logo: "https://raw.githubusercontent.com/pagopa/io-services-metadata/master/spid/idps/spid.png",
  profileUrl: "",
  isTestIdp: true
};

const TAPS_TO_OPEN_TESTIDP = 5;

const styles = StyleSheet.create({
  footerContainer: {
    shadowColor: IOColors.black,
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    backgroundColor: IOColors.white
  }
});

const contextualHelpMarkdown: ContextualHelpPropsMarkdown = {
  title: "authentication.idp_selection.contextualHelpTitle",
  body: "authentication.idp_selection.contextualHelpContent"
};

/**
 * A screen where the user choose the SPID IPD to login with.
 */
const IdpSelectionScreen = (props: Props): React.ReactElement => {
  const inset = useSafeAreaInsets();

  const [counter, setCounter] = useState(0);
  const { requestIdps, setSelectedIdp } = props;
  const choosenTool = assistanceToolRemoteConfig(props.assistanceToolConfig);

  const navigation =
    useNavigation<
      IOStackNavigationProp<
        AuthenticationParamsList,
        "AUTHENTICATION_IPD_SELECTION"
      >
    >();

  const isFastLoginFeatureFlagEnabled = useSelector(isFastLoginEnabledSelector);

  const isNativeLoginFeatureFlagEnabled = useSelector(
    isNativeLoginEnabledSelector
  );

  const isNativeLoginEnabled = () =>
    (Platform.OS !== "ios" ||
      (Platform.OS === "ios" && parseInt(Platform.Version, 10) > 13)) &&
    props.nativeLoginFeature.enabled &&
    isNativeLoginFeatureFlagEnabled;

  const onIdpSelected = (idp: LocalIdpsFallback) => {
    setSelectedIdp(idp);
    handleSendAssistanceLog(choosenTool, `IDP selected: ${idp.id}`);
    if (isNativeLoginEnabled()) {
      navigation.navigate(ROUTES.AUTHENTICATION, {
        screen: ROUTES.AUTHENTICATION_AUTH_SESSION
      });
    } else {
      navigation.navigate(ROUTES.AUTHENTICATION, {
        screen: ROUTES.AUTHENTICATION_IDP_LOGIN
      });
    }
  };

  const evokeLoginScreenCounter = () => {
    if (counter < TAPS_TO_OPEN_TESTIDP) {
      const newValue = (counter + 1) % (TAPS_TO_OPEN_TESTIDP + 1);
      setCounter(newValue);
    }
  };

  useEffect(() => {
    requestIdps();
  }, [requestIdps]);

  useEffect(() => {
    if (counter === TAPS_TO_OPEN_TESTIDP) {
      setCounter(0);
      setSelectedIdp(TestIdp);
      navigation.navigate(ROUTES.AUTHENTICATION, {
        screen: ROUTES.AUTHENTICATION_IDP_TEST
      });
    }
  }, [counter, setSelectedIdp, navigation]);

  const spacerComponent = () => <VSpacer size={24} />;

  const spacerFooter: IOSpacingScale = 16;

  const headerComponent = () => (
    <>
      <View style={IOStyles.horizontalContentPadding}>
        <VSpacer size={16} />
        {/* Secret login for App Store reviewers */}
        <Pressable accessible={false} onPress={evokeLoginScreenCounter}>
          {/* Add `accessible=false` 'cause it useful only
            for debug mode (stores reviewers).
            Original issue: https://www.pivotaltracker.com/story/show/172082895 */}
          <H1
            accessible={true}
            accessibilityRole="header"
            weight="Bold"
            testID={"screen-content-header-title"}
            color={"bluegreyDark"}
          >
            {I18n.t("authentication.idp_selection.contentTitle")}
          </H1>
        </Pressable>
        <Body>
          {isFastLoginFeatureFlagEnabled
            ? I18n.t("login.expiration_info_FL")
            : I18n.t("login.expiration_info")}
        </Body>
        <Body>{I18n.t("login.biometric_info")}</Body>
      </View>
      <VSpacer />
      <View style={{ backgroundColor: IOColors.greyUltraLight }}>
        <VSpacer size={24} />
      </View>
    </>
  );

  const footerComponent = () => (
    <View
      style={[
        styles.footerContainer,
        IOStyles.horizontalContentPadding,
        {
          // Avoid zero margin on iPhones with home button
          paddingBottom: inset.bottom === 0 ? spacerFooter : inset.bottom
        }
      ]}
    >
      <VSpacer size={spacerFooter} />
      <ButtonOutline
        fullWidth
        accessibilityLabel={I18n.t("global.buttons.cancel")}
        label={I18n.t("global.buttons.cancel")}
        onPress={navigation.goBack}
      />
    </View>
  );

  return (
    <BaseScreenComponent
      contextualHelpMarkdown={contextualHelpMarkdown}
      faqCategories={["authentication_IPD_selection"]}
      goBack={true}
      headerTitle={I18n.t("authentication.idp_selection.headerTitle")}
    >
      <LoadingSpinnerOverlay isLoading={props.isIdpsLoading}>
        <IdpsGrid
          idps={[...props.idps]}
          onIdpSelected={onIdpSelected}
          headerComponent={headerComponent}
          footerComponent={spacerComponent}
        />
        {footerComponent()}
      </LoadingSpinnerOverlay>
    </BaseScreenComponent>
  );
};

const mapStateToProps = (state: GlobalState) => ({
  idps: idpsSelector(state),
  isIdpsLoading: isLoading(idpsStateSelector(state)),
  assistanceToolConfig: assistanceToolConfigSelector(state),
  nativeLoginFeature: nativeLoginSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestIdps: () => dispatch(loadIdps.request()),
  setSelectedIdp: (idp: SpidIdp) => dispatch(idpSelected(idp))
});

export default connect(mapStateToProps, mapDispatchToProps)(IdpSelectionScreen);
