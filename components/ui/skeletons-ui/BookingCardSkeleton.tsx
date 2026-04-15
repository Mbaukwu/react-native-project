import Skeleton from "react-native-reanimated-skeleton";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { View } from "react-native";
import { Colors } from "@/constants/colorTheme/colors";

export default function BookingCardSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  return (
    <View style={{ backgroundColor: colors.background, paddingHorizontal: 16, marginTop: 22 }}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            backgroundColor: colors.card,
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 16,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          {/* Image — matches width: 110, height: 140 */}
          <Skeleton
            isLoading={true}
            containerStyle={{ width: 110, height: 140 }}
            highlightColor={isDark ? "#334155" : "#F1F5F9"}
          />

          {/* Details — matches p-3 = 12px */}
          <View style={{ flex: 1, padding: 12 }}>
            {/* Hotel name */}
            <Skeleton
              isLoading={true}
              containerStyle={{ width: 150, height: 16, borderRadius: 6 }}
              highlightColor={isDark ? "#334155" : "#F1F5F9"}
            />

            {/* Location */}
            <View style={{ marginTop: 8 }}>
              <Skeleton
                isLoading={true}
                containerStyle={{ width: 100, height: 12, borderRadius: 6 }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />
            </View>

            {/* Check-in / Check-out row */}
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12, marginBottom: 12 }}>
              <View style={{ flex: 1 }}>
                <Skeleton
                  isLoading={true}
                  containerStyle={{ width: "100%", height: 50, borderRadius: 8 }}
                  highlightColor={isDark ? "#334155" : "#F1F5F9"}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Skeleton
                  isLoading={true}
                  containerStyle={{ width: "100%", height: 50, borderRadius: 8 }}
                  highlightColor={isDark ? "#334155" : "#F1F5F9"}
                />
              </View>
            </View>

            {/* Guests + price row */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Skeleton
                isLoading={true}
                containerStyle={{ width: 80, height: 12, borderRadius: 6 }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />
              <Skeleton
                isLoading={true}
                containerStyle={{ width: 70, height: 14, borderRadius: 6 }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}