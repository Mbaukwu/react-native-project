import Skeleton from "react-native-reanimated-skeleton";
import { View } from "react-native";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { Colors } from "@/constants/colorTheme/colors";

// Full card height = image 144px + details area ~106px = ~250px total
export default function HotelCardSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const isDark = colorScheme === "dark";

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