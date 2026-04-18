// ─────────────────────────────────────────────────────────────
// BookingConfirmation
// Screen: Booking Confirmation
// Shows: Booking success details after reservation is completed
// Depends on: BookingHeader, BookingSummaryCard, InfoNote, ActionButtons
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { ScrollView, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ScreenWrapper from '@/components/global/ScreenWrapper';
import BookingHeader from '@/components/ui/booking/booking-confirmation/BookingHeader';
import BookingSummaryCard from '@/components/ui/booking/booking-confirmation/BookingSummaryCard';
import InfoNote from '@/components/ui/booking/booking-confirmation/BookingInfoNote';
import ActionButtons from '@/components/ui/booking/booking-confirmation/ActionButtons';

// ── Component ────────────────────────────────────────────────
export default function BookingConfirmation() {

  // ── Route Params ───────────────────────────────────────────
  const { hotelName, price, checkIn, checkOut, roomType, guests } =
    useLocalSearchParams<{
      hotelName: string;
      price: string;
      checkIn: string;
      checkOut: string;
      roomType: string;
      guests: string;
    }>();

  // ── Render ─────────────────────────────────────────────────
  return (
    <ScreenWrapper>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-6 pt-8 pb-10">

          {/* ── Header ─────────────────────────────────────── */}
          <BookingHeader hotelName={hotelName} />

          {/* ── Booking Summary ───────────────────────────── */}
          <BookingSummaryCard
            hotelName={hotelName}
            price={price}
            checkIn={checkIn}
            checkOut={checkOut}
            roomType={roomType}
            guests={guests}
          />

          {/* ── Info Note ─────────────────────────────────── */}
          <InfoNote />

          {/* ── Actions ───────────────────────────────────── */}
          <ActionButtons />

        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}