// ─────────────────────────────────────────────────────────────
// HotelSummaryCard
// UI Component: Displays booking summary for selected hotel
// Shows: hotel name, room type, and total price
// ─────────────────────────────────────────────────────────────

import { View } from 'react-native';
import AppText from '@/components/ui/typography/AppText';

// ── Props ────────────────────────────────────────────────────
type Props = {
  hotelName: string;
  roomType: string;
  price: string;
};

// ── Component ────────────────────────────────────────────────
export default function HotelSummaryCard({ hotelName, roomType, price }: Props) {
  return (
    <View className="bg-primary/10 rounded-xl p-4 mb-6">

      {/* ── Hotel Name ────────────────────────────────────── */}
      <AppText className="text-primary text-lg" variant="bold">
        {hotelName}
      </AppText>

      {/* ── Room Type ─────────────────────────────────────── */}
      <AppText className="text-text-secondary text-sm mt-1">
        Room: {roomType}
      </AppText>

      {/* ── Price ─────────────────────────────────────────── */}
      <AppText className="text-text-secondary text-sm">
        Total: ₦{Number(price).toLocaleString()}
      </AppText>

    </View>
  );
}