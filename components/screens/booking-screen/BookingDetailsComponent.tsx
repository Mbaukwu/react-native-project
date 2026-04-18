// ─────────────────────────────────────────────────────────────
// BookingDetailsComponent
// Screen: Booking Details
// Shows: Full details of a selected booking (hotel, dates, status, etc.)
// Depends on: useBookingDetails, BookingDetailHeader,
//             HotelInfoCard, BookingSummarySection,
//             SpecialRequestsCard, BookedOnCard, ViewHotelButton
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenWrapper from '@/components/global/ScreenWrapper';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';
import { useBookingDetails } from '@/components/hooks/booking-hook/useBookingDetails';
import BookingDetailHeader from '@/components/ui/booking/booking-detail/BookingDetailHeader';
import HotelInfoCard from '@/components/ui/booking/booking-detail/HotelInfoCard';
import BookingSummarySection from '@/components/ui/booking/booking-detail/BookingSummarySection';
import SpecialRequestsCard from '@/components/ui/booking/booking-detail/SpecialRequestsCard';
import BookedOnCard from '@/components/ui/booking/booking-detail/BookedOnCard';
import ViewHotelButton from '@/components/ui/booking/booking-detail/ViewHotelCTA';

// ── Component ────────────────────────────────────────────────
export default function BookingDetailsComponent() {

  // ── Route Params ───────────────────────────────────────────
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();

  // ── Navigation & Theme ─────────────────────────────────────
  const { back } = useRouter();
  const { colors } = useThemeColors();

  // ── Data Fetching ──────────────────────────────────────────
  const { data: booking, isLoading, isError } = useBookingDetails(bookingId);

  // ── Derived Values ─────────────────────────────────────────
  const statusColor = booking
    ? ({
        confirmed: colors.success,
        cancelled: colors.error,
        completed: colors.textSecondary,
      }[booking.status] ?? colors.textSecondary)
    : colors.textSecondary;

  // ── Guards ─────────────────────────────────────────────────
  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  if (isError || !booking) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center px-6">
          <AppText className="text-error text-center">
            Failed to load booking details
          </AppText>

          {/* Retry / Back Action */}
          <TouchableOpacity
            onPress={() => back()}
            className="mt-4 bg-primary px-6 py-3 rounded-xl"
          >
            <AppText className="text-white">Go Back</AppText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  // ── Render ─────────────────────────────────────────────────
  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 40,
        }}
      >

        {/* ── Header (Status) ─────────────────────────────── */}
        <BookingDetailHeader
          status={booking.status}
          statusColor={statusColor}
        />

        {/* ── Hotel Info ─────────────────────────────────── */}
        <HotelInfoCard
          hotelName={booking.hotels?.name ?? '—'}
          hotelCity={booking.hotels?.city ?? ''}
          imageUrl={booking.hotels?.image_urls?.[0]}
        />

        {/* ── Booking Summary ────────────────────────────── */}
        <BookingSummarySection
          hotelName={booking.hotels?.name ?? '—'}
          roomType={booking.room_type}
          checkIn={booking.check_in}
          checkOut={booking.check_out}
          guests={booking.guests}
          totalPrice={booking.total_price}
        />

        {/* ── Special Requests (Optional) ────────────────── */}
        {booking.special_requests && (
          <SpecialRequestsCard
            specialRequests={booking.special_requests}
          />
        )}

        {/* ── Metadata ───────────────────────────────────── */}
        <BookedOnCard createdAt={booking.created_at} />

        {/* ── CTA ────────────────────────────────────────── */}
        <ViewHotelButton hotelId={booking.hotel_id} />

      </ScrollView>
    </ScreenWrapper>
  );
}