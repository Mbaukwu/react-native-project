// ─────────────────────────────────────────────────────────────
// FeaturedHotelsSection
// Screen: Home / Discover section
// Purpose: Displays featured hotels in horizontal scroll
// Data Source: useFeaturedHotels hook (API)
// UI: Hotel cards + loading skeleton states
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { useFeaturedHotels } from "@/components/hooks/hotel-hooks/useFeaturedHotels";

import HotelCard from "@/components/ui/hotel/hotelCards/HotelCard";

import { ScrollView, View } from "react-native";
import { IconSymbol } from "../icon-symbol";
import HotelCardSkeleton from "../skeletons-ui/HotelCardSkeleton";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";
import AppText from "../typography/AppText";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Component ────────────────────────────────────────────────
export default function FeaturedHotelsSection() {
  // ── Theme ────────────────────────────────────────────────

  const { colors } = useThemeColors();

  // ── Data Fetching ────────────────────────────────────────
  const { data, isLoading, isError, error } = useFeaturedHotels();

  // ── Loading State ────────────────────────────────────────
  if (isLoading) {
    return (
      <View className="mt-2">
        <SectionHeaderSkeleton />
        <HotelCardSkeleton />
      </View>
    );
  }

  // ── Error State ───────────────────────────────────────────
  if (isError) {
    return (
      <View className="py-8 px-4">
        <AppText className="text-error text-center">
          Failed to load featured hotels
          {error?.message ? `: ${error.message}` : ""}
        </AppText>
      </View>
    );
  }

  // ── Empty State ───────────────────────────────────────────
  if (!data?.length) {
    return <AppText>No featured hotels available</AppText>;
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <View className="mt-6">
      {/* ── Section Header ─────────────────────────────────── */}
      <View className="flex-row items-center px-4 mb-4">
        <IconSymbol name="star.fill" size={15} color={colors.gold} />
        <AppText className="text-xl text-text ml-2" variant="bold">
          Featured Hotels
        </AppText>
      </View>

      {/* ── Horizontal List ────────────────────────────────── */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {data.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </ScrollView>
    </View>
  );
}
