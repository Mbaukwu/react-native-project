// ─────────────────────────────────────────────────────────────
// DatePickerField Component
// Screen: Shared form component (Date selection input)
// Purpose: Reusable date picker with formatted display + validation
// Dependencies: DateTimePicker, AppText, IconSymbol, useThemeColors, formatDate
// ─────────────────────────────────────────────────────────────

import { View, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppText from '@/components/ui/typography/AppText';
import { IconSymbol } from '@/components/ui/icon-symbol';

import { formatDate} from "@/constants/utilities/dateUtils";
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

// ── Props Definition ─────────────────────────────────────────
type DatePickerFieldProps = {
  label?: string;
  value: string;
  placeholder: string;
  error?: string;
  minimumDate?: Date;
  onDateChange: (date: Date, formattedDate: string) => void;
};

// ── Component ────────────────────────────────────────────────
export default function DatePickerField({
  label,
  value,
  placeholder,
  error,
  minimumDate,
  onDateChange,
}: DatePickerFieldProps) {

  const { colors } = useThemeColors();

  // ── Local State ──────────────────────────────────────────
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );

  // ── Handlers ─────────────────────────────────────────────
  const handleChange = (e: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
      onDateChange(date, formatDate(date));
    }
  };

  return (
    <View className="mb-3">

      {/* ── Optional Label ─────────────────────────────────── */}
      {label && (
        <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">
          {label}
        </AppText>
      )}

      {/* ── Date Input Trigger ────────────────────────────── */}
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className={`flex-row items-center bg-card rounded-xl px-4 border ${
          error ? 'border-error' : 'border-border'
        }`}
        style={{ height: 52 }}
      >
        <IconSymbol name="calendar" size={18} color={colors.icon} />

        <AppText className={`flex-1 ml-3 ${value ? 'text-text' : 'text-text-disabled'}`}>
          {value || placeholder}
        </AppText>
      </TouchableOpacity>

      {/* ── Error Message ─────────────────────────────────── */}
      {error && (
        <AppText className="text-error text-xs mt-1">
          {error}
        </AppText>
      )}

      {/* ── Native Date Picker ────────────────────────────── */}
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