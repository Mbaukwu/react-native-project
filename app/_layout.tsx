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
import { Uniwind, useUniwind } from 'uniwind';               
     
import { useEffect } from 'react';


export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const queryClient = new QueryClient();
 // Hook to read current theme (for StatusBar sync)
  const { theme } = useUniwind();

  useEffect(() => {
    // Set to 'system' once — app follows device dark/light mode forever
    Uniwind.setTheme('system');
  }, []);  // Runs only on mount
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SheetProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false, animation: "fade" }} />
              <Stack.Screen name="(hotel)/[id]" options={{ headerShown: false, title:"Hotel Listings" }}  />
              <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
                <Stack.Screen name="(booking)" options={{ headerShown: false }}
              />
            </Stack>
          </SheetProvider>
        </SafeAreaProvider>
        {/* StatusBar auto-syncs with current theme */}
       <StatusBar 
          style={theme === 'dark' ? 'light' : 'dark'} 
        
        />
        <MagicModalPortal />
        <ToastMessage />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
