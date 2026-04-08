import { View, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppText from '@/components/ui/typography/AppText';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';

type DatePickerFieldProps = {
  label?: string;
  value: string;
  placeholder: string;
  error?: string;
  minimumDate?: Date;
  onDateChange: (date: Date, formattedDate: string) => void;
};

export default function DatePickerField({
  label,
  value,
  placeholder,
  error,
  minimumDate,
  onDateChange,
}: DatePickerFieldProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      onDateChange(date, formatDate(date));
    }
  };

  return (
    <View className="mb-3">
      {label && (
        <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">
          {label}
        </AppText>
      )}
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className={`flex-row items-center bg-card rounded-xl px-4 border ${error ? 'border-error' : 'border-border'}`}
        style={{ height: 52 }}
      >
        <IconSymbol name="calendar" size={18} color={colors.icon} />
        <AppText className={`flex-1 ml-3 ${value ? 'text-text' : 'text-text-disabled'}`}>
          {value || placeholder}
        </AppText>
      </TouchableOpacity>
      {error && <AppText className="text-error text-xs mt-1">{error}</AppText>}

      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate || new Date()}
        />
      )}
    </View>
  );
}