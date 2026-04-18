// ─────────────────────────────────────────────────────────────
// HotelHeader
// UI Component: Hotel detail header section
// Purpose: Displays hotel name, location, rating, and review summary
// Props: name, location, city, state, rating, reviewCount, reviewScoreWord, colors
// ─────────────────────────────────────────────────────────────

import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';

// ── Props ────────────────────────────────────────────────────
type HotelHeaderProps = {
  name: string;
  location: string | null;
  city: string;
  state: string;
  rating: number | null;
  reviewCount: number | null;
  reviewScoreWord: string | null;
  colors: any;
};

// ── Component ────────────────────────────────────────────────
export default function HotelHeader({
  name,
  location,
  city,
  state,
  rating,
  reviewCount,
  reviewScoreWord,
  colors,
}: HotelHeaderProps) {
  return (
    <>
      {/* ── Main Header Row ─────────────────────────────── */}
      <View className="flex-row justify-between items-start">

        {/* ── Name & Location ───────────────────────────── */}
        <View className="flex-1">
          <AppText className="text-2xl text-text" variant="bold">
            {name}
          </AppText>

          <View className="flex-row items-center mt-1 gap-1">
            <IconSymbol name="location.fill" size={14} color={colors.textSecondary} />
            <AppText className="text-text-secondary text-sm">
              {location}, {city}, {state}
            </AppText>
          </View>
        </View>

        {/* ── Rating Badge ───────────────────────────────── */}
        {rating && (
          <View className="bg-primary px-2.5 py-1 rounded-lg">
            <AppText className="text-white text-lg" variant="bold">
              {rating.toFixed(1)}
            </AppText>

            <AppText className="text-white/80 text-xs" variant="medium">
              {reviewScoreWord}
            </AppText>
          </View>
        )}
      </View>

      {/* ── Review Count ─────────────────────────────────── */}
      {reviewCount && (
        <View className="flex-row items-center gap-1 mt-2">
          <IconSymbol name="star.fill" size={14} color={colors.gold} />
          <AppText className="text-text-secondary text-sm">
            {reviewCount} reviews
          </AppText>
        </View>
      )}
    </>
  );
}