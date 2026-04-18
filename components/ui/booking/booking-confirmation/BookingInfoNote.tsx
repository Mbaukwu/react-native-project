// ─────────────────────────────────────────────────────────────
// BookingInfoNote
// Component: Booking confirmation info note
// Shows: confirmation message after successful booking
// Depends on: theme colors
// ─────────────────────────────────────────────────────────────

import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

// ── Component ────────────────────────────────────────────────
export default function BookingInfoNote() {

  // ── Theme ──────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Render ─────────────────────────────────────────────────
  return (
    <View className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-5 flex-row gap-3 items-start">

      {/* Icon */}
      <IconSymbol name="checkmark.circle.fill" size={18} color={colors.primary} />

      {/* Message */}
      <AppText className="text-text-secondary text-xs flex-1 leading-5">
        Your booking is confirmed! You can check in anytime. Present this confirmation at the hotel reception. See you soon!
      </AppText>

    </View>
  );
}