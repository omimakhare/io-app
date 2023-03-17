import { SagaIterator } from "redux-saga";
import { call, takeLatest } from "typed-redux-saga/macro";
import { PreferredLanguageEnum } from "../../../../../definitions/backend/PreferredLanguage";
import { waitBackoffError } from "../../../../utils/backoffError";
import { IDPayClient } from "../../common/api/client";
import {
  idPayUnsubscribe,
  idPayUnsubscriptionBegin,
  idPayUnsubscriptionExit
} from "../store/actions";
import {
  handleUnsubscriptionBegin,
  handleUnsubscriptionExit,
  handleUnsubscriptionFailure,
  handleUnsubscriptionSuccess
} from "./handleNavigation";
import { handleUnsubscribe } from "./handleUnsubscribe";

export function* watchIDPayUnsubscribeSaga(
  idPayClient: IDPayClient,
  token: string,
  preferredLanguage: PreferredLanguageEnum
): SagaIterator {
  yield* takeLatest(idPayUnsubscriptionBegin, function* () {
    // wait backoff time if there were previous errors
    yield* call(handleUnsubscriptionBegin);
  });

  yield* takeLatest(idPayUnsubscribe.request, function* () {
    // wait backoff time if there were previous errors
    yield* call(waitBackoffError, idPayUnsubscribe.failure);
    yield* call(
      handleUnsubscribe,
      idPayClient.unsubscribe,
      token,
      preferredLanguage
    );
  });

  yield* takeLatest(idPayUnsubscribe.success, function* () {
    // wait backoff time if there were previous errors
    yield* call(handleUnsubscriptionSuccess);
  });

  yield* takeLatest(idPayUnsubscribe.failure, function* () {
    // wait backoff time if there were previous errors
    yield* call(handleUnsubscriptionFailure);
  });

  yield* takeLatest(idPayUnsubscriptionExit, function* () {
    // wait backoff time if there were previous errors
    yield* call(handleUnsubscriptionExit);
  });
}
