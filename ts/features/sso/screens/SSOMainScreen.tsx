import { Button, Content, Text } from "native-base";
import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";

import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import { Dispatch } from "../../../store/actions/types";
import { GlobalState } from "../../../store/reducers/types";
import { navigateToSSOLogin } from "../navigation/action";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const styles = StyleSheet.create({
  flex: { flex: 1 }
});

const SSOMainScreen: React.FunctionComponent<Props> = (props: Props) => (
    <BaseScreenComponent>
      <SafeAreaView style={styles.flex}>
        <Content contentContainerStyle={styles.flex}>
          <Button onPress={navigateToSSOLogin}>
            <Text>Scan QRCODE</Text>
          </Button>
        </Content>
      </SafeAreaView>
    </BaseScreenComponent>
  );
const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SSOMainScreen);
