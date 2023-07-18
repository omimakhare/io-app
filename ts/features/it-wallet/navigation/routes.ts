export const ITW_ROUTES = {
  MAIN: "ITW_MAIN",
  ACTIVATION: {
    DETAILS: "ITW_ACTIVATION_DETAILS",
    INFO: "ITW_ACTIVATION_INFO",
    PID_PREVIEW: "ITW_ACTIVATION_PID_PREVIEW",
    PID_ISSUING: "ITW_ACTIVATION_PID_ISSUING",
    // CIE
    CIE_EXPIRED_SCREEN: "ITW_CIE_EXPIRED_SCREEN",
    CIE_PIN_SCREEN: "ITW_CIE_PIN_SCREEN",
    CIE_CARD_READER_SCREEN: "ITW_CIE_CARD_READER_SCREEN",
    CIE_CONSENT_DATA_USAGE: "ITW_CIE_CONSENT_DATA_USAGE",
    CIE_WRONG_PIN_SCREEN: "ITW_CIE_WRONG_PIN_SCREEN",
    CIE_PIN_TEMP_LOCKED_SCREEN: "ITW_CIE_PIN_TEMP_LOCKED_SCREEN"
  } as const,
  PRESENTATION: {
    VC_DETAILS: "ITW_PRESENTATION_VC_DETAILS"
  } as const
} as const;
