/* eslint-disable no-underscore-dangle */
import { createSelector } from "reselect";
import { StateFrom } from "xstate";
import { SelfDeclarationBoolDTO } from "../../../../../definitions/idpay/onboarding/SelfDeclarationBoolDTO";
import { SelfDeclarationMultiDTO } from "../../../../../definitions/idpay/onboarding/SelfDeclarationMultiDTO";
import { IDPayOnboardingMachineType } from "./machine";
import { filterRequiredCriteria } from "./utils";

type StateWithContext = StateFrom<IDPayOnboardingMachineType>;

const selectRequiredCriteria = (state: StateWithContext) =>
  state.context.requiredCriteria;

const multiRequiredCriteriaSelector = createSelector(
  selectRequiredCriteria,
  requiredCriteria =>
    filterRequiredCriteria(requiredCriteria, SelfDeclarationMultiDTO.is)
);

const boolRequiredCriteriaSelector = createSelector(
  selectRequiredCriteria,
  requiredCriteria =>
    filterRequiredCriteria(requiredCriteria, SelfDeclarationBoolDTO.is)
);

const selectMultiConsents = (state: StateWithContext) =>
  state.context.multiConsents;

export {
  boolRequiredCriteriaSelector,
  multiRequiredCriteriaSelector,
  selectMultiConsents
};
