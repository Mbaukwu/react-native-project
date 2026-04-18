// ─────────────────────────────────────────────────────────────
// DatePickerField
// UI Component: Custom date picker input field
// Uses: @react-native-community/datetimepicker
// Features: formatted display, error state, min date support
// ─────────────────────────────────────────────────────────────

import { formatDate, formatDisplayDate} from "@/constants/utilities/dateUtils";
import AppText from "@/components/ui/typography/AppText";
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../../icon-symbol";

// ── Props ────────────────────────────────────────────────────
type DatePickerFieldProps = {
  value: string;
  placeholder: string;
  error?: string;
  minimumDate?: Date;
  onDateChange: (date: Date, formattedDate: string) => void;
};

// ── Component ────────────────────────────────────────────────
export default function DatePickerField({
  value,
  placeholder,
  error,
  minimumDate,
  onDateChange,
}: DatePickerFieldProps) {
  
  // ── Theme ────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Local State ─────────────────────────────────────────
  const [showPicker, setShowPicker] = useState(false);

  // ── Render ───────────────────────────────────────────────
  return (
    <View style={{ marginBottom: 12 }}>

      {/* ── Input Field ───────────────────────────────────── */}
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.card,
          borderRadius: 12,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: error ? colors.error : colors.border,
          height: 52,
        }}
        activeOpacity={0.7}
      >
        <IconSymbol name="calendar" size={18} color={colors.icon} />

        <AppText
          style={{
            flex: 1,
            marginLeft: 12,
            color: value ? colors.text : colors.textDisabled,
          }}
        >
          {value ? formatDisplayDate(value) : placeholder}
        </AppText>
      </TouchableOpacity>

      {/* ── Error Text ─────────────────────────────────────── */}
      {error && (
        <AppText style={{ color: colors.error, fontSize: 12, marginTop: 4 }}>
          {error}
        </AppText>
      )}

      {/* ── Native Date Picker ─────────────────────────────── */}
      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event: DateTimePickerEvent, date?: Date) => {
            setShowPicker(false);
            if (event.type === "set" && date) {
              onDateChange(date, formatDate(date));
            }
          }}
          minimumDate={minimumDate || new Date()}
        />
      )}

    </View>
  );
}