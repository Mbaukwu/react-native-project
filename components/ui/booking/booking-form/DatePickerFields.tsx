import { useColorScheme } from "@/components/hooks/use-color-scheme";
import AppText from "@/components/ui/typography/AppText";
import { Colors } from "@/constants/colorTheme/colors";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../../icon-symbol";

type DatePickerFieldProps = {
  value: string;
  placeholder: string;
  error?: string;
  minimumDate?: Date;
  onDateChange: (date: Date, formattedDate: string) => void;
};

export default function DatePickerField({ value, placeholder, error, minimumDate, onDateChange }: DatePickerFieldProps) {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDisplay = (dateStr: string): string => {
    const [year, month, day] = dateStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowPicker(false);
    if (event.type === "set" && date) {
      onDateChange(date, formatDate(date));
    }
  };

  return (
    <View style={{ marginBottom: 12 }}>
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
        <AppText style={{ flex: 1, marginLeft: 12, color: value ? colors.text : colors.textDisabled }}>
          {value ? formatDisplay(value) : placeholder}
        </AppText>
      </TouchableOpacity>
      {error && <AppText style={{ color: colors.error, fontSize: 12, marginTop: 4 }}>{error}</AppText>}

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
