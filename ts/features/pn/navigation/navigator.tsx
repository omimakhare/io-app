import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { isGestureEnabled } from "../../../utils/navigation";
import { MessageDetailsScreen } from "../screens/MessageDetailsScreen";
import { PnMessageDetailsScreen } from "../screens/PnMessageDetailsScreen";
import { PnAttachmentPreview } from "../screens/PnAttachmentPreview";
import { PnPaidPaymentScreen } from "../screens/PnPaidPaymentScreen";
import { pnNoticesF24Enabled } from "../../../config";
import { PnParamsList } from "./params";
import PN_ROUTES from "./routes";

const Stack = createStackNavigator<PnParamsList>();

export const PnStackNavigator = () => (
  <Stack.Navigator
    initialRouteName={PN_ROUTES.MESSAGE_DETAILS}
    headerMode={"none"}
    screenOptions={{ gestureEnabled: isGestureEnabled }}
  >
    <Stack.Screen
      name={PN_ROUTES.MESSAGE_DETAILS}
      component={
        pnNoticesF24Enabled ? MessageDetailsScreen : PnMessageDetailsScreen
      }
    />
    <Stack.Screen
      name={PN_ROUTES.MESSAGE_ATTACHMENT}
      component={PnAttachmentPreview}
    />
    <Stack.Screen
      name={PN_ROUTES.CANCELLED_MESSAGE_PAID_PAYMENT}
      component={PnPaidPaymentScreen}
    />
  </Stack.Navigator>
);
