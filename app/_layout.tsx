import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { useConfigStore } from "@/zustand/useConfig";
import UserContextProvider from "@/contexts/UserContext";
import ModalContextProvider from "@/components/ui/CustomModal";
import { schemas } from "@/schemas";
//import { RealmProvider } from "@realm/react";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { loaded: storeLoaded, config, setConfig } = useConfigStore();

  useEffect(() => {
    setConfig();
  }, []);

  useEffect(() => {
    if (loaded && storeLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, storeLoaded]);

  if (!loaded || !storeLoaded) {
    return null;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <UserContextProvider>
        <ModalContextProvider>
          <ThemeProvider
            value={config.theme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack
              screenOptions={{
                headerRight: () => <></>,
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="planets" />
              <Stack.Screen name="DemoRights" />
              <Stack.Screen name="flowers/index" />
              <Stack.Screen name="images/create" />
              <Stack.Screen name="images/preview" />
              <Stack.Screen name="images/submit" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </ModalContextProvider>
      </UserContextProvider>
    </PersistQueryClientProvider>
  );
}
