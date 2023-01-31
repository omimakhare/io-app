/* eslint-disable no-underscore-dangle */
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { Is } from "io-ts";
import { RequiredCriteriaDTO } from "../../../../../definitions/idpay/onboarding/RequiredCriteriaDTO";
import { SelfDeclarationDTO } from "../../../../../definitions/idpay/onboarding/SelfDeclarationDTO";

export const filterRequiredCriteria = <T extends SelfDeclarationDTO>(
  criteria: O.Option<RequiredCriteriaDTO> | undefined,
  filterFunc: Is<T>
) =>
  pipe(
    criteria,
    O.fromNullable,
    O.flatten,
    O.fold(
      () => [],
      some => some.selfDeclarationList.filter(filterFunc)
    )
  ) as Array<T>;
