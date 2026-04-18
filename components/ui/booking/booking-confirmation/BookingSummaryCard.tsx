// ─────────────────────────────────────────────────────────────
// BookingSummaryCard
// Component: Booking summary details card
// Shows: hotel, room, dates, guests, total price breakdown
// Depends on: date utils, theme colors
// ─────────────────────────────────────────────────────────────

import { useThemeColors } from "@/components/hooks/theme/useThemeColors";
import AppText from "@/components/ui/typography/AppText";
import { formatDisplayDate } from "@/constants/utilities/dateUtils";
import { View } from "react-native";

// ── Props ───────────────────────────────────────────────────
type BookingSummaryCardProps = {
  hotelName: string;
  price: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: string;
};

// ── Component ────────────────────────────────────────────────
export default function BookingSummaryCard({ hotelName, price, checkIn, checkOut, roomType, guests }: BookingSummaryCardProps) {
  // ── Theme ──────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Data ───────────────────────────────────────────────────
  const details = [
    { label: "Hotel", value: hotelName },
    { label: "Room", value: roomType },
    { label: "Check-in", value: formatDisplayDate(checkIn) },
    { label: "Check-out", value: formatDisplayDate(checkOut) },
    { label: "Guests", value: `${guests} guest${Number(guests) > 1 ? "s" : ""}` },
    { label: "Total", value: `₦${Number(price).toLocaleString()}`, highlight: true },
  ];

  // ── Render ─────────────────────────────────────────────────
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
