import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { call, put, select } from "typed-redux-saga/macro";
import { PreferredLanguageEnum } from "../../../../../definitions/backend/PreferredLanguage";
import { SagaCallReturnType } from "../../../../types/utils";
import { getGenericError, getNetworkError } from "../../../../utils/errors";
import { readablePrivacyReport } from "../../../../utils/reporters";
import { IDPayClient } from "../../common/api/client";
import { initiativeIdSelector } from "../store";
import { idPayUnsubscribe } from "../store/actions";

export function* handleUnsubscribe(
  unsubscribe: IDPayClient["unsubscribe"],
  token: string,
  language: PreferredLanguageEnum
) {
  const initiativeIdOption = yield* select(initiativeIdSelector);

  if (O.isSome(initiativeIdOption)) {
    try {
      const unsubscribeResult: SagaCallReturnType<typeof unsubscribe> =
        yield* call(unsubscribe, {
          bearerAuth: token,
          "Accept-Language": language,
          initiativeId: initiativeIdOption.value
        });
      yield pipe(
        unsubscribeResult,
        E.fold(
          error =>
            put(
              idPayUnsubscribe.failure({
                ...getGenericError(new Error(readablePrivacyReport(error)))
              })
            ),
          response =>
            put(
              response.status === 200
                ? idPayUnsubscribe.success(response.value)
                : idPayUnsubscribe.failure({
                    ...getGenericError(
                      new Error(`response status code ${response.status}`)
                    )
                  })
            )
        )
      );
    } catch (e) {
      yield* put(idPayUnsubscribe.failure({ ...getNetworkError(e) }));
    }
  } else {
    yield* put(
      idPayUnsubscribe.failure({
        ...getGenericError(new Error("undefined initiativeId"))
      })
    );
  }
}
