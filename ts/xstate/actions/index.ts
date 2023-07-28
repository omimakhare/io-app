import { ActionType, createStandardAction } from "typesafe-actions";
import { DispatchedSupervisedEvent, StoredMachine } from "../helpers";

export const storedMachineRegisterAction = createStandardAction(
  "STORED_MACHINE_REGISTER"
)<StoredMachine>();

export const storedMachineRemoveAction = createStandardAction(
  "STORED_MACHINE_REMOVE"
)<{ id: StoredMachine["id"] }>();

export const storedMachineClearQueueAction = createStandardAction(
  "STORED_MACHINE_CLEAR_QUEUE"
)<{
  id: StoredMachine["id"];
}>();

export const storedMachineSendEventAction = createStandardAction(
  "STORED_MACHINE_SEND_EVENT"
)<DispatchedSupervisedEvent>();

export type XStateActions = ActionType<
  | typeof storedMachineRegisterAction
  | typeof storedMachineRemoveAction
  | typeof storedMachineClearQueueAction
  | typeof storedMachineSendEventAction
>;
