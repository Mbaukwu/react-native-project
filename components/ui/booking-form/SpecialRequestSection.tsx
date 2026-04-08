import { View, TextInput } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import AppText from '@/components/ui/typography/AppText';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
import { BookingFormData } from '@/components/forms/form-validator/bookingFormValidator';

type Props = {
  control: Control<BookingFormData>;
};

export default function SpecialRequestsSection({ control }: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View className="mb-6">
      <AppText className="text-text text-lg mb-3" variant="bold">Special Requests</AppText>
      <View className="bg-card rounded-xl px-4 border border-border">
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