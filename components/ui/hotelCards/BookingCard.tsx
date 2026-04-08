import { View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '@/components/ui/typography/AppText';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
import { IBookingDetails } from '@/constants/types-interface/bookingInterface';

type BookingCardProps = {
  booking: IBookingDetails;
};

export default function BookingCard({ booking }:BookingCardProps) {
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const statusColor = {
    confirmed: colors.success,
    cancelled: colors.error,
    completed: colors.textSecondary,
  }[booking.status] || colors.textSecondary;

  return (
    <TouchableOpacity
      onPress={() => push(`/hotel/${booking.hotel_id}`)}
      className="bg-card rounded-2xl overflow-hidden mb-4 border border-border"
      activeOpacity={0.85}
    >
      <View className="flex-row">
        {/* Image */}
        <Image
          source={{ uri: booking.hotels?.image_urls?.[0] || 'https://via.placeholder.com/100' }}
          className="w-24 h-24"
          resizeMode="cover"
        />

        {/* Details */}
        <View className="flex-1 p-3">
          <AppText className="text-text text-base" variant="bold" numberOfLines={1}>
            {booking.hotels?.name}
          </AppText>
          <View className="flex-row items-center mt-0.5 gap-1">
            <IconSymbol name="location.fill" size={12} color={colors.textSecondary} />
            <AppText className="text-text-secondary text-xs" numberOfLines={1}>
              {booking.hotels?.city}
            </AppText>
          </View>

          <View className="flex-row items-center justify-between mt-2">
            <View>
              <AppText className="text-text-secondary text-xs">
                {booking.check_in} → {booking.check_out}
              </AppText>
              <AppText className="text-text-secondary text-xs mt-0.5">
                {booking.guests} guest{booking.guests > 1 ? 's' : ''} · {booking.room_type}
              </AppText>
            </View>
            <View className="items-end">
              <AppText className="text-primary text-sm" variant="bold">
                ₦{booking.total_price.toLocaleString()}
              </AppText>
              <View className="mt-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: `${statusColor}20` }}>
                <AppText className="text-xs capitalize" style={{ color: statusColor }}>
                  {booking.status}
                </AppText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}