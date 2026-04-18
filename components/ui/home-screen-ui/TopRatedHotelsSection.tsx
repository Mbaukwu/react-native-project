// ─────────────────────────────────────────────────────────────
// TopRatedHotels Component
// Screen: Home / Discovery section
// Purpose: Displays top rated hotels in horizontal scroll
// Dependencies: useTopRatedHotels hook, HotelCard, Expo Router
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { useTopRatedHotels } from "@/components/hooks/hotel-hooks/useTopRatedHotels";
import HotelCard from "@/components/ui/hotel/hotelCards/HotelCard";
import AppText from "@/components/ui/typography/AppText";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../icon-symbol";
import HotelCardSkeleton from "../skeletons-ui/HotelCardSkeleton";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Component ────────────────────────────────────────────────
export default function TopRatedHotels() {

  // ── Navigation ────────────────────────────────────────────
  const { push } = useRouter();

  // ── Theme ────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Data Hook ─────────────────────────────────────────────
  const { data, isLoading, isError, error } = useTopRatedHotels(8);

  // ── Handlers ──────────────────────────────────────────────
  const handleSeeAll = () => {
    push("/searchScreen?filter=top-rated");
  };

  // ── Loading State ─────────────────────────────────────────
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
          Failed to load top rated hotels{error?.message ? `: ${error.message}` : ""}
        </AppText>
      </View>
    );
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <View className="mt-8">

      {/* ── Section Header ─────────────────────────────────── */}
      <View className="flex-row items-center justify-between px-4 mb-4">

        <View className="flex-row items-center gap-2">
          <IconSymbol name="star.fill" size={18} color={colors.platinumDark} />

          <AppText className="text-xl text-text" variant="bold">
            Top Rated Hotels
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