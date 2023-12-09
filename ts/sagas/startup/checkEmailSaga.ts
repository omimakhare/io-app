import { call, put, select, take } from "typed-redux-saga/macro";
import * as O from "fp-ts/lib/Option";
import * as pot from "@pagopa/ts-commons/lib/pot";
import { StackActions } from "@react-navigation/native";
import NavigationService from "../../navigation/NavigationService";
import ROUTES from "../../navigation/routes";
import {
  isProfileEmailValidated,
  isProfileEmailAlreadyTaken,
  profileSelector
} from "../../store/reducers/profile";
import { isNewCduFlow } from "../../config";
import { setEmailCheckAtStartupFailure } from "../../store/actions/profile";
import { emailAcknowledged } from "../../store/actions/onboarding";

export function* checkEmailSaga() {
  // We get the latest profile from the store
  const profile = yield* select(profileSelector);
  // When we use this saga, we are sure that the profile is not none
  if (pot.isSome(profile)) {
    // eslint-disable-next-line functional/no-let
    let userProfile = profile.value;
    if (isNewCduFlow && !isProfileEmailValidated(userProfile)) {
      yield* put(setEmailCheckAtStartupFailure(O.some(true)));
      if (isProfileEmailAlreadyTaken(userProfile)) {
        yield* call(NavigationService.navigate, ROUTES.CHECK_EMAIL, {
          screen: ROUTES.CHECK_EMAIL_ALREADY_TAKEN,
          params: { email: userProfile.email }
        });
      } else {
        yield* call(NavigationService.navigate, ROUTES.CHECK_EMAIL, {
          screen: ROUTES.CHECK_EMAIL_NOT_VERIFIED
        });
      }
      // Wait for the user to press "Continue" button after having checked out
      // his own email
      yield* take(emailAcknowledged);
      yield* call(
        NavigationService.dispatchNavigationAction,
        StackActions.popToTop()
      );

      // We get the latest profile from the store and return it
      const maybeUpdatedProfile = yield* select(profileSelector);
      if (pot.isSome(maybeUpdatedProfile)) {
        userProfile = maybeUpdatedProfile.value;
      }
    }
    return userProfile;
  }
  return undefined;
}
