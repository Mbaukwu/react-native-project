import { View, TextInput } from 'react-native';
import { Controller, Control, FieldErrors, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import AppText from '@/components/ui/typography/AppText';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
import { BookingFormData } from '@/components/forms/form-validator/bookingFormValidator';
import DatePickerField from './DatePickerFields';

type Props = {
  control: Control<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  getValues: UseFormGetValues<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
};

export default function StayDetailsSection({ control, errors, getValues, setValue }: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleCheckInChange = (date: Date, formattedDate: string) => {
    setValue('checkIn', formattedDate);
    if (getValues('checkOut') && formattedDate > getValues('checkOut')) {
      setValue('checkOut', '');
    }
  };

  const handleCheckOutChange = (date: Date, formattedDate: string) => {
    const checkIn = getValues('checkIn');
    if (checkIn && formattedDate >= checkIn) {
      setValue('checkOut', formattedDate);
    }
  };

  return (
    <View>
      <AppText className="text-text text-lg mb-3" variant="bold">Stay Details</AppText>

      <DatePickerField
        value={getValues('checkIn')}
        placeholder="Check-in Date *"
        error={errors.checkIn?.message}
        minimumDate={new Date()}
        onDateChange={handleCheckInChange}
      />

      <DatePickerField
        value={getValues('checkOut')}
        placeholder="Check-out Date *"
        error={errors.checkOut?.message}
        minimumDate={getValues('checkIn') ? new Date(getValues('checkIn')) : new Date()}
        onDateChange={handleCheckOutChange}
      />

      {/* Guests */}
      <View className="mb-6">
        <View className={`flex-row items-center bg-card rounded-xl px-4 border ${errors.guests ? 'border-error' : 'border-border'}`}>
          <IconSymbol name="person.fill" size={18} color={colors.icon} />
          <Controller
            control={control}
            name="guests"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="flex-1 text-text ml-3 py-4"
                placeholder="Number of Guests *"
                placeholderTextColor={colors.textDisabled}
                keyboardType="numeric"
                value={value?.toString()}
                onChangeText={(text) => onChange(parseInt(text) || 1)}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        {errors.guests && <AppText className="text-error text-xs mt-1">{errors.guests.message}</AppText>}
      </View>
    </View>
  );
}