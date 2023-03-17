import * as pot from "@pagopa/ts-commons/lib/pot";
import { StackActions } from "@react-navigation/compat";
import { CommonActions } from "@react-navigation/native";
import { call, select } from "typed-redux-saga/macro";
import NavigationService from "../../../../navigation/NavigationService";
import ROUTES from "../../../../navigation/routes";
import { IDPayUnsubscriptionRoutes } from "../navigation/navigator";
import { unsubscriptionRequestSelector } from "../store";

const navigateToConfirmationScreen = () => {
  NavigationService.dispatchNavigationAction(
    CommonActions.navigate(
      IDPayUnsubscriptionRoutes.IDPAY_UNSUBSCRIPTION_MAIN,
      {
        screen: IDPayUnsubscriptionRoutes.IDPAY_UNSUBSCRIPTION_CONFIRMATION
      }
    )
  );
};

const navigateToWallet = () => {
  NavigationService.dispatchNavigationAction(
    CommonActions.navigate(ROUTES.MAIN, {
      screen: ROUTES.WALLET_HOME,
      params: { newMethodAdded: false }
    })
  );
};

const navigateToUnsubscriptionSuccessScreen = () => {
  NavigationService.dispatchNavigationAction(
    CommonActions.navigate(
      IDPayUnsubscriptionRoutes.IDPAY_UNSUBSCRIPTION_MAIN,
      {
        screen: IDPayUnsubscriptionRoutes.IDPAY_UNSUBSCRIPTION_SUCCESS
      }
    )
  );
};

const navigateToUnsubscriptionFailureScreen = () => {
  NavigationService.dispatchNavigationAction(
    CommonActions.navigate(
      IDPayUnsubscriptionRoutes.IDPAY_UNSUBSCRIPTION_MAIN,
      {
        screen: IDPayUnsubscriptionRoutes.IDPAY_UNSUBSCRIPTION_FAILURE
      }
    )
  );
};

export function* handleUnsubscriptionBegin() {
  yield* call(navigateToConfirmationScreen);
}

export function* handleUnsubscriptionSuccess() {
  yield* call(navigateToUnsubscriptionSuccessScreen);
}

export function* handleUnsubscriptionFailure() {
  yield* call(navigateToUnsubscriptionFailureScreen);
}

export function* handleUnsubscriptionExit() {
  const requestPot = yield* select(unsubscriptionRequestSelector);

  if (pot.isError(requestPot)) {
    yield* call(
      NavigationService.dispatchNavigationAction,
      StackActions.popToTop()
    );
  } else {
    yield* call(
      NavigationService.dispatchNavigationAction,
      StackActions.popToTop()
    );
    yield* call(navigateToWallet);
  }
}
