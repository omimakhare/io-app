import { createStackNavigator } from "react-navigation-stack";

import SSOLoginScreen from "../screens/SSOLoginScreen";
import SSOMainScreen from "../screens/SSOMainScreen";
import SSOWebviewScreen from "../screens/SSOWebviewScreen";
import SSO_ROUTES from "./routes";

export const SSONavigator = createStackNavigator(
  {
    [SSO_ROUTES.MAIN]: { screen: SSOMainScreen },
    [SSO_ROUTES.LOGIN]: { screen: SSOLoginScreen },
    [SSO_ROUTES.WEBVIEW]: { screen: SSOWebviewScreen }
  },
  {
    // Let each screen handles the header and navigation
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
