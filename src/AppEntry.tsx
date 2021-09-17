import React, { useEffect, useState, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ModalProvider } from "~/components/ModalProvider";
import { RootStoreInstance } from "./mobx/RootStore";
import { Router } from "./router/Router";
import { MSTProvider } from "./mobx/MSTProvider";
import { useMSTFastRefresh } from "./useMSTFastRefresh";
import { initialize } from "./initialize";
import { QueryClient, QueryClientProvider } from "react-query";
import { KeyboardAvoidingView } from "./components/KeyboardAvoidingView";
import { AlertProvider } from "./components/AlertProvider";
import { Platform, StyleSheet } from "react-native";

const S = StyleSheet.create({
  flex: { flex: 1 },
});

export function AppEntry() {
  const [isReady, setIsReady] = useState(false);
  const store = useRef<RootStoreInstance | undefined>(undefined);
  const queryClient = useRef<QueryClient | undefined>(undefined);

  useMSTFastRefresh(store);

  useEffect(() => {
    initialize().then((context) => {
      store.current = context.store;
      queryClient.current = context.queryClient;
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <MSTProvider store={store.current}>
      <QueryClientProvider client={queryClient.current as QueryClient}>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            enabled={Platform.select({ android: false, default: true })}
            behavior="padding"
            style={S.flex}
          >
            <ModalProvider>
              <AlertProvider>
                <Router />
              </AlertProvider>
            </ModalProvider>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </MSTProvider>
  );
}
