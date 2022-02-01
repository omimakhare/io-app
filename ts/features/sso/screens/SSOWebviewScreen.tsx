import { Content } from "native-base";
import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { connect } from "react-redux";

import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import { Dispatch } from "../../../store/actions/types";
import { GlobalState } from "../../../store/reducers/types";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const styles = StyleSheet.create({
  flex: { flex: 1 }
});

const SSOWebviewScreen: React.FunctionComponent<Props> = (props: Props) => {
  // eslint-disable-next-line no-console
  console.log("Hello!");

  return (
    <BaseScreenComponent>
      <SafeAreaView style={styles.flex}>
        <Content contentContainerStyle={styles.flex}>
          <WebView source={{ uri: "https://postman-echo.com/get" }} />
        </Content>
      </SafeAreaView>
    </BaseScreenComponent>
  );
};
const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SSOWebviewScreen);
