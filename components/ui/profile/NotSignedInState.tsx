// ─────────────────────────────────────────────────────────────
// NotSignedInState
// UI Component: Empty state shown when user is not authenticated
// Purpose: Prompts user to sign in or create an account
// Depends on: expo-router, theme system
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { IconSymbol } from "@/components/ui/icon-symbol";
import AppText from "@/components/ui/typography/AppText";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Component ────────────────────────────────────────────────
export default function NotSignedInState() {

  // ── Navigation & Theme ─────────────────────────────────────
  const { push } = useRouter();
  const { colors } = useThemeColors();

  // ── Handlers ───────────────────────────────────────────────
  const handleSignIn = () => {
    push("/(auth)/signIn");
  };

  const handleSignUp = () => {
    push("/(auth)/signUp");
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <View className="flex-1 items-center justify-center px-6">

      {/* ── Icon & Text ───────────────────────────────────── */}
      <View className="bg-primary/15 p-5 rounded-full">
        <IconSymbol name="person.fill" size={48} color={colors.primary} />
      </View>

      <AppText className="text-text text-xl text-center mt-4" variant="bold">
        Not Signed In
      </AppText>

      <AppText className="text-text-secondary text-center mt-2">
        Sign in to save favourites and manage bookings
      </AppText>

      {/* ── Actions ───────────────────────────────────────── */}
      <View className="w-full gap-3 mt-6">

        <TouchableOpacity
          onPress={handleSignIn}
          className="bg-primary py-3.5 rounded-xl items-center"
        >
          <AppText className="text-white text-base" variant="bold">
            Sign In
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          className="py-3.5 rounded-xl items-center border border-border"
        >
          <AppText className="text-text text-base" variant="bold">
            Create Account
          </AppText>
        </TouchableOpacity>

      </View>

    </View>
  );
}