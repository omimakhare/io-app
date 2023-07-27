// eslint-disable-next-line @jambit/typed-redux-saga/use-typed-effects
import { ActionType, createStandardAction } from "typesafe-actions";
import { DispatchedSupervisedEvent, StoredMachine } from "../helpers";

export const xstateRegisterMachine = createStandardAction(
  "XSTATE_REGISTER_MACHINE"
)<StoredMachine>();

export const xstateSendEvent =
  createStandardAction("XSTATE_SEND_EVENT")<DispatchedSupervisedEvent>();

export type XStateActions = ActionType<
  typeof xstateRegisterMachine | typeof xstateSendEvent
>;
