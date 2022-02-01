import { Option, none, some } from "fp-ts/lib/Option";
import { CTA } from "../../../types/MessageCTA";

const SSO_ACTION_PREFIX = "iosso://";

type SSOCTA = {
  url: string;
  text: string;
};

const getSSOCTA = (cta: CTA): Option<SSOCTA> => {
  const { text, action } = cta;

  if (!action.startsWith(SSO_ACTION_PREFIX)) {
    return none;
  }

  const url = action.substring(SSO_ACTION_PREFIX.length);

  try {
    new URL(url);
    return some({
      url,
      text
    });
  } catch (e) {
    return none;
  }
};

export { getSSOCTA };
