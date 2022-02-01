import { NavigationActions } from "react-navigation";

import NavigationService from "../../../navigation/NavigationService";
import SSO_ROUTES from "./routes";

export const navigateToSSOLogin = () => 
  NavigationService.dispatchNavigationAction(
    NavigationActions.navigate({
      routeName: SSO_ROUTES.LOGIN
    })
  );

export const navigateToSSOWebview = () =>
  NavigationService.dispatchNavigationAction(
    NavigationActions.navigate({
      routeName: SSO_ROUTES.WEBVIEW
    })
  );
