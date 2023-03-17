import { ActionType, createAction, createAsyncAction } from "typesafe-actions";
import { NetworkError } from "../../../../../utils/errors";

export const idPayUnsubscriptionBegin = createAction(
  "IDPAY_UNSUBSCRIPTION_BEGIN",
  resolve => (initiativeId: string, initiativeName?: string) =>
    resolve({
      initiativeId,
      initiativeName
    })
);

export const idPayUnsubscribe = createAsyncAction(
  "IDPAY_UNSUBSCRIBE_REQUEST",
  "IDPAY_UNSUBSCRIBE_SUCCESS",
  "IDPAY_UNSUBSCRIBE_FAILURE"
)<void, void, NetworkError>();

export const idPayUnsubscriptionExit = createAction(
  "IDPAY_UNSUBSCRIPTION_EXIT"
);

export type IDPayUnsubscriptionActions =
  | ActionType<typeof idPayUnsubscriptionBegin>
  | ActionType<typeof idPayUnsubscribe>
  | ActionType<typeof idPayUnsubscriptionExit>;
