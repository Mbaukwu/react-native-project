import { View, TextInput } from 'react-native';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import AppText from '@/components/ui/typography/AppText';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
import { BookingFormData } from '@/components/forms/form-validator/bookingFormValidator';

type Props = {
  control: Control<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
};

export default function GuestDetailsSection({ control, errors }: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View>
      <AppText className="text-text text-lg mb-3" variant="bold">Guest Details</AppText>

      {/* Full Name */}
      <View className="mb-3">
        <View className={`flex-row items-center bg-card rounded-xl px-4 border ${errors.guestName ? 'border-error' : 'border-border'}`}>
          <IconSymbol name="person.fill" size={18} color={colors.icon} />
          <Controller
            control={control}
            name="guestName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="flex-1 text-text ml-3 py-4"
                placeholder="Full Name *"
                placeholderTextColor={colors.textDisabled}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {errors.guestName && <AppText className="text-error text-xs mt-1">{errors.guestName.message}</AppText>}
      </View>

      {/* Email */}
      <View className="mb-3">
        <View className={`flex-row items-center bg-card rounded-xl px-4 border ${errors.guestEmail ? 'border-error' : 'border-border'}`}>
          <IconSymbol name="envelope.fill" size={18} color={colors.icon} />
          <Controller
            control={control}
            name="guestEmail"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="flex-1 text-text ml-3 py-4"
                placeholder="Email Address *"
                placeholderTextColor={colors.textDisabled}
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {errors.guestEmail && <AppText className="text-error text-xs mt-1">{errors.guestEmail.message}</AppText>}
      </View>

      {/* Phone */}
      <View className="mb-6">
        <View className="flex-row items-center bg-card rounded-xl px-4 border border-border">
          <IconSymbol name="phone.fill" size={18} color={colors.icon} />
          <Controller
            control={control}
            name="guestPhone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="flex-1 text-text ml-3 py-4"
                placeholder="Phone Number (optional)"
                placeholderTextColor={colors.textDisabled}
                keyboardType="phone-pad"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}