// ─────────────────────────────────────────────────────────────
// AmenitiesSection Component
// Screen: Home / Discover section
// Purpose: Displays list of hotel amenities as horizontal cards
// Dependencies: useAmenities hook, FeatureCard, Expo Router, ScrollView
// ─────────────────────────────────────────────────────────────

import { useAmenities } from "@/components/hooks/hotel-hooks/useHotelAmenities";

import AppText from "@/components/ui/typography/AppText";

import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import FeatureCard from "../hotel/hotelCards/FeatureCard";
import { IconSymbol } from "../icon-symbol";
import FeatureCardSkeleton from "../skeletons-ui/DestinationSkeleton";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Component ────────────────────────────────────────────────
export default function AmenitiesSection() {
  // Navigation function to move between screens
  const { push } = useRouter();

  // theme
  const { colors } = useThemeColors();

  // Amenities data + loading/error state from hook
  const { data: amenities, isLoading, isError } = useAmenities();

  // ── Loading State ─────────────────────────────────────────
  if (isLoading) {
    return (
      <View className="mt-2">
        <SectionHeaderSkeleton />
        <FeatureCardSkeleton />
      </View>
    );
  }

  // ── Error / Empty State ───────────────────────────────────
  if (isError || !amenities?.length) {
    return null;
  }

  return (
    <View className="mt-8">
      {/* ── Section Header ─────────────────────────────────── */}
      <View className="flex-row items-center justify-between px-4 mb-4">
        <View className="flex-row items-center gap-2">
          <IconSymbol name="spa.fill" size={15} color={colors.favorite} />

          <AppText variant="bold" className="text-xl text-text">
            Browse by Amenities
          </AppText>
        </View>
      </View>

      {/* ── Horizontal List ────────────────────────────────── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {amenities.map((item) => (
          <FeatureCard
            key={item.amenity}
            title={item.amenity}
            subtitle={`${item.count} hotels`}
            imageUrl={item.image}
            onPress={() =>
              push({
                pathname: "/searchScreen",
                params: { amenity: item.amenity },
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}
