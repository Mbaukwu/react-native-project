import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { View } from "react-native";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { Colors } from "@/constants/colorTheme/colors";

export default function SectionHeaderSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <View style={{ backgroundColor: colors.background }}>
      <SkeletonPlaceholder
        backgroundColor={colorScheme === "dark" ? "#1E293B" : "#E2E8F0"}
        highlightColor={colorScheme === "dark" ? "#334155" : "#F8FAFC"}
        speed={1200}
      >
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          paddingHorizontal={16}
          marginBottom={12}
          marginTop={32}
        >
          <SkeletonPlaceholder.Item width={160} height={20} borderRadius={6} />
          <SkeletonPlaceholder.Item width={60} height={16} borderRadius={6} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}