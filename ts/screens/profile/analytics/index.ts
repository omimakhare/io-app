import { ServicesPreferencesModeEnum } from "../../../../definitions/backend/ServicesPreferencesMode";
import { mixpanelTrack } from "../../../mixpanel";
import { FlowType, buildEventProperties } from "../../../utils/analytics";

export function trackTosScreen(flow: FlowType) {
  void mixpanelTrack(
    "TOS_SCREEN",
    buildEventProperties("UX", "screen_view", undefined, flow)
  );
}

export function trackMixpanelScreen(flow: FlowType) {
  void mixpanelTrack(
    "TRACKING_SCREEN",
    buildEventProperties("UX", "screen_view", undefined, flow)
  );
}

export function trackPinScreen(flow: FlowType) {
  void mixpanelTrack(
    "PIN_CREATION_SCREEN",
    buildEventProperties("UX", "screen_view", undefined, flow)
  );
}

export function trackNotificationScreen(flow: FlowType) {
  void mixpanelTrack(
    "NOTIFICATION_PREFERENCE_SCREEN",
    buildEventProperties("UX", "screen_view", undefined, flow)
  );
}

export function trackServiceConfigurationScreen(flow: FlowType) {
  void mixpanelTrack(
    "CONFIGURATION_PREFERENCE_SCREEN",
    buildEventProperties("UX", "screen_view", undefined, flow)
  );
}

export function trackThankYouPageScreen() {
  void mixpanelTrack("LOGIN_TYP", buildEventProperties("UX", "screen_view"));
}

export function trackPinError(error: "creation" | "confirm", flow: FlowType) {
  void mixpanelTrack(
    "PIN_CREATION_ERROR",
    buildEventProperties("UX", "error", { error }, flow)
  );
}

export function trackCreatePinSuccess(flow: FlowType) {
  void mixpanelTrack(
    "CREATE_PIN_SUCCESS",
    buildEventProperties("UX", "action", undefined, flow)
  );
}

export function trackTosAccepted(acceptedTosVersion: number, flow: FlowType) {
  void mixpanelTrack(
    "TOS_ACCEPTED",
    buildEventProperties(
      "UX",
      "action",
      {
        acceptedTosVersion
      },
      flow
    )
  );
}

export function trackNotificationsPreferencesPreviewStatus(
  enabled: boolean,
  flow: FlowType
) {
  void mixpanelTrack(
    "NOTIFICATIONS_PREFERENCES_PREVIEW_STATUS",
    buildEventProperties(
      "UX",
      "action",
      {
        enabled
      },
      flow
    )
  );
}

export function trackNotificationsPreferencesReminderStatus(
  enabled: boolean,
  flow: FlowType
) {
  void mixpanelTrack(
    "NOTIFICATIONS_PREFERENCES_REMINDER_STATUS",
    buildEventProperties(
      "UX",
      "action",
      {
        enabled
      },
      flow
    )
  );
}

export function trackServiceConfiguration(
  mode: ServicesPreferencesModeEnum | undefined,
  flow: FlowType
) {
  void mixpanelTrack(
    "PREFERENCE_SERVICE_CONFIGURATION",
    buildEventProperties(
      "UX",
      "action",
      {
        mode
      },
      flow
    )
  );
}
