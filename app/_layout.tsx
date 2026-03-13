import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
// import { useColorScheme } from '@/hooks/use-color-scheme';
import "../global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SheetProvider } from "react-native-actions-sheet";
import "@/components/ui/sheets/register-sheets";
import { MagicModalPortal } from "react-native-magic-modal";
import { ToastMessage } from "@/components/ui/toasts-message/ToastMessage";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SheetProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
              <Stack.Screen name="index" options={{ headerShown: false, animation: "fade" }} />
              <Stack.Screen name="(hotel)/[id]" options={{ headerShown: false, title:"Hotel Listings" }}  />
              <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
                <Stack.Screen name="(booking)" options={{ headerShown: false }}
              />
            </Stack>
          </SheetProvider>
        </SafeAreaProvider>
        <StatusBar style="auto" />
        <MagicModalPortal />
        <ToastMessage />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
