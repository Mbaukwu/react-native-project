import Skeleton from "react-native-reanimated-skeleton";
import { View } from "react-native";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { Colors } from "@/constants/colorTheme/colors";

export default function DestinationSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  return (
    <View style={{ backgroundColor: colors.background }}>
      <View className="flex-row px-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            isLoading={true}
            containerStyle={{ width: 176, height: 224, borderRadius: 16, backgroundColor: colors.card }}
            highlightColor={isDark ? "#334155" : "#F8FAFC"}
          />
        ))}
      </View>
    </View>
  );
}