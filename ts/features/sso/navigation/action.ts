import { NavigationActions } from "react-navigation";

import NavigationService from "../../../navigation/NavigationService";
import { InferNavigationParams } from "../../../types/react";
import SSOWebviewScreen from "../screens/SSOWebviewScreen";
import SSO_ROUTES from "./routes";

export const navigateToSSOLogin = () =>
  NavigationService.dispatchNavigationAction(
    NavigationActions.navigate({
      routeName: SSO_ROUTES.LOGIN
    })
  );

export const navigateToSSOWebview = (
  params: InferNavigationParams<typeof SSOWebviewScreen>
) =>
  NavigationService.dispatchNavigationAction(
    NavigationActions.navigate({
      routeName: SSO_ROUTES.WEBVIEW,
      params
    })
  );
