import Skeleton from "react-native-reanimated-skeleton";
import { View } from "react-native";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { Colors } from "@/constants/colorTheme/colors";



type SectionHeaderSkeletonProps = {
  className?: string;
};


export default function SectionHeaderSkeleton({ className = "" }: SectionHeaderSkeletonProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  return (
    <View className={`flex-row justify-between items-center px-4 mb-3 mt-8 ${className}`}>
      <Skeleton
        isLoading={true}
        containerStyle={{ width: 160, height: 20, borderRadius: 6, backgroundColor: colors.card }}
        highlightColor={isDark ? "#334155" : "#F8FAFC"}
      />
      <Skeleton
        isLoading={true}
        containerStyle={{ width: 60, height: 16, borderRadius: 6, backgroundColor: colors.card }}
        highlightColor={isDark ? "#334155" : "#F8FAFC"}
      />
    </View>
  );
}