// ─────────────────────────────────────────────────────────────
// SectionHeaderSkeleton Component
// Screen: Home / Listings (Loading State)
// Handles: Skeleton UI for section headers (title + action text)
// Depends on: react-native-reanimated-skeleton, theme colors
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import Skeleton from "react-native-reanimated-skeleton";
import { View } from "react-native";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";;

// ── Types ────────────────────────────────────────────────────
type SectionHeaderSkeletonProps = {
  className?: string;
};

// ── Component ────────────────────────────────────────────────
export default function SectionHeaderSkeleton({ className = "" }: SectionHeaderSkeletonProps) {

  // ── Theme Setup ────────────────────────────────────────────
 const { colors,isDark } = useThemeColors();

  // ── Render ─────────────────────────────────────────────────
  return (
    <View className={`flex-row justify-between items-center px-4 mb-3 mt-8 ${className}`}>

      {/* SECTION TITLE SKELETON */}
      <Skeleton
        isLoading={true}
        containerStyle={{
          width: 160,
          height: 20,
          borderRadius: 6,
          backgroundColor: colors.card,
        }}
        highlightColor={isDark ? "#334155" : "#F8FAFC"}
      />

      {/* SECTION ACTION SKELETON (e.g. "See all") */}
      <Skeleton
        isLoading={true}
        containerStyle={{
          width: 60,
          height: 16,
          borderRadius: 6,
          backgroundColor: colors.card,
        }}
        highlightColor={isDark ? "#334155" : "#F8FAFC"}
      />

    </View>
  );
}