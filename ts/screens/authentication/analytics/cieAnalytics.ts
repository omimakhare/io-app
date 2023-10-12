import { mixpanelTrack } from "../../../mixpanel";
import { buildEventProperties } from "../../../utils/analytics";

export function trackLoginCiePinScreen() {
  void mixpanelTrack(
    "LOGIN_CIE_PIN",
    buildEventProperties("UX", "screen_view")
  );
}

export function trackLoginCieCardReaderScreen() {
  void mixpanelTrack(
    "LOGIN_CIE_CARD_READER_SCREEN",
    buildEventProperties("UX", "screen_view")
  );
}

export function trackLoginCieConsentDataUsageScreen() {
  void mixpanelTrack(
    "LOGIN_CIE_CONSENT_DATA_USAGE",
    buildEventProperties("UX", "screen_view")
  );
}

export function trackLoginCieCardReadingError() {
  void mixpanelTrack(
    "LOGIN_CIE_CARD_READING_ERROR",
    buildEventProperties("KO", undefined)
  );
}

export function trackLoginCieDataSharingError() {
  void mixpanelTrack(
    "LOGIN_CIE_DATA_SHARING_ERROR",
    buildEventProperties("KO", undefined)
  );
}
