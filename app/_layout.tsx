import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SheetProvider } from "react-native-actions-sheet";
import "@/components/ui/sheets/register-sheets";
import { MagicModalPortal } from "react-native-magic-modal";
import { ToastMessage } from "@/components/ui/toasts-message/ToastMessage";
import { Uniwind } from "uniwind";
import { useEffect } from "react";
import { useDeepLink } from "@/components/hooks/auth-hook/useDeepLink";
import { useThemeStore } from "@/constants/stores/themeStore";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const queryClient = new QueryClient();
  // Hook to read current theme (for StatusBar sync)
  const { isDarkMode, loadTheme } = useThemeStore();
  
    // Initialize deep link handler
  useDeepLink();

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    Uniwind.setTheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SheetProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false, animation: "fade" }} />

              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(booking)" options={{ headerShown: false }} />
              <Stack.Screen name="searchScreen" options={{ headerShown: false }} />
              <Stack.Screen name="hotel" options={{ headerShown: false }} />
              <Stack.Screen name="(profile)" options={{ headerShown: false }} />
            </Stack>
          </SheetProvider>
        </SafeAreaProvider>
        {/* StatusBar auto-syncs with current theme */}
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <MagicModalPortal />
        <ToastMessage />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
