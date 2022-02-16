import { View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";

import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import { Dispatch } from "../../../store/actions/types";
import { sessionTokenSelector } from "../../../store/reducers/authentication";
import { GlobalState } from "../../../store/reducers/types";
import { goBack } from "../navigation/action";
import { setFederationCookie } from "../utils/cookie";

type NavigationParams = Readonly<{
  uri: string;
}>;

type OwnProps = NavigationInjectedProps<NavigationParams>;

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const styles = StyleSheet.create({
  webViewWrapper: { flex: 1 }
});

// TODO: Add unset federation cookie on goBack
const SSOWebviewScreen: React.FunctionComponent<Props> = (props: Props) => {
  const sessionToken = props.sessionToken;

  // TODO: Bad code just for the demo
  const setInitialStatus = React.useCallback(async () => {
    if (sessionToken !== undefined) {
      try {
        await setFederationCookie(sessionToken);
        // eslint-disable-next-line no-console
        console.log("Federation token set");
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log("Error setting federation token");
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("Error setting federation token");
    }
  }, [sessionToken]);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setInitialStatus();
  }, [setInitialStatus]);

  const uri = props.navigation.getParam("uri");

  // TODO: Add other parameters to WebView component
  return (
    <BaseScreenComponent
      headerTitle="External site"
      goBack={props.handleGoBack}
    >
      <View style={styles.webViewWrapper}>
        <WebView source={{ uri }} />
      </View>
    </BaseScreenComponent>
  );
};
const mapStateToProps = (state: GlobalState) => ({
  sessionToken: sessionTokenSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleGoBack: () => goBack(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SSOWebviewScreen);
