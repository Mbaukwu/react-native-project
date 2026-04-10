import { View, TextInput } from "react-native";
import { Controller, Control, FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { BookingFormData } from "@/components/forms/form-validator/bookingFormValidator";
import DatePickerField from "./DatePickerFields";

type Props = {
  control: Control<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
};

export default function StayDetailsSection({ control, errors, watch, setValue }: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const checkIn = watch("checkIn"); // reactive — re-renders when value changes
  const checkOut = watch("checkOut");

  const handleCheckInChange = (_: Date, formattedDate: string) => {
    setValue("checkIn", formattedDate, { shouldValidate: true });
    if (checkOut && formattedDate > checkOut) {
      setValue("checkOut", "", { shouldValidate: true });
    }
  };

  const handleCheckOutChange = (_: Date, formattedDate: string) => {
    if (!checkIn || formattedDate >= checkIn) {
      setValue("checkOut", formattedDate, { shouldValidate: true });
    }
  };

  return (
    <View>
      <AppText className="text-text text-lg mb-3" variant="bold">
        Stay Details
      </AppText>

      <DatePickerField
        value={checkIn}
        placeholder="Check-in Date *"
        error={errors.checkIn?.message}
        minimumDate={new Date()}
        onDateChange={handleCheckInChange}
      />

      <DatePickerField
        value={checkOut}
        placeholder="Check-out Date *"
        error={errors.checkOut?.message}
        minimumDate={checkIn ? new Date(checkIn) : new Date()}
        onDateChange={handleCheckOutChange}
      />

      {/* Guests */}
      <View className="mb-6">
        <View className={`flex-row items-center bg-card rounded-xl px-4 border ${errors.guests ? "border-error" : "border-border"}`}>
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
                value={value === 0 ? "" : value?.toString()}
                onChangeText={(text) => {
                  if (text === "") {
                    onChange(0);
                  } else {
                    const num = parseInt(text);
                    if (!isNaN(num)) onChange(num);
                  }
                }}
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
