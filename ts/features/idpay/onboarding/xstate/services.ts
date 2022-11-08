/* eslint-disable no-underscore-dangle */
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { InitiativeDto } from "../../../../../definitions/idpay/onboarding/InitiativeDto";
import { RequiredCriteriaDTO } from "../../../../../definitions/idpay/onboarding/RequiredCriteriaDTO";
import NavigationService from "../../../../navigation/NavigationService";
import { OnboardingClient } from "../api/client";
import { SelfConsentDTO } from "../../../../../definitions/idpay/onboarding/SelfConsentDTO";
import { IDPayOnboardingRoutes } from "../navigation/navigator";
import { Context } from "./machine";

/**
 * Temporary function to convert the required criteria to the self consents
 * 
 * TODO: Process inputs from the citizen
 */
const createSelfConsents = (requiredCriteria: RequiredCriteriaDTO) => {
  const selfConsents: Array<SelfConsentDTO> =
    requiredCriteria.selfDeclarationList.map(_ => {
      if (_._type === "boolean") {
        return {
          _type: _._type,
          code: _.code,
          accepted: true
        };
      } else {
        return {
          _type: _._type,
          code: _.code,
          value: _.value[0]
        };
      }
    });

  return selfConsents;
};

const createServicesImplementation = (onboardingClient: OnboardingClient) => {
  const loadInitiative = async (context: Context) => {
    if (context.serviceId === undefined) {
      return Promise.reject("serviceId is undefined");
    }

    const response = await onboardingClient.getInitiativeId({
      serviceId: context.serviceId
    });

    const data: Promise<InitiativeDto> = pipe(
      response,
      E.fold(
        _ => Promise.reject("error loading initiative"),
        _ => {
          if (_.status !== 200) {
            return Promise.reject("error loading initiative");
          }
          return Promise.resolve(_.value);
        }
      )
    );

    return data;
  };

  const acceptTos = async (context: Context) => {
    if (context.initiative === undefined) {
      throw new Error("initative is undefined");
    }
    const response = await onboardingClient.onboardingCitizen({
      body: {
        initiativeId: context.initiative.initiativeId
      }
    });

    const dataPromise: Promise<undefined> = pipe(
      response,
      E.fold(
        _ => Promise.reject(new Error("Error accepting tos")),
        _ => {
          if (_.status !== 204) {
            return Promise.reject(new Error("Error accepting tos"));
          }
          return Promise.resolve(undefined);
        }
      )
    );

    return dataPromise;
  };

  const loadRequiredCriteria = async (context: Context) => {
    if (context.initiative === undefined) {
      throw new Error("initative is undefined");
    }


    const response = await onboardingClient.checkPrerequisites({
      body: {
        initiativeId: context.initiative.initiativeId
      }
    });

    NavigationService.navigate(IDPayOnboardingRoutes.IDPAY_ONBOARDING_MAIN, {
      screen: IDPayOnboardingRoutes.IDPAY_ONBOARDING_PDNDACCEPTANCE
      // TODO:: add logic to pick the right screen
    });
    const dataPromise: Promise<O.Option<RequiredCriteriaDTO>> = pipe(
      response,
      E.fold(
        _ => Promise.reject("Error loading required criteria"),
        _ => {
          if (_.status === 200) {
            return Promise.resolve(O.some(_.value));
          }
          if (_.status === 202) {
            return Promise.resolve(O.none);
          }
          return Promise.reject("Error loading required criteria");
        }
      )
    );

    return dataPromise;
  };

  const acceptRequiredCriteria = async (context: Context) => {
    const { initiative, requiredCriteria } = context;
    if (initiative === undefined || requiredCriteria === undefined) {
      throw new Error("initative or requiredCriteria is undefined");
    }

    if (O.isNone(requiredCriteria)) {
      throw new Error("requiredCriteria is none");
    }

    const response = await onboardingClient.consentOnboarding({
      body: {
        initiativeId: initiative.initiativeId,
        pdndAccept: true,
        selfDeclarationList: createSelfConsents(requiredCriteria.value)
      }
    });

    const dataPromise: Promise<undefined> = pipe(
      response,
      E.fold(
        _ => Promise.reject("Error accepting required criteria"),
        _ => {
          if (_.status !== 202) {
            return Promise.reject("Error accepting required criteria");
          }
          return Promise.resolve(undefined);
        }
      )
    );

    return dataPromise;
  };

  return {
    loadInitiative,
    acceptTos,
    loadRequiredCriteria,
    acceptRequiredCriteria
  };
};

export { createServicesImplementation };
