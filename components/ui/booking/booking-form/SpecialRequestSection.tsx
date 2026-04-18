// ─────────────────────────────────────────────────────────────
// SpecialRequestsSection
// UI Component: Booking form input for optional special requests
// Uses: react-hook-form Controller for textarea input
// Field: specialRequests (optional)
// ─────────────────────────────────────────────────────────────

import { View, TextInput } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';
import { BookingFormData } from '@/components/forms/form-validator/bookingFormValidator';

// ── Props ────────────────────────────────────────────────────
type Props = {
  control: Control<BookingFormData>;
};

// ── Component ────────────────────────────────────────────────
export default function SpecialRequestsSection({ control }: Props) {

  // ── Theme ────────────────────────────────────────────────
const { colors } = useThemeColors();

  // ── Render ───────────────────────────────────────────────
  return (
    <View className="mb-6">

      {/* ── Section Title ─────────────────────────────────── */}
      <AppText className="text-text text-lg mb-3" variant="bold">
        Special Requests
      </AppText>

      {/* ── Input Container ───────────────────────────────── */}
      <View
        className="bg-card rounded-xl px-4 border border-border"
        style={{ minHeight: 50 }}
      >
        <Controller
          control={control}
          name="specialRequests"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="flex-1 text-text py-4"
              placeholder="Any special requests? (optional)"
              placeholderTextColor={colors.textDisabled}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </View>

    </View>
  );
}