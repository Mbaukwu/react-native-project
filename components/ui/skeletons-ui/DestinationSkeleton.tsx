// ─────────────────────────────────────────────────────────────
// DestinationSkeleton Component
// Screen: Home (Loading State)
// Handles: Skeleton UI for popular destinations section
// Depends on: react-native-reanimated-skeleton, theme colors
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import Skeleton from "react-native-reanimated-skeleton";
import { View } from "react-native";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";
// ── Component ────────────────────────────────────────────────
export default function DestinationSkeleton() {

  // ── Theme Setup ────────────────────────────────────────────
 const { colors, isDark } = useThemeColors();
  // ── Render ─────────────────────────────────────────────────
  return (
    <View style={{ backgroundColor: colors.background }}>
      <View className="flex-row px-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            isLoading={true}
            containerStyle={{
              width: 176,
              height: 224,
              borderRadius: 16,
              backgroundColor: colors.card,
            }}
            highlightColor={isDark ? "#334155" : "#F8FAFC"}
          />
        ))}
      </View>
    </View>
  );
}