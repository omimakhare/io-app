import { Content } from "native-base";
import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";

import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import { Dispatch } from "../../../store/actions/types";
import { GlobalState } from "../../../store/reducers/types";

type NavigationParams = Readonly<{
  uri: string;
}>;

type OwnProps = NavigationInjectedProps<NavigationParams>;

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const styles = StyleSheet.create({
  flex: { flex: 1 }
});

const SSOWebviewScreen: React.FunctionComponent<Props> = (props: Props) => {
  // eslint-disable-next-line no-console
  console.log("Hello!");
  const uri = props.navigation.getParam("url");

  return (
    <BaseScreenComponent>
      <SafeAreaView style={styles.flex}>
        <Content contentContainerStyle={styles.flex}>
          <WebView source={{ uri }} />
        </Content>
      </SafeAreaView>
    </BaseScreenComponent>
  );
};
const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SSOWebviewScreen);
