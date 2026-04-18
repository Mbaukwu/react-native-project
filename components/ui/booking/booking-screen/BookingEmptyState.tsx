// ─────────────────────────────────────────────────────────────
// BookingEmptyState
// UI Component: Empty state for bookings screen
// Variants: upcoming | history
// ─────────────────────────────────────────────────────────────

import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import AppText from "@/components/ui/typography/AppText";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Props ────────────────────────────────────────────────────
type BookingEmptyStateProps = {
  type: "upcoming" | "history";
};

// ── Component ────────────────────────────────────────────────
export default function BookingEmptyState({ type }: BookingEmptyStateProps) {
  
  // ── Navigation ───────────────────────────────────────────
  const { push } = useRouter();

  // ── Theme ────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Upcoming Empty State ─────────────────────────────────
  if (type === "upcoming") {
    return (
      <View className="flex-1 items-center justify-center py-12">

        <IconSymbol name="calendar" size={48} color={colors.textDisabled} />

        <AppText className="text-text-secondary text-center mt-4 " variant="medium">
          No upcoming stays
        </AppText>

        <TouchableOpacity
          onPress={() => push("/(tabs)/home")}
          className="mt-4 bg-primary py-2 px-6 rounded-xl"
        >
          <AppText className="text-white" variant="bold">
            Explore Hotels
          </AppText>
        </TouchableOpacity>

      </View>
    );
  }

  // ── History Empty State ──────────────────────────────────
  return (
    <View className="flex-1 items-center justify-center py-12">

      <IconSymbol name="clock.fill" size={48} color={colors.textDisabled} />

      <AppText className="text-text-secondary text-center mt-4" variant="medium">
        No booking history
      </AppText>

    </View>
  );
}