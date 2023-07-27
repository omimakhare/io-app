import { AnyDispatchedEvent, StoredMachine } from "../helpers";

/**
 * The only type of reducer you'll see here.
 *
 * @param state A storedMachine
 * @param event An event targetting this storedMachine.
 */
export default (
  state: StoredMachine,
  event: AnyDispatchedEvent
): StoredMachine => {
  if (state.service) {
    // If the storedMachine's service is live, fire away and compute it's next state.
    const next = state.service.send(event);

    // Only mutate store state if changes have happened.
    if (next.changed) {
      return {
        ...state,
        state: next
      };
    }

    return state;
  } else {
    // Queue the event. Event will be dispatched as soon as the machine is live.
    return {
      ...state,
      eventQueue: [...state.eventQueue, event]
    };
  }
};
