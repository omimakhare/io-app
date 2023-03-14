import * as pot from "@pagopa/ts-commons/lib/pot";
import { createSelector } from "reselect";
import { getType } from "typesafe-actions";
import I18n from "../../../../i18n";
import { Action } from "../../../../store/actions/types";
import { GlobalState } from "../../../../store/reducers/types";
import { NetworkError } from "../../../../utils/errors";
import {
  idPayUnsubscribe,
  idPayUnsubscriptionCheckToggle,
  idPayUnsubscriptionReset
} from "./actions";

type UnsubscriptionCheck = {
  title: string;
  subtitle: string;
  value: boolean;
};

export type IDPayUnsubscriptionState = {
  unsubscriptionRequest: pot.Pot<void, NetworkError>;
  checks: ReadonlyArray<UnsubscriptionCheck>;
};

const INITIAL_STATE: IDPayUnsubscriptionState = {
  unsubscriptionRequest: pot.none,
  checks: [
    {
      title: I18n.t("idpay.unsubscription.checks.1.title"),
      subtitle: I18n.t("idpay.unsubscription.checks.1.content"),
      value: false
    },
    {
      title: I18n.t("idpay.unsubscription.checks.2.title"),
      subtitle: I18n.t("idpay.unsubscription.checks.2.content"),
      value: false
    },
    {
      title: I18n.t("idpay.unsubscription.checks.3.title"),
      subtitle: I18n.t("idpay.unsubscription.checks.3.content"),
      value: false
    },
    {
      title: I18n.t("idpay.unsubscription.checks.4.title"),
      subtitle: I18n.t("idpay.unsubscription.checks.4.content"),
      value: false
    }
  ]
};

const reducer = (
  state: IDPayUnsubscriptionState = INITIAL_STATE,
  action: Action
): IDPayUnsubscriptionState => {
  switch (action.type) {
    case getType(idPayUnsubscriptionReset):
      return INITIAL_STATE;
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
    case getType(idPayUnsubscriptionCheckToggle):
      const index = action.payload.index;
      return {
        ...state,
        checks: [
          ...state.checks.slice(0, index),
          {
            ...state.checks[index],
            value: !state.checks[index].value
          },
          ...state.checks.slice((index as number) + 1)
        ]
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

export const unsubscriptionChecksSelector = createSelector(
  selectUnsubscription,
  unsubscription => unsubscription.checks
);

export const areChecksFullfilledSelector = createSelector(
  unsubscriptionChecksSelector,
  checks => !checks.find(c => !c.value)
);

export default reducer;
