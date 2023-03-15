import { ActionType, createAction, createAsyncAction } from "typesafe-actions";
import { NetworkError } from "../../../../../utils/errors";

export const idPayUnsubscriptionReset = createAction(
  "IDPAY_UNSUBSCRIPTION_RESET"
);

export type IdPayUnsubscribePayloadType = { initiativeId: string };

export const idPayUnsubscribe = createAsyncAction(
  "IDPAY_UNSUBSCRIBE_REQUEST",
  "IDPAY_UNSUBSCRIBE_SUCCESS",
  "IDPAY_UNSUBSCRIBE_FAILURE"
)<IdPayUnsubscribePayloadType, void, NetworkError>();

export type IDPayUnsubscriptionActions =
  | ActionType<typeof idPayUnsubscriptionReset>
  | ActionType<typeof idPayUnsubscribe>;
