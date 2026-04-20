// ─────────────────────────────────────────────────────────────
// SearchHotelCardSkeleton Component
// Screen: Search Results (Loading State)
// Handles: Skeleton UI for vertical hotel search cards
// Depends on: react-native-reanimated-skeleton, theme colors
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import Skeleton from "react-native-reanimated-skeleton";
import { View } from "react-native";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";
// ── Component ────────────────────────────────────────────────
export default function SearchHotelCardSkeleton() {

  // ── Theme Setup ────────────────────────────────────────────
  const { colors, isDark } = useThemeColors();

  // ── Render ─────────────────────────────────────────────────
  return (
    <View style={{ backgroundColor: colors.background, paddingHorizontal: 16, marginTop: 22 }}>

      {[1, 2, 3, 4, 5, 6].map((i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            height: 120,
            backgroundColor: colors.card,
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 16,
          }}
        >

          {/* Image */}
          <Skeleton
            isLoading={true}
            containerStyle={{
              width: 120,
              height: 120,
              backgroundColor: colors.card,
            }}
            highlightColor={isDark ? "#334155" : "#F1F5F9"}
          />

          {/* Details */}
          <View style={{ flex: 1, padding: 12, justifyContent: "space-between" }}>

            {/* Top section */}
            <View>
              <Skeleton
                isLoading={true}
                containerStyle={{
                  width: 140,
                  height: 14,
                  borderRadius: 6,
                  backgroundColor: colors.card,
                }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />

              <View style={{ marginTop: 6 }}>
                <Skeleton
                  isLoading={true}
                  containerStyle={{
                    width: 100,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: colors.card,
                  }}
                  highlightColor={isDark ? "#334155" : "#F1F5F9"}
                />
              </View>
            </View>

            {/* Bottom section */}
            <View>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <Skeleton
                  isLoading={true}
                  containerStyle={{
                    width: 30,
                    height: 18,
                    borderRadius: 4,
                    backgroundColor: colors.card,
                  }}
                  highlightColor={isDark ? "#334155" : "#F1F5F9"}
                />

                <Skeleton
                  isLoading={true}
                  containerStyle={{
                    width: 80,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: colors.card,
                  }}
                  highlightColor={isDark ? "#334155" : "#F1F5F9"}
                />
              </View>

              <Skeleton
                isLoading={true}
                containerStyle={{
                  width: 100,
                  height: 14,
                  borderRadius: 6,
                  backgroundColor: colors.card,
                }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />

            </View>
          </View>
        </View>
      ))}
    </View>
  );
}