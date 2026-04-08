import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { View } from "react-native";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { Colors } from "@/constants/colorTheme/colors";

export default function DestinationSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <View style={{ backgroundColor: colors.background }}>
      <SkeletonPlaceholder
        backgroundColor={colorScheme === "dark" ? "#1E293B" : "#E2E8F0"}
        highlightColor={colorScheme === "dark" ? "#334155" : "#F8FAFC"}
        speed={1200}
      >
        <SkeletonPlaceholder.Item flexDirection="row" paddingHorizontal={16} gap={12}>
          {[1, 2, 3, 4].map((i) => (
            <SkeletonPlaceholder.Item key={i} width={176} height={224} borderRadius={16} />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}