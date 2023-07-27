import React from "react";

import * as O from "fp-ts/lib/Option";
import * as X from "xstate";
import { useIODispatch, useIOSelector } from "../../store/hooks";
import { xstateRegisterMachine } from "../actions";
import { selectStoredMachine } from "../store";

/**
 * Wrapper around _useMachine_
 *
 * Machines are registered with the [[store]]. Events
 * are sent to the store rather than the _send_ function
 * returned by _useMachine_.
 *
 * @param machine
 */
const useSupervisedXStateMachine = <
  TContext,
  TEvent extends X.EventObject = X.AnyEventObject,
  TTypestate extends X.Typestate<TContext> = any
>(
  machine: X.StateMachine<TContext, any, TEvent, TTypestate>
) => {
  const dispatch = useIODispatch();
  const storedMachineOption = useIOSelector(selectStoredMachine(machine.id));

  React.useEffect(() => {
    if (O.isNone(storedMachineOption)) {
      dispatch(
        xstateRegisterMachine({
          id: machine.id,
          machine,
          eventQueue: [],
          state: machine.initialState
        })
      );
    }
  }, [dispatch, machine, storedMachineOption]);

  return undefined;
};

export { useSupervisedXStateMachine };
