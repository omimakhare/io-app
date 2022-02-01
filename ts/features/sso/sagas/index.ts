import CookieManager from "@react-native-community/cookies";
import { fork, call, Effect, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { loginSuccess } from "../../../store/actions/authentication";
import { SessionToken } from "../../../types/SessionToken";

// TODO: Move to configuration
const SSO_DOMAIN = "https://postman-echo.com";
const SSO_TOKEN_NAME = "X-IO-Federation-Token";

type LoginSuccessType = ActionType<typeof loginSuccess>;

function setFederationCookie(sessionToken: SessionToken) {
  return CookieManager.set(SSO_DOMAIN, {
    name: SSO_TOKEN_NAME,
    value: sessionToken
    // TODO: Set expiration
  });
}

function* handleLoginSuccess(
  action: LoginSuccessType
): Generator<Effect, void, any> {
  try {
    yield call(setFederationCookie, action.payload.token);
    // eslint-disable-next-line no-console
    console.log("Federation cookie set");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("Error setting federation cookie");
  }
}

function* watchLoginSuccessSaga() {
  // eslint-disable-next-line no-console
  console.log("SSO: watchLoginSuccessSaga started");
  yield takeLatest(getType(loginSuccess), handleLoginSuccess);
}

export function* ssoSaga() {
  yield fork(watchLoginSuccessSaga);
}
