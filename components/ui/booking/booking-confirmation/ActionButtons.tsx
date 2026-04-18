// ─────────────────────────────────────────────────────────────
// ActionButtons
// Component: Booking confirmation actions
// Shows: navigation buttons after booking confirmation
// Depends on: router navigation, theme colors
// ─────────────────────────────────────────────────────────────

import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

// ── Component ────────────────────────────────────────────────
export default function ActionButtons() {

  // ── Navigation ─────────────────────────────────────────────
  const { push } = useRouter();

  // ── Theme ──────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Render ─────────────────────────────────────────────────
  return (
    <>
      {/* View Bookings */}
      <TouchableOpacity
        onPress={() => push('/(tabs)/bookings')}
        className="bg-primary py-4 rounded-2xl items-center mb-3"
      >
        <AppText className="text-white text-base" variant="bold">
          View My Bookings
        </AppText>
      </TouchableOpacity>

      {/* Back to Home */}
      <TouchableOpacity
        onPress={() => push('/(tabs)/home')}
        className="py-4 rounded-2xl items-center border border-border"
      >
        <AppText className="text-text text-base" variant="bold">
          Back to Home
        </AppText>
      </TouchableOpacity>
    </>
  );
}