// ─────────────────────────────────────────────────────────────
// SpecialDealsSection Component
// Screen: Home / Deals section
// Purpose: Displays hotels with special deals in horizontal scroll
// Dependencies: useSpecialDealsHotels hook, HotelCard, Expo Router
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { useSpecialDealsHotels } from "@/components/hooks/hotel-hooks/useSpecialDealsHotels";
import HotelCard from "@/components/ui/hotel/hotelCards/HotelCard";
import { ScrollView, TouchableOpacity, View } from "react-native";
import AppText from "@/components/ui/typography/AppText";
import { useRouter } from "expo-router";
import { IconSymbol } from "../icon-symbol";
import HotelCardSkeleton from "../skeletons-ui/HotelCardSkeleton";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Component ────────────────────────────────────────────────
export default function SpecialDealsSection() {

  // ── Theme ────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Navigation ────────────────────────────────────────────
  const { push } = useRouter();

  // ── Data Hook ─────────────────────────────────────────────
  const { data, isLoading, isError, error } = useSpecialDealsHotels();

  // ── Handlers ──────────────────────────────────────────────
  const handleSeeAll = () => {
    push("/searchScreen?filter=deals");
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

  // ── Error State ───────────────────────────────────────────
  if (isError) {
    return (
      <View className="py-8 px-4">
        <AppText className="text-error text-center">
          Failed to load special deals{error?.message ? `: ${error.message}` : ""}
        </AppText>
      </View>
    );
  }

  // ── Empty State ───────────────────────────────────────────
  if (!data?.length) {
    return <AppText>No special deals right now</AppText>;
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <View className="mt-8">

      {/* ── Section Header ─────────────────────────────────── */}
      <View className="flex-row items-center justify-between px-4 mb-4">

        <View className="flex-row items-center gap-2">
          <IconSymbol name="flame.fill" size={15} color={colors.accent} />

          <AppText className="text-xl text-text" variant="bold">
            Special Deals
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