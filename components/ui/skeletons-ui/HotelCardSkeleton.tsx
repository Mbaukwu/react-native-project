// ─────────────────────────────────────────────────────────────
// HotelCardSkeleton Component
// Screen: Home / Listings (Loading State)
// Handles: Skeleton UI for horizontal hotel cards
// Depends on: react-native-reanimated-skeleton, theme colors
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import Skeleton from "react-native-reanimated-skeleton";
import { View } from "react-native";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";
// ── Component ────────────────────────────────────────────────
export default function HotelCardSkeleton() {

  // ── Theme Setup ────────────────────────────────────────────
const { colors, isDark } = useThemeColors();
  // ── Render ─────────────────────────────────────────────────
  return (
    <View style={{ backgroundColor: colors.background }}>
      <View style={{ flexDirection: "row", paddingHorizontal: 16, gap: 12 }}>

        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            isLoading={true}
            containerStyle={{
              width: 224,
              height: 250,
              borderRadius: 16,
              backgroundColor: colors.card,
            }}
            highlightColor={isDark ? "#334155" : "#F1F5F9"}
          />
        ))}

      </View>
    </View>
  );
}