import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Breadcrumb } from "@sentry/react-native";

import * as Sentry from "@sentry/react-native";
import { LogLevel } from "@sentry/types/dist/loglevel";
import { StyleProvider } from "native-base";
import * as React from "react";
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./boot/configureStoreAndPersistor";
import { LightModalProvider } from "./components/ui/LightModal";
import RootContainer from "./RootContainer";
import theme from "./theme";
import { getAppVersion } from "./utils/appVersion";

// Infer the `RootState` and `AppDispatch` types from the store itselfexport
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const routingInstrumentation =
  new Sentry.ReactNavigationV4Instrumentation();

Sentry.init({
  dsn: "https://59a8c388c5f24fccb80a812cf1068c13@o1075118.ingest.sentry.io/6075870",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  release: getAppVersion(),
  dist: Platform.OS === "ios" ? "ios" : DeviceInfo.getBuildNumber(),
  tracesSampleRate: 1.0,
  // logLevel: LogLevel.Debug,
  // debug: true,
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      enableStallTracking: true,
      enableNativeFramesTracking: true,
      traceFetch: true,
      tracingOrigins: ["localhost", "127.0.0.1", /^\//]
    })
  ]
  // beforeBreadcrumb(breadcrumb: Breadcrumb) {
  //   // console.log("breadcrumb" + breadcrumb.data.url);
  //
  //   if (breadcrumb?.data?.url?.includes("/api/v1/messages/")) {
  //     // console.log("YES");
  //     breadcrumb.data.url = "http://127.0.0.1:3000/api/v1/messages/_msg_id_";
  //   }
  //
  //   return breadcrumb;
  // }
});

/**
 * Main component of the application
 *
 * TODO: Add a loading screen @https://www.pivotaltracker.com/story/show/155583084
 */
const App: React.SFC<never> = () => (
  <StyleProvider style={theme()}>
    <Provider store={store}>
      <PersistGate loading={undefined} persistor={persistor}>
        <BottomSheetModalProvider>
          <LightModalProvider>
            <MenuProvider>
              <RootContainer />
            </MenuProvider>
          </LightModalProvider>
        </BottomSheetModalProvider>
      </PersistGate>
    </Provider>
  </StyleProvider>
);

export default Sentry.wrap(App);
