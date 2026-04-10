import { View, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import ScreenWrapper from '@/components/global/ScreenWrapper';
import AppText from '@/components/ui/typography/AppText';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
import { supabase } from '@/constants/supabase/supabase';
import { IBookingDetails } from '@/constants/types-interface/bookingInterface';
import { useBookingDetails } from '@/components/hooks/booking-hook/useBookingDetails';

export default function BookingDetailScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { back, push } = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const { data: booking, isLoading, isError } = useBookingDetails(bookingId);

  const formatDisplay = (dateStr: string): string => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const statusColor = booking ? ({
    confirmed: colors.success,
    cancelled: colors.error,
    completed: colors.textSecondary,
  }[booking.status] ?? colors.textSecondary) : colors.textSecondary;

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
          <AppText className="text-error text-center">Failed to load booking details</AppText>
          <TouchableOpacity onPress={() => back()} className="mt-4 bg-primary px-6 py-3 rounded-xl">
            <AppText className="text-white">Go Back</AppText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  const details = [
    { label: 'Hotel', value: booking.hotels?.name ?? '—' },
    { label: 'Room', value: booking.room_type },
    { label: 'Check-in', value: formatDisplay(booking.check_in) },
    { label: 'Check-out', value: formatDisplay(booking.check_out) },
    { label: 'Guests', value: `${booking.guests} guest${booking.guests > 1 ? 's' : ''}` },
    { label: 'Total', value: `₦${booking.total_price.toLocaleString()}`, highlight: true },
  ];

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="flex-row items-center mb-4 pt-5">
          <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <AppText className="text-text text-xl flex-1" variant="bold">Booking Details</AppText>
          {/* Status badge */}
          <View className="px-3 py-1 rounded-full" style={{ backgroundColor: `${statusColor}20` }}>
            <AppText className="text-xs capitalize" style={{ color: statusColor }} variant="bold">
              {booking.status}
            </AppText>
          </View>
        </View>

        {/* Hotel image */}
        <Image
          source={{ uri: booking.hotels?.image_urls?.[0] || "https://via.placeholder.com/400x200" }}
          className="w-full h-48 rounded-2xl mb-4"
          resizeMode="cover"
        />

        {/* Hotel name overlay on image? No, separate card below */}
        <View className="bg-card border border-border rounded-2xl p-4 mb-4">
          <AppText className="text-text text-lg" variant="bold" numberOfLines={1}>
            {booking.hotels?.name}
          </AppText>
          <View className="flex-row items-center gap-1 mt-1">
            <IconSymbol name="location.fill" size={14} color={colors.textSecondary} />
            <AppText className="text-text-secondary text-sm">{booking.hotels?.city}</AppText>
          </View>
        </View>

        {/* Booking summary */}
        <View className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
          <View className="bg-primary/10 px-4 py-3 border-b border-border">
            <AppText className="text-primary text-sm" variant="bold">Booking Summary</AppText>
          </View>
          {details.map((item, index) => (
            <View
              key={index}
              className={`flex-row justify-between items-center px-4 py-3.5 ${
                index < details.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <AppText className="text-text-secondary text-sm">{item.label}</AppText>
              <AppText
                className={`text-sm ${item.highlight ? 'text-primary' : 'text-text'}`}
                variant="bold"
              >
                {item.value}
              </AppText>
            </View>
          ))}
        </View>

        {/* Special requests */}
        {booking.special_requests && (
          <View className="bg-card border border-border rounded-2xl p-4 mb-4">
            <AppText className="text-text text-sm mb-1" variant="bold">Special Requests</AppText>
            <AppText className="text-text-secondary text-sm leading-5">
              {booking.special_requests}
            </AppText>
          </View>
        )}

        {/* Booked on */}
        <View className="bg-card border border-border rounded-2xl p-4 mb-6">
          <AppText className="text-text-secondary text-xs">
            Booked on {new Date(booking.created_at).toLocaleDateString('en-NG', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </AppText>
        </View>

        {/* View hotel button */}
        <TouchableOpacity
          onPress={() => push(`/hotel/${booking.hotel_id}`)}
          className="border border-border py-4 rounded-2xl items-center"
        >
          <AppText className="text-text text-base" variant="bold">View Hotel</AppText>
        </TouchableOpacity>

      </ScrollView>
    </ScreenWrapper>
  );
}