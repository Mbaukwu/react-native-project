// ─────────────────────────────────────────────────────────────
// PopularDestinations
// Screen: Home / Discover section
// Purpose: Displays popular travel destinations as horizontal cards
// Data Source: usePopularDestinations hook (API)
// UI: Feature cards + loading skeleton states
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { usePopularDestinations } from "@/components/hooks/hotel-hooks/usePopularDestination";

import FeatureCard from "@/components/ui/hotel/hotelCards/FeatureCard";
import AppText from "@/components/ui/typography/AppText";

import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { IconSymbol } from "../icon-symbol";
import DestinationSkeleton from "../skeletons-ui/DestinationSkeleton";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Component ────────────────────────────────────────────────
export default function PopularDestinations() {

  // ── Navigation ───────────────────────────────────────────
  const { push } = useRouter();

  // ── Data Fetching ────────────────────────────────────────
  const { data: cities, isLoading, isError } = usePopularDestinations();

  // ── Theme ────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Loading State ────────────────────────────────────────
  if (isLoading) {
    return (
      <View className="mt-2">
        <SectionHeaderSkeleton />
        <DestinationSkeleton />
      </View>
    );
  }

  // ── Error / Empty State ───────────────────────────────────
  if (isError || !cities || cities.length === 0) return null;

  // ── Render ───────────────────────────────────────────────
  return (
    <View className="mt-8">

      {/* ── Section Header ─────────────────────────────────── */}
      <View className="flex-row items-center px-4 mb-4">
        <IconSymbol name="airplane" size={15} color={colors.success} />

        <AppText variant="bold" className="text-xl text-text ml-2">
          Popular Destinations
        </AppText>
      </View>

      {/* ── Horizontal List ────────────────────────────────── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {cities.map((dest) => (
          <FeatureCard
            key={dest.city}
            title={dest.city}
            subtitle={`${dest.count} hotels`}
            imageUrl={dest.image}
            onPress={() =>
              push({
                pathname: "/searchScreen",
                params: { city: dest.city },
              })
            }
          />
        ))}
      </ScrollView>

    </View>
  );
}