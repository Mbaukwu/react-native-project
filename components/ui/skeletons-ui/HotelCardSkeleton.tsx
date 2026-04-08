import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useColorScheme } from "@/components/hooks/use-color-scheme";

export default function HotelCardSkeleton() {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <SkeletonPlaceholder
      backgroundColor={colorScheme === "dark" ? "#1E293B" : "#E2E8F0"}
      highlightColor={colorScheme === "dark" ? "#334155" : "#F1F5F9"}
    >
      <SkeletonPlaceholder.Item flexDirection="row" paddingHorizontal={16} gap={12}>
        {[1, 2, 3].map((i) => (
          <SkeletonPlaceholder.Item key={i} width={224} marginRight={12}>
            {/* Image */}
            <SkeletonPlaceholder.Item width={224} height={144} borderRadius={16} />
            {/* Title */}
            <SkeletonPlaceholder.Item marginTop={12} width={160} height={16} borderRadius={6} />
            {/* Location */}
            <SkeletonPlaceholder.Item marginTop={8} width={120} height={12} borderRadius={6} />
            {/* Rating */}
            <SkeletonPlaceholder.Item marginTop={8} width={80} height={20} borderRadius={6} />
            {/* Price */}
            <SkeletonPlaceholder.Item marginTop={6} width={100} height={14} borderRadius={6} />
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}