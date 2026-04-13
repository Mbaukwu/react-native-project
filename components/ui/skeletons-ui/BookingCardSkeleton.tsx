import { View } from "react-native";
import { useColorScheme } from "@/components/hooks/use-color-scheme";

export default function BookingCardSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "dark" ? "#1E293B" : "#E2E8F0";

  return (
    <View className="bg-card rounded-2xl overflow-hidden mb-4 border border-border">
      <View className="flex-row">
        {/* Image skeleton - matches 110x140 */}
        <View style={{ width: 110, height: 140, backgroundColor: bgColor }} />

        {/* Details skeleton */}
        <View className="flex-1 p-3">
          {/* Hotel name */}
          <View className="h-5 w-32 rounded-md" style={{ backgroundColor: bgColor }} />
          
          {/* Location */}
          <View className="flex-row items-center gap-1 mt-1">
            <View className="h-3 w-3 rounded-full" style={{ backgroundColor: bgColor }} />
            <View className="h-3 w-20 rounded-md" style={{ backgroundColor: bgColor }} />
          </View>

          {/* Check-in / Check-out grid */}
          <View className="flex-row gap-2 mt-3 mb-2">
            <View className="flex-1 rounded-lg px-2 py-1.5" style={{ backgroundColor: bgColor }}>
              <View className="h-3 w-12 rounded-md mb-1" style={{ backgroundColor: colorScheme === "dark" ? "#475569" : "#CBD5E1" }} />
              <View className="h-4 w-16 rounded-md" style={{ backgroundColor: colorScheme === "dark" ? "#475569" : "#CBD5E1" }} />
            </View>
            <View className="flex-1 rounded-lg px-2 py-1.5" style={{ backgroundColor: bgColor }}>
              <View className="h-3 w-12 rounded-md mb-1" style={{ backgroundColor: colorScheme === "dark" ? "#475569" : "#CBD5E1" }} />
              <View className="h-4 w-16 rounded-md" style={{ backgroundColor: colorScheme === "dark" ? "#475569" : "#CBD5E1" }} />
            </View>
          </View>

          {/* Guests + price */}
          <View className="flex-row items-center justify-between mt-1">
            <View className="h-3 w-24 rounded-md" style={{ backgroundColor: bgColor }} />
            <View className="h-4 w-16 rounded-md" style={{ backgroundColor: bgColor }} />
          </View>
        </View>
      </View>
    </View>
  );
}