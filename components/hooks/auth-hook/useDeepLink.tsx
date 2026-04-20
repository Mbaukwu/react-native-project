// ─────────────────────────────────────────────────────────────
// useDeepLink Hook
// Layer: Auth / Navigation Hook
// Handles: Deep link parsing, Supabase session restoration, conditional routing
// Depends on: Expo Linking, Expo Router, Supabase auth
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { supabase } from "@/constants/supabase/supabase";

// ── Hook ─────────────────────────────────────────────────────
export const useDeepLink = () => {
  const router = useRouter();
  const hasProcessed = useRef(false);

  // ── Deep Link Listener ──────────────────────────────────────
  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      if (hasProcessed.current) return;
      
      // ← ADD THIS LINE — mark as processing immediately
      hasProcessed.current = true;

      console.log("Deep link received:", url);

      const hash = url.split("#")[1];
      if (!hash) {
        hasProcessed.current = false; // ← ADD THIS
        return;
      }

      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const type = params.get("type");

      console.log("Type:", type);
      console.log("Has tokens:", !!accessToken, !!refreshToken);

      if (accessToken && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        console.log("Session set:", !!data.session, error?.message);

        if (!error && data.session) {
          if (type === "recovery") {
            router.replace("/(auth)/reset-password");
          } else {
            router.replace("/(tabs)/home");
          }
          
          // ← ADD THIS — reset flag after navigation
          setTimeout(() => {
            hasProcessed.current = false;
          }, 1000);
          return;
        }
      }
      
      // ← ADD THIS — reset flag if no valid tokens or session failed
      hasProcessed.current = false;
    };

    // ── Initial URL Handling ──────────────────────────────────
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    // ── Runtime URL Listener ──────────────────────────────────
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleDeepLink(url);
    });

    // ── Cleanup ───────────────────────────────────────────────
    return () => subscription.remove();
  }, []);
};