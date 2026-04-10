import Skeleton from "react-native-reanimated-skeleton";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { View } from "react-native";
import { Colors } from "@/constants/colorTheme/colors";

export default function HotelCardSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  return (
    <View>
      <View className="flex-row px-4 gap-3">
        {[1, 2, 3].map((i) => (
          <View key={i} className="w-56">
            {/* Image */}
            <Skeleton
              isLoading={true}
              containerStyle={{ width: 224, height: 200, borderRadius: 16, backgroundColor: colors.card }}
              highlightColor={isDark ? "#334155" : "#F1F5F9"}
            />
            {/* Title */}
            <View className="mt-3">
              <Skeleton
                isLoading={true}
                containerStyle={{ width: 160, height: 16, borderRadius: 6, backgroundColor: colors.card }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />
            </View>
            {/* Location */}
            <View className="mt-2">
              <Skeleton
                isLoading={true}
                containerStyle={{ width: 120, height: 12, borderRadius: 6,  }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />
            </View>
            {/* Rating */}
            <View className="flex-row items-center gap-1 mt-2">
              <Skeleton
                isLoading={true}
                containerStyle={{ width: 30, height: 16, borderRadius: 4,  }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />
              <Skeleton
                isLoading={true}
                containerStyle={{ width: 60, height: 12, borderRadius: 6, }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />
            </View>
            {/* Price */}
            <View className="mt-2">
              <Skeleton
                isLoading={true}
                containerStyle={{ width: 100, height: 14, borderRadius: 6, }}
                highlightColor={isDark ? "#334155" : "#F1F5F9"}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}