import Skeleton from "react-native-reanimated-skeleton";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { View } from "react-native";
import { Colors } from "@/constants/colorTheme/colors";

export default function SearchHotelCardSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  return (
    <View style={{ backgroundColor: colors.background, paddingHorizontal: 16 , marginTop: 22}}>
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
          {/* Image — matches width: 120, h-full */}
          <Skeleton
            isLoading={true}
            containerStyle={{ width: 120, height: 120, backgroundColor: colors.card }}
            highlightColor={isDark ? "#334155" : "#F1F5F9"}
          />
          {/* Details — matches p-3 = 12px */}
          <View style={{ flex: 1, padding: 12, justifyContent: "space-between" }}>
            {/* Top — name + location */}
            <View>
              <Skeleton
                isLoading={true}
                containerStyle={{ width: 140, height: 14, borderRadius: 6, backgroundColor: colors.card }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />
              <View style={{ marginTop: 6 }}>
                <Skeleton
                  isLoading={true}
                  containerStyle={{ width: 100, height: 12, borderRadius: 6, backgroundColor: colors.card }}
                  highlightColor={isDark ? "#334155" : "#F1F5F9"}
                />
              </View>
            </View>
            {/* Bottom — rating + price */}
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <Skeleton
                  isLoading={true}
                  containerStyle={{ width: 30, height: 18, borderRadius: 4, backgroundColor: colors.card }}
                  highlightColor={isDark ? "#334155" : "#F1F5F9"}
                />
                <Skeleton
                  isLoading={true}
                  containerStyle={{ width: 80, height: 12, borderRadius: 6, backgroundColor: colors.card }}
                  highlightColor={isDark ? "#334155" : "#F1F5F9"}
                />
              </View>
              <Skeleton
                isLoading={true}
                containerStyle={{ width: 100, height: 14, borderRadius: 6, backgroundColor: colors.card }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}