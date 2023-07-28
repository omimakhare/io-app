import { createSelector } from "reselect";
import * as O from "fp-ts/lib/Option";
import { getType } from "typesafe-actions";
import { Action } from "../../store/actions/types";
import { GlobalState } from "../../store/reducers/types";
import {
  xstateDeregisterMachine,
  xstateRegisterMachine,
  xstateSendEvent
} from "../actions";
import { StoredMachine } from "../helpers";
import storedMachineReducer from "./storedMachineReducer";

export type StoredMachinesState = Record<string, StoredMachine>;

/**
 * The Redux store reducer.
 * @param state A map of storedMachines
 * @param event Any event.
 */
export default function storedMachinesReducer(
  state: StoredMachinesState = {},
  action: Action
): StoredMachinesState {
  switch (action.type) {
    case getType(xstateRegisterMachine):
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case getType(xstateDeregisterMachine):
      return Object.keys(state).reduce(
        (acc, nextId) =>
          nextId === action.payload.id
            ? acc
            : {
                ...acc,
                [nextId]: state[nextId]
              },
        {}
      );
    case getType(xstateSendEvent):
      const event = action.payload;

      // If the event is an array, send each event in the array to the machines reducer.
      if (Array.isArray(event)) {
        return event.reduce(
          (acc, nextEvent) =>
            storedMachinesReducer(acc, xstateSendEvent(nextEvent)),
          state
        );
      }

      // If the event is targetting multiple machines, send each event to the machines reducer.
      if (Array.isArray(event.to)) {
        const events = event.to.map(id => ({
          ...event,
          to: id
        }));

        return storedMachinesReducer(state, xstateSendEvent(events));
      }

      // If the event is targetting a single machine, send it to the machine reducer.
      const storedMachine = state[event.to];

      if (storedMachine) {
        return {
          ...state,
          [event.to]: storedMachineReducer(state[event.to], event)
        };
      }

      return state;

    default:
      return state;
  }
}

export const storedMachinesSelector = (state: GlobalState) =>
  state.storedMachines;

export const selectStoredMachine = (id: string) =>
  createSelector(
    storedMachinesSelector,
    (storedMachines: StoredMachinesState): O.Option<StoredMachine> =>
      O.fromNullable(storedMachines[id])
  );

export const selectStoredMachineContext = <T>(id: string) =>
  createSelector(
    selectStoredMachine(id),
    O.map(machine => machine.machine.context as T)
  );
