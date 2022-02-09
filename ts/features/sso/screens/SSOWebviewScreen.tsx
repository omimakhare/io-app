import { View } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";

import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import { Dispatch } from "../../../store/actions/types";
import { GlobalState } from "../../../store/reducers/types";
import { goBack } from "../navigation/action";

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

const SSOWebviewScreen: React.FunctionComponent<Props> = (props: Props) => {
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
const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleGoBack: () => goBack(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SSOWebviewScreen);
