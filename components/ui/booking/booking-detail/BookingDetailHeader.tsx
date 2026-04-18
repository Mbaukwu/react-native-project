// ─────────────────────────────────────────────────────────────
// BookingDetailHeader
// Component: Booking details screen header
// Shows: back navigation, title, booking status badge
// Depends on: router, theme colors, status props
// ─────────────────────────────────────────────────────────────

import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

// ── Props ───────────────────────────────────────────────────
type BookingDetailHeaderProps = {
  status: string;
  statusColor: string;
};

// ── Component ────────────────────────────────────────────────
export default function BookingDetailHeader({
  status,
  statusColor,
}: BookingDetailHeaderProps) {

  // ── Navigation ─────────────────────────────────────────────
  const { back } = useRouter();

  // ── Theme ──────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Render ─────────────────────────────────────────────────
  return (
    <View className="flex-row items-center mb-4 pt-5">

      {/* Back Button */}
      <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
        <IconSymbol name="chevron.left" size={24} color={colors.text} />
      </TouchableOpacity>

      {/* Title */}
      <AppText className="text-text text-xl flex-1" variant="bold">
        Booking Details
      </AppText>

      {/* Status Badge */}
      <View
        className="px-3 py-1 rounded-full"
        style={{ backgroundColor: `${statusColor}20` }}
      >
        <AppText
          className="text-xs capitalize"
          style={{ color: statusColor }}
          variant="bold"
        >
          {status}
        </AppText>
      </View>

    </View>
  );
}