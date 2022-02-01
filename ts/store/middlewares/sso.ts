// TODO: Update cookie manager
import CookieManager from "@react-native-community/cookies";

import { getType } from "typesafe-actions";
import { Action, Dispatch, MiddlewareAPI } from "../actions/types";
import { loginSuccess } from "../actions/authentication";

const SSO_DOMAIN = "https://postman-echo.com";
const SSO_TOKEN_NAME = "X-IO-Federation-Token";

export const middleware =
  (_: MiddlewareAPI) =>
  (next: Dispatch) =>
  (action: Action): Action => {
    switch (action.type) {
      case getType(loginSuccess): {
        CookieManager.set(SSO_DOMAIN, {
          name: SSO_TOKEN_NAME,
          value: action.payload.token
          // TODO: Set expiration
        })
          .then(done => {
            if (done) {
              // eslint-disable-next-line no-console
              console.log(`SSO cookie set: ${action.payload.token}`);
            } else {
              // eslint-disable-next-line no-console
              console.log(`Error setting SSO cookie`);
            }
          })
          .catch(_ => undefined);
      }
    }
    return next(action);
  };
