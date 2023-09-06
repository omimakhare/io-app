export const ITW_ROUTES = {
  MAIN: "ITW_MAIN",
  DISCOVERY: {
    INFO: "ITW_DISCOVERY_INFO",
    FEATURES_INFO: "ITW_DISCOVERY_FEATURES_INFO"
  } as const,
  ISSUING: {
    CIE: {
      EXPIRED_SCREEN: "ITW_ISSUING_CIE_EXPIRED_SCREEN",
      PIN_SCREEN: "ITW_ISSUING_CIE_PIN_SCREEN",
      CARD_READER_SCREEN: "ITW_ISSUING_CIE_CARD_READER_SCREEN",
      CONSENT_DATA_USAGE: "ITW_ISSUING_CIE_CONSENT_DATA_USAGE",
      WRONG_PIN_SCREEN: "ITW_ISSUING_CIE_WRONG_PIN_SCREEN",
      PIN_TEMP_LOCKED_SCREEN: "ITW_ISSUING_CIE_PIN_TEMP_LOCKED_SCREEN",
      INFO_USAGE_SCREEN: "ITW_ISSUING_CIE_INFO_USAGE_SCREEN"
    } as const,
    PID_AUTH_INFO: "ITW_ISSUING_PID_AUTH_INFO",
    PID_REQUEST: "ITW_ISSUING_PID_REQUEST",
    PID_PREVIEW: "ITW_ISSUING_PID_PREVIEW",
    PID_ADDING: "ITW_ISSUING_PID_ADDING"
  } as const,
  PRESENTATION: {
    PID_DETAILS: "ITW_PRESENTATION_PID_DETAILS"
  }
} as const;
