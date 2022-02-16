import CookieManager from "@react-native-community/cookies";

import { SessionToken } from "../../../types/SessionToken";

// TODO: Move to configuration
const SSO_DOMAIN = "https://fim-dev-app-provider.azurewebsites.net";
const SSO_TOKEN_NAME = "X-IO-Federation-Token";

function setFederationCookie(sessionToken: SessionToken) {
  return CookieManager.set(SSO_DOMAIN, {
    name: SSO_TOKEN_NAME,
    value: sessionToken
    // TODO: Set expiration
  });
}

function unsetFederationCookie() {
  return CookieManager.clearByName(SSO_DOMAIN, SSO_TOKEN_NAME);
}

export { setFederationCookie, unsetFederationCookie };
