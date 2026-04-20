// ─────────────────────────────────────────────────────────────
// HomeHeaderSkeleton Component
// Screen: Home (Loading State)
// Handles: Skeleton UI for home header (greeting + search bar)
// Depends on: react-native-reanimated-skeleton, theme colors
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import Skeleton from "react-native-reanimated-skeleton";
import { View } from "react-native";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Component ────────────────────────────────────────────────
export default function HomeHeaderSkeleton() {

  // ── Theme Setup ────────────────────────────────────────────
  const { colors, isDark } = useThemeColors();

  // ── Render ─────────────────────────────────────────────────
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 16,
        backgroundColor: colors.background,
      }}
    >

      {/* Greeting */}
      <Skeleton
        isLoading={true}
        containerStyle={{
          width: 220,
          height: 24,
          borderRadius: 8,
          backgroundColor: colors.card,
        }}
        highlightColor={isDark ? "#334155" : "#F1F5F9"}
      />

      {/* Subtitle */}
      <View style={{ marginTop: 8, marginBottom: 10 }}>
        <Skeleton
          isLoading={true}
          containerStyle={{
            width: 180,
            height: 14,
            borderRadius: 6,
            backgroundColor: colors.card,
          }}
          highlightColor={isDark ? "#334155" : "#F1F5F9"}
        />
      </View>

      {/* Search Bar */}
      <Skeleton
        isLoading={true}
        containerStyle={{
          width: "100%",
          height: 48,
          borderRadius: 12,
          backgroundColor: colors.card,
        }}
        highlightColor={isDark ? "#334155" : "#F1F5F9"}
      />

    </View>
  );
}