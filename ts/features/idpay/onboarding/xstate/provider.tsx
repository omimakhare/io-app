import { useNavigation } from "@react-navigation/native";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import React from "react";
import { InterpreterFrom } from "xstate";
import {
  idPayApiBaseUrl,
  idPayApiUatBaseUrl,
  idPayTestToken
} from "../../../../config";
import {
  AppParamsList,
  IOStackNavigationProp
} from "../../../../navigation/params/AppParamsList";
import { useIOSelector } from "../../../../store/hooks";
import { sessionInfoSelector } from "../../../../store/reducers/authentication";
import {
  isPagoPATestEnabledSelector,
  preferredLanguageSelector
} from "../../../../store/reducers/persistedPreferences";
import {
  fromLocaleToPreferredLanguage,
  getLocalePrimaryWithFallback
} from "../../../../utils/locale";
import { useStoredMachine } from "../../../../xstate/hooks/useStoredMachine";
import { createIDPayClient } from "../../common/api/client";
import {
  IDPayOnboardingParamsList,
  IDPayOnboardingStackNavigationProp
} from "../navigation/navigator";
import { createActionsImplementation } from "./actions";
import {
  IDPayOnboardingMachineType,
  createIDPayOnboardingMachine
} from "./machine";
import { createServicesImplementation } from "./services";

type OnboardingMachineContext = {
  machine: IDPayOnboardingMachineType;
  service: InterpreterFrom<IDPayOnboardingMachineType>;
};

const OnboardingMachineContext = React.createContext<OnboardingMachineContext>(
  {} as OnboardingMachineContext
);

type Props = {
  children: React.ReactNode;
};

const IDPayOnboardingMachineProvider = (props: Props) => {
  const rootNavigation = useNavigation<IOStackNavigationProp<AppParamsList>>();
  const onboardingNavigation =
    useNavigation<
      IDPayOnboardingStackNavigationProp<IDPayOnboardingParamsList>
    >();

  const isPagoPATestEnabled = useIOSelector(isPagoPATestEnabledSelector);
  const sessionInfo = useIOSelector(sessionInfoSelector);

  const baseUrl = isPagoPATestEnabled ? idPayApiUatBaseUrl : idPayApiBaseUrl;

  if (O.isNone(sessionInfo)) {
    throw new Error("Session info is undefined");
  }

  const { bpdToken } = sessionInfo.value;

  const token = idPayTestToken !== undefined ? idPayTestToken : bpdToken;

  const language = pipe(
    useIOSelector(preferredLanguageSelector),
    O.getOrElse(getLocalePrimaryWithFallback),
    fromLocaleToPreferredLanguage
  );

  const client = createIDPayClient(baseUrl);

  const services = createServicesImplementation(client, token, language);
  const actions = createActionsImplementation(
    rootNavigation,
    onboardingNavigation
  );

  const [machine, service] = useStoredMachine<IDPayOnboardingMachineType>(
    createIDPayOnboardingMachine,
    {
      services,
      actions
    }
  );

  return (
    <OnboardingMachineContext.Provider value={{ machine, service }}>
      {props.children}
    </OnboardingMachineContext.Provider>
  );
};

const useIDPayOnboardingMachine = () =>
  React.useContext(OnboardingMachineContext);

export { IDPayOnboardingMachineProvider, useIDPayOnboardingMachine };
