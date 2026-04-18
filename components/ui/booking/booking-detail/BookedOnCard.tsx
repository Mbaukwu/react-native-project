// ─────────────────────────────────────────────────────────────
// BookedOnCard
// Component: Booking creation date info card
// Shows: formatted "booked on" date
// Depends on: theme colors, createdAt prop
// ─────────────────────────────────────────────────────────────

import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

// ── Props ───────────────────────────────────────────────────
type BookedOnCardProps = {
  createdAt: string;
};

// ── Component ────────────────────────────────────────────────
export default function BookedOnCard({ createdAt }: BookedOnCardProps) {

  // ── Theme ──────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Derived Data ───────────────────────────────────────────
  const bookedDate = new Date(createdAt).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // ── Render ─────────────────────────────────────────────────
  return (
    <View className="bg-card border border-border rounded-2xl p-4 mb-6 flex-row items-center gap-2">

      {/* Icon */}
      <IconSymbol
        name="info.circle.fill"
        size={16}
        color={colors.platinumDark}
      />

      {/* Text */}
      <AppText className="text-text-secondary text-xs flex-1">
        Booked on {bookedDate}
      </AppText>

    </View>
  );
}