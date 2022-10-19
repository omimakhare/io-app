import { createClient } from "../../../../definitions/idpay/onboarding/client";
import { defaultRetryingFetch } from "../../../utils/fetch";

const createOnboardingClient = (token: string) =>
  createClient<"apiKeyHeader">({
    baseUrl: "https://localhost",
    fetchApi: defaultRetryingFetch(),
    withDefaults: op => params => {
      const paramsWithDefault = {
        ...params,
        apiKeyHeader: token
      } as unknown as Parameters<typeof op>; // Hack needed to bypass a openapi-codegen-ts bug

      return op(...paramsWithDefault);
    }
  });

type OnboardingClientT = ReturnType<typeof createOnboardingClient>;

export type { OnboardingClientT };
export { createOnboardingClient };
