// ─────────────────────────────────────────────────────────────
// LuxuryStaysSection
// Screen: Home / Discover section
// Purpose: Displays luxury hotel stays in horizontal scroll
// Data Source: useLuxuryStays hook (API)
// UI: Hotel cards + loading skeleton states
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { useLuxuryStays } from "@/components/hooks/hotel-hooks/useLuxuryStays";

import HotelCard from "@/components/ui/hotel/hotelCards/HotelCard";
import AppText from "@/components/ui/typography/AppText";

import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../icon-symbol";
import HotelCardSkeleton from "../skeletons-ui/HotelCardSkeleton";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Component ────────────────────────────────────────────────
export default function LuxuryStaysSection() {

  // ── Navigation ───────────────────────────────────────────
  const { push } = useRouter();

  // ── Theme ────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Data Fetching ────────────────────────────────────────
  const { data, isLoading, isError, error } = useLuxuryStays();

  // ── Handlers ─────────────────────────────────────────────
  const handleSeeAll = () => {
    push("/searchScreen?filter=luxury");
  };

  // ── Loading State ────────────────────────────────────────
  if (isLoading) {
    return (
      <View className="mt-2">
        <SectionHeaderSkeleton />
        <HotelCardSkeleton />
      </View>
    );
  }

  // ── Error / Empty State ───────────────────────────────────
  if (isError || !data?.length) {
    return (
      <View className="py-8 px-4">
        <AppText className="text-error text-center">
          Failed to load luxury stays
          {error?.message ? `: ${error.message}` : ""}
        </AppText>
      </View>
    );
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <View className="mt-8">

      {/* ── Section Header ─────────────────────────────────── */}
      <View className="flex-row items-center justify-between px-4 mb-4">

        <View className="flex-row items-center gap-2">
          <IconSymbol name="sparkles" size={15} color={colors.success} />

          <AppText className="text-xl text-text" variant="bold">
            Luxury Stays
          </AppText>
        </View>

        <TouchableOpacity onPress={handleSeeAll}>
          <AppText className="text-primary text-sm" variant="medium">
            See all →
          </AppText>
        </TouchableOpacity>

      </View>

      {/* ── Horizontal List ────────────────────────────────── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {data.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </ScrollView>

    </View>
  );
}