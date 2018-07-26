import { Platform } from "react-native";

const ROUTES = {
  // on Android, the URI prefix contains a host in addition to scheme
  PREFIX: Platform.OS === "android" ? "ioit://ioit/" : "ioit://",

  // Ingress
  INGRESS: "INGRESS",

  // Authentication
  AUTHENTICATION: "AUTHENTICATION",
  AUTHENTICATION_LANDING: "AUTHENTICATION_LANDING",
  AUTHENTICATION_IDP_SELECTION: "AUTHENTICATION_IPD_SELECTION",
  AUTHENTICATION_IDP_LOGIN: "AUTHENTICATION_IPD_LOGIN",
  AUTHENTICATION_LOGIN: "AUTHENTICATION_LOGIN",
  AUTHENTICATION_SPID_INFORMATION_REQUEST:
    "AUTHENTICATION_SPID_INFORMATION_REQUEST",
  MARKDOWN: "MARKDOWN",

  // Onboarding
  ONBOARDING: "ONBOARDING",
  ONBOARDING_TOS: "ONBOARDING_TOS",
  ONBOARDING_PIN: "ONBOARDING_PIN",

  // Documents
  DOCUMENTS_HOME: "DOCUMENTS_HOME",

  // Preferences
  PREFERENCES_HOME: "PREFERENCES_HOME",

  // Wallet
  WALLET_HOME: "WALLET_HOME",
  WALLET_TRANSACTION_DETAILS: "WALLET_TRANSACTION_DETAILS",
  WALLET_LIST: "WALLET_LIST",
  WALLET_CARD_TRANSACTIONS: "WALLET_CARD_TRANSACTION",
  WALLET_SAVE_CARD: "WALLET_SAVE_CARD",
  WALLET_ADD_PAYMENT_METHOD: "WALLET_ADD_PAYMENT_METHOD",
  WALLET_ADD_CARD: "WALLET_ADD_CARD",
  WALLET_ADD_MANAGER: "WALLET_ADD_MANAGER",
  WALLET_ASK_SAVE_CARD: "WALLET_ASK_SAVE_CARD",

  // Payment
  PAYMENT_SCAN_QR_CODE: "PAYMENT_SCAN_QR_CODE",
  PAYMENT_MANUAL_DATA_INSERTION: "PAYMENT_MANUAL_DATA_INSERTION",
  PAYMENT_TRANSACTION_SUMMARY: "PAYMENT_TRANSACTION_SUMMARY",
  PAYMENT_PICK_PAYMENT_METHOD: "PAYMENT_PICK_PAYMENT_METHOD",
  PAYMENT_CONFIRM_PAYMENT_METHOD: "PAYMENT_CONFIRM_PAYMENT_METHOD",

  // Pin
  PIN_LOGIN: "PIN_LOGIN",

  // Main
  MAIN: "MAIN",

  // Messages
  MESSAGES_HOME: "MESSAGES_HOME",
  MESSAGES_LIST: "MESSAGES_LIST",
  MESSAGE_DETAILS: "MESSAGE_DETAILS",

  // Profile
  PROFILE_NAVIGATOR: "PROFILE_NAVIGATOR",
  PROFILE_MAIN: "PROFILE_MAIN"
};

export default ROUTES;
