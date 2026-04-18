// ─────────────────────────────────────────────────────────────
// BookingSummarySection
// Component: Booking summary display card
// Purpose: Shows booking breakdown (hotel, room, dates, guests, total price)
// Used in: Booking confirmation / success screen
// Depends on: formatDisplayDate utility, theme colors
// ─────────────────────────────────────────────────────────────

import { useThemeColors } from "@/components/hooks/theme/useThemeColors";
import AppText from "@/components/ui/typography/AppText";
import { formatDisplayDate } from "@/constants/utilities/dateUtils";
import { View } from "react-native";

// ── Props ────────────────────────────────────────────────────
type BookingSummarySectionProps = {
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
};

// ── Component ────────────────────────────────────────────────
export default function BookingSummarySection({ hotelName, roomType, checkIn, checkOut, guests, totalPrice }: BookingSummarySectionProps) {
  // ── Theme ─────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Derived Data ──────────────────────────────────────────
  const details = [
    { label: "Hotel", value: hotelName },
    { label: "Room", value: roomType },
    { label: "Check-in", value: formatDisplayDate(checkIn) },
    { label: "Check-out", value: formatDisplayDate(checkOut) },
    { label: "Guests", value: `${guests} guest${guests > 1 ? "s" : ""}` },
    { label: "Total", value: `₦${totalPrice.toLocaleString()}`, highlight: true },
  ];

  // ── Render ────────────────────────────────────────────────
  return (
    <View className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
      {/* Header */}
      <View className="bg-primary/10 px-4 py-3 border-b border-border">
        <AppText className="text-primary text-sm" variant="bold">
          Booking Summary
        </AppText>
      </View>

      {/* Rows */}
      {details.map((item, index) => (
        <View
          key={index}
          className={`flex-row justify-between items-center px-4 py-3.5 ${index < details.length - 1 ? "border-b border-border" : ""}`}
        >
          <AppText className="text-text-secondary text-sm">{item.label}</AppText>

          <AppText className={`text-sm ${item.highlight ? "text-primary" : "text-text"}`} variant="bold">
            {item.value}
          </AppText>
        </View>
      ))}
    </View>
  );
}
