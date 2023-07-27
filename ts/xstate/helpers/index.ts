import * as X from "xstate";

export type AnyService = X.Interpreter<any, any, any>;
export type AnyMachine = X.StateMachine<any, any, any>;

export type SupervisedEvent<TEvent extends X.EventObject> =
  | (TEvent & { to?: string | Array<string> })
  | TEvent["type"]
  | Array<(TEvent & { to?: string | Array<string> }) | TEvent["type"]>
  | (X.SCXML.Event<TEvent> & { to?: string | Array<string> });

export type AnySupervisedEvent = SupervisedEvent<X.AnyEventObject>;
export type AnyDispatchedEvent = Exclude<X.AnyEventObject, string> & {
  to: string | Array<string>;
};

export type DispatchedSupervisedEvent =
  | Array<AnyDispatchedEvent>
  | AnyDispatchedEvent;

export type StoredMachine = {
  /** Unique identifier of the machine. Must be unique for the whole app. */
  id: string;
  /** A state machine. */
  machine: AnyMachine;
  /** A state machine interpreted. Only available if the component needing it is live. */
  service?: AnyService;
  /** If a machine is not live but components are sending events to it it will be parked here.. */
  eventQueue: Array<AnyDispatchedEvent>;
  /** The most recent state of a machine live or not. */
  state: X.State<any, any, any, any>;
};
