/* eslint-disable sonarjs/prefer-immediate-return */
import React from "react";

import { useInterpret } from "@xstate/react";
import { UseMachineOptions } from "@xstate/react/lib/types";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import * as X from "xstate";
import { IDPAY_ONBOARDING_MACHINE_ID } from "../../features/idpay/onboarding/xstate/machine";
import { useIODispatch, useIOSelector } from "../../store/hooks";
import {
  xstateClearQueue,
  xstateDeregisterMachine,
  xstateRegisterMachine,
  xstateSendEvent
} from "../actions";
import { selectStoredMachine } from "../store";

type MachineCreatorFn<TMachine extends X.AnyStateMachine> = () => TMachine;
type MachineOptions<TMachine extends X.AnyStateMachine> = X.InterpreterOptions &
  UseMachineOptions<TMachine["__TContext"], TMachine["__TEvent"]> &
  X.InternalMachineOptions<
    TMachine["__TContext"],
    TMachine["__TEvent"],
    TMachine["__TResolvedTypesMeta"],
    true
  >;

/**
 * Wrapper around _useMachine_
 *
 * Machines are registered with the [[store]]. Events
 * are sent to the store rather than the _send_ function
 * returned by _useMachine_.
 *
 * @param machine
 */
const useStoredXStateMachine = <TMachine extends X.AnyStateMachine>(
  machineFn: MachineCreatorFn<TMachine>,
  options: MachineOptions<TMachine>
): [TMachine, X.InterpreterFrom<TMachine>] => {
  const dispatch = useIODispatch();
  const machineRef = React.useRef<TMachine | undefined>(undefined);
  const storedMachineOption = useIOSelector(
    selectStoredMachine(IDPAY_ONBOARDING_MACHINE_ID)
  );

  // Create the machine if first mount
  if (machineRef.current === undefined) {
    const machine = machineFn();
    // eslint-disable-next-line functional/immutable-data
    machineRef.current = machine;
  }

  const service = useInterpret(machineRef.current, options);

  // Register the machine with the store as soon as the component is mounted
  if (O.isNone(storedMachineOption)) {
    dispatch(
      xstateRegisterMachine({
        id: machineRef.current.id,
        machine: machineRef.current,
        eventQueue: [],
        state: machineRef.current.initialState,
        service
      })
    );
  }

  // As soon as the machines is registered, fire all queue events, if any
  React.useEffect(() => {
    pipe(
      storedMachineOption,
      O.map(({ eventQueue }) => eventQueue),
      O.filter(events => events.length > 0),
      O.map(events => {
        dispatch(xstateSendEvent(events));
        dispatch(xstateClearQueue({ id: IDPAY_ONBOARDING_MACHINE_ID }));
      })
    );
  }, [storedMachineOption, dispatch]);

  // Deregister the machine from the store as soon as the component is unmounted
  React.useEffect(() => {
    if (machineRef.current === undefined) {
      return;
    }
    const machine = machineRef.current;
    return () => {
      dispatch(xstateDeregisterMachine({ id: machine.id }));
    };
  }, [dispatch, machineRef]);

  return [machineRef.current, service];
};

export { useStoredXStateMachine };
