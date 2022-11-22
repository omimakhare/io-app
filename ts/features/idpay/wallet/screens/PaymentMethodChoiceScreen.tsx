import { List, ListItem, Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { H1 } from "../../../../components/core/typography/H1";
import { H4 } from "../../../../components/core/typography/H4";
import { IOStyles } from "../../../../components/core/variables/IOStyles";
import BaseScreenComponent from "../../../../components/screens/BaseScreenComponent";
import FooterWithButtons from "../../../../components/ui/FooterWithButtons";

const styles = StyleSheet.create({
  ListItemMain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const CustomListItem = () => (
  <ListItem>
    <View style={styles.ListItemMain}>
      <H4>Carta di credito</H4>
      <Text>***</Text>
    </View>
  </ListItem>
);

const PaymentMethodChoiceScreen = () => (
  <>
    <BaseScreenComponent goBack={true} headerTitle="Iniziativa">
      <View spacer />
      <View style={IOStyles.horizontalContentPadding}>
        <H1>Scegli quali metodi di pagamento associare</H1>
        <Text>
          Poi, usali per pagare e chiedi all’esercente di usare Iniziativa 1.
        </Text>
        <View spacer />
        <List>
          <CustomListItem />
          <CustomListItem />
        </List>
        <Text>
          Modifica queste scelte o aggiungi altri metodi in qualsiasi momento
          dalla sezione Portafoglio
        </Text>
      </View>
    </BaseScreenComponent>
    <FooterWithButtons
      type="TwoButtonsInlineHalf"
      leftButton={{ title: "Nessuno di questi", block: true, bordered: true }}
      rightButton={{
        title: "Continua",
        block: true,
        bordered: false,
        disabled: true
      }}
    />
  </>
);

export default PaymentMethodChoiceScreen;
