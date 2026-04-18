// ─────────────────────────────────────────────────────────────
// NotSignedInState Component
// Screen: Bookings (unauthenticated state)
// Purpose: Prompts user to sign in before accessing bookings
// Dependencies: expo-router, ScreenWrapper, IconSymbol, AppText, useThemeColors
// Behavior: Shows back navigation + sign-in CTA
// ─────────────────────────────────────────────────────────────

import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import AppText from "@/components/ui/typography/AppText";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Component ────────────────────────────────────────────────
export default function NotSignedInState() {
  const { push, back } = useRouter();
  const { colors } = useThemeColors();

  return (
    <ScreenWrapper className="p-6">

      {/* ── Header ─────────────────────────────────────────── */}
      <View className="flex-row items-center mt-4">
        <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>

        <AppText className="text-text text-2xl capitalize" variant="bold">
          my bookings
        </AppText>
      </View>

      {/* ── Empty/Auth Prompt State ────────────────────────── */}
      <View className="flex-1 items-center justify-center">

        {/* ── Icon Container ──────────────────────────────── */}
        <View className="bg-primary/15 p-6 rounded-full mb-2">
          <IconSymbol name="calendar" size={56} color={colors.primary} />
        </View>

        {/* ── Text Content ────────────────────────────────── */}
        <AppText className="text-text text-xl text-center mt-2" variant="bold">
          Where to next?
        </AppText>

        <AppText className="text-text-secondary text-center mt-2">
          Sign in to manage your bookings
        </AppText>

        {/* ── Sign In Button ──────────────────────────────── */}
        <TouchableOpacity
          onPress={() => push("/(auth)/signIn")}
          className="mt-6 bg-primary py-3 px-6 rounded-xl"
        >
          <AppText className="text-white text-base" variant="bold">
            Sign In
          </AppText>
        </TouchableOpacity>

      </View>

    </ScreenWrapper>
  );
}