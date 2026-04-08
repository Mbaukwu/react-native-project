import { View, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppText from  '@/components/ui/typography/AppText';
import { IconSymbol } from '../icon-symbol';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';

type DatePickerFieldProps = {
  value: string;
  placeholder: string;
  error?: string;
  minimumDate?: Date;
  onDateChange: (date: Date, formattedDate: string) => void;
};

export default function DatePickerField({
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

  const handleChange = (event: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      onDateChange(date, formatDate(date));
    }
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.card,
          borderRadius: 12,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: error ? colors.error : colors.border,
          height: 52,
        }}
      >
        <IconSymbol name="calendar" size={18} color={colors.icon} />
        <AppText style={{ flex: 1, marginLeft: 12, color: value ? colors.text : colors.textDisabled }}>
          {value || placeholder}
        </AppText>
      </TouchableOpacity>
      {error && <AppText style={{ color: colors.error, fontSize: 12, marginTop: 4 }}>{error}</AppText>}

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