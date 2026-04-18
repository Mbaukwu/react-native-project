

import Skeleton from "react-native-reanimated-skeleton";
import { View } from "react-native";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { Colors } from "@/constants/colorTheme/colors";

export default function BookingCardSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const isDark = colorScheme === "dark";
  const bg = isDark ? "#1E293B" : "#E2E8F0";
  const highlight = isDark ? "#334155" : "#F1F5F9";

  return (
    <View style={{ backgroundColor: colors.background, paddingHorizontal: 16, paddingTop: 32 }}>

      {/* Header — matches BookingHeader */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Skeleton isLoading={true} containerStyle={{ width: 140, height: 28, borderRadius: 8, backgroundColor: bg }} highlightColor={highlight} />
        <Skeleton isLoading={true} containerStyle={{ width: 70, height: 26, borderRadius: 20, backgroundColor: bg }} highlightColor={highlight} />
      </View>

      {/* Tabs — matches BookingTabs (two pill tabs) */}
      <View style={{ flexDirection: "row", gap: 16, marginBottom: 20 }}>
        <Skeleton isLoading={true} containerStyle={{ width: 100, height: 32, borderRadius: 20, backgroundColor: bg }} highlightColor={highlight} />
        <Skeleton isLoading={true} containerStyle={{ width: 80, height: 32, borderRadius: 20, backgroundColor: bg }} highlightColor={highlight} />
      </View>

      {/* Cards */}
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={{
            backgroundColor: colors.card,
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 16,
            borderWidth: 0.5,
            borderColor: colors.border,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            {/* Image — width: 110, height: 140 */}
            <Skeleton isLoading={true} containerStyle={{ width: 110, height: 140, backgroundColor: bg }} highlightColor={highlight} />

            {/* Details — p-3 = 12px */}
            <View style={{ flex: 1, padding: 12 }}>
              <Skeleton isLoading={true} containerStyle={{ width: 140, height: 16, borderRadius: 6, backgroundColor: bg }} highlightColor={highlight} />
              <View style={{ marginTop: 8 }}>
                <Skeleton isLoading={true} containerStyle={{ width: 90, height: 12, borderRadius: 6, backgroundColor: bg }} highlightColor={highlight} />
              </View>

              {/* Check-in / Check-out tiles */}
              <View style={{ flexDirection: "row", gap: 8, marginTop: 16, marginBottom: 8 }}>
                {[1, 2].map((j) => (
                  <View key={j} style={{ flex: 1, backgroundColor: colors.background, borderRadius: 8, padding: 8 }}>
                    <Skeleton isLoading={true} containerStyle={{ width: 40, height: 10, borderRadius: 4, backgroundColor: bg }} highlightColor={highlight} />
                    <View style={{ marginTop: 4 }}>
                      <Skeleton isLoading={true} containerStyle={{ width: 60, height: 12, borderRadius: 4, backgroundColor: bg }} highlightColor={highlight} />
                    </View>
                  </View>
                ))}
              </View>

              {/* Guests + price */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                <Skeleton isLoading={true} containerStyle={{ width: 100, height: 12, borderRadius: 6, backgroundColor: bg }} highlightColor={highlight} />
                <Skeleton isLoading={true} containerStyle={{ width: 70, height: 14, borderRadius: 6, backgroundColor: bg }} highlightColor={highlight} />
              </View>
            </View>
          </View>

          {/* Action button row */}
          <View style={{ borderTopWidth: 0.5, borderTopColor: colors.border, paddingVertical: 12, alignItems: "center" }}>
            <Skeleton isLoading={true} containerStyle={{ width: 100, height: 14, borderRadius: 6, backgroundColor: bg }} highlightColor={highlight} />
          </View>
        </View>
      ))}
    </View>
  );
}