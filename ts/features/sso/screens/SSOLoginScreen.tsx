import { Content } from "native-base";
import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { BarCodeReadEvent } from "react-native-camera";
import QRCodeScanner from "react-native-qrcode-scanner";
import { connect } from "react-redux";

import BaseScreenComponent from "../../../components/screens/BaseScreenComponent";
import { Dispatch } from "../../../store/actions/types";
import { GlobalState } from "../../../store/reducers/types";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const styles = StyleSheet.create({
  flex: { flex: 1 }
});

const onQRCodeRead = (e: BarCodeReadEvent) => {
  // eslint-disable-next-line no-console
  console.log("QRCode date", e.data);
};

const SSOLoginScreen: React.FunctionComponent<Props> = (props: Props) => {
  const qrCodeScanner = React.createRef<QRCodeScanner>();

  return (
    <BaseScreenComponent>
      <SafeAreaView style={styles.flex}>
        <Content contentContainerStyle={styles.flex}>
          <QRCodeScanner ref={qrCodeScanner} onRead={onQRCodeRead} />
        </Content>
      </SafeAreaView>
    </BaseScreenComponent>
  );
};
const mapStateToProps = (state: GlobalState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SSOLoginScreen);
