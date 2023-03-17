import * as pot from "@pagopa/ts-commons/lib/pot";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { createSelector } from "reselect";
import { getType } from "typesafe-actions";
import { Action } from "../../../../store/actions/types";
import { GlobalState } from "../../../../store/reducers/types";
import { NetworkError } from "../../../../utils/errors";
import {
  idPayUnsubscribe,
  idPayUnsubscriptionBegin,
  idPayUnsubscriptionExit
} from "./actions";

export type IDPayUnsubscriptionState = {
  unsubscriptionRequest: pot.Pot<void, NetworkError>;
  initiativeId: O.Option<string>;
  initiativeName: O.Option<string>;
};

const INITIAL_STATE: IDPayUnsubscriptionState = {
  unsubscriptionRequest: pot.none,
  initiativeId: O.none,
  initiativeName: O.none
};

const reducer = (
  state: IDPayUnsubscriptionState = INITIAL_STATE,
  action: Action
): IDPayUnsubscriptionState => {
  switch (action.type) {
    case getType(idPayUnsubscriptionBegin):
      return {
        ...INITIAL_STATE,
        initiativeId: O.some(action.payload.initiativeId),
        initiativeName: O.fromNullable(action.payload.initiativeName)
      };
    case getType(idPayUnsubscribe.request):
      return {
        ...state,
        unsubscriptionRequest: pot.noneLoading
      };
    case getType(idPayUnsubscribe.success):
      return {
        ...state,
        unsubscriptionRequest: pot.some(undefined)
      };
    case getType(idPayUnsubscribe.failure):
      return {
        ...state,
        unsubscriptionRequest: pot.toError(
          state.unsubscriptionRequest,
          action.payload
        )
      };
  }
  return state;
};

const selectUnsubscription = (state: GlobalState) =>
  state.features.idPay.unsubscription;

export const unsubscriptionRequestSelector = createSelector(
  selectUnsubscription,
  unsubscription => unsubscription.unsubscriptionRequest
);

export const initiativeIdSelector = createSelector(
  selectUnsubscription,
  unsubscription => unsubscription.initiativeId
);

export const initiativeNameSelector = createSelector(
  selectUnsubscription,
  unsubscription =>
    pipe(
      unsubscription.initiativeName,
      O.getOrElse(() => "")
    )
);

export default reducer;
