import Skeleton from "react-native-reanimated-skeleton";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { View } from "react-native";
import { Colors } from "@/constants/colorTheme/colors";

export default function HomeHeaderSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 48, paddingBottom: 16, backgroundColor: colors.background }}>
      {/* Greeting — text-[23px] bold */}
      <Skeleton
        isLoading={true}
        containerStyle={{ width: 220, height: 24, borderRadius: 8, backgroundColor: colors.card }}
        highlightColor={isDark ? "#334155" : "#F1F5F9"}
      />
      {/* Subtitle — text-sm mt-1 mb-2 */}
      <View style={{ marginTop: 8, marginBottom: 10 }}>
        <Skeleton
          isLoading={true}
          containerStyle={{ width: 180, height: 14, borderRadius: 6, backgroundColor: colors.card }}
          highlightColor={isDark ? "#334155" : "#F1F5F9"}
        />
      </View>
      {/* Search bar — h-12 = 48px, rounded-xl */}
      <Skeleton
        isLoading={true}
        containerStyle={{ width: "100%", height: 48, borderRadius: 12, backgroundColor: colors.card }}
        highlightColor={isDark ? "#334155" : "#F1F5F9"}
      />
    </View>
  );
}