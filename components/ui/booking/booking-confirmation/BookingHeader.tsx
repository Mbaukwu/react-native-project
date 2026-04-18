// ─────────────────────────────────────────────────────────────
// BookingHeader
// Component: Booking confirmation header
// Shows: success icon, confirmation title, hotel name message
// Depends on: theme colors, hotelName prop
// ─────────────────────────────────────────────────────────────

import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

// ── Props ───────────────────────────────────────────────────
type SuccessHeaderProps = {
  hotelName: string;
};

// ── Component ────────────────────────────────────────────────
export default function BookingHeader({ hotelName }: SuccessHeaderProps) {

  // ── Theme ──────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Render ─────────────────────────────────────────────────
  return (
    <View className="items-center mb-8 mt-6">

      {/* Success Icon */}
      <View className="bg-success/15 p-6 rounded-full mb-4">
        <IconSymbol name="checkmark.circle.fill" size={72} color={colors.success} />
      </View>

      {/* Title */}
      <AppText className="text-text text-2xl text-center" variant="bold">
        Booking Confirmed!
      </AppText>

      {/* Subtitle */}
      <AppText className="text-text-secondary text-center mt-2 leading-6" variant="medium">
        Your stay at {hotelName} is all set. We look forward to welcoming you.
      </AppText>

    </View>
  );
}