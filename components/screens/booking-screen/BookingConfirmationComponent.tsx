import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenWrapper from '@/components/global/ScreenWrapper';
import AppText from '@/components/ui/typography/AppText';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BookingConfirmation() {
  const { hotelName, price, checkIn, checkOut, roomType, guests } = useLocalSearchParams<{
    hotelName: string;
    price: string;
    checkIn: string;
    checkOut: string;
    roomType: string;
    guests: string;
  }>();
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const formatDisplay = (dateStr: string): string => {
    if (!dateStr) return '—';
    const [year, month, day] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${day}, ${year}`;
  };

  const details = [
    { label: 'Hotel', value: hotelName },
    { label: 'Room', value: roomType },
    { label: 'Check-in', value: formatDisplay(checkIn) },
    { label: 'Check-out', value: formatDisplay(checkOut) },
    { label: 'Guests', value: `${guests} guest${Number(guests) > 1 ? 's' : ''}` },
    { label: 'Total', value: `₦${Number(price).toLocaleString()}`, highlight: true },
  ];

  return (
    <ScreenWrapper>
    
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 px-6 pt-8 pb-10">

            {/* Success animation area */}
            <View className="items-center mb-8">
              <View className="bg-success/15 p-6 rounded-full mb-4">
                <IconSymbol name="checkmark.circle.fill" size={72} color={colors.success} />
              </View>
              <AppText className="text-text text-2xl text-center" variant="bold">
                Booking Confirmed!
              </AppText>
              <AppText className="text-text-secondary text-center mt-2 leading-6">
                Your stay at {hotelName} is all set. We look forward to welcoming you.
              </AppText>
            </View>

            {/* Booking summary card */}
            <View className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
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

            {/* Info note */}
            <View className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-8 flex-row gap-3 items-start">
              <IconSymbol name="info.circle.fill" size={18} color={colors.primary} />
              <AppText className="text-text-secondary text-xs flex-1 leading-5">
                A confirmation has been sent to your email. Contact the hotel directly for any special arrangements.
              </AppText>
            </View>

            {/* Actions */}
            <TouchableOpacity
              onPress={() => push('/(tabs)/bookings')}
              className="bg-primary py-4 rounded-2xl items-center mb-3"
            >
              <AppText className="text-white text-base" variant="bold">View My Bookings</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => push('/(tabs)/home')}
              className="py-4 rounded-2xl items-center border border-border"
            >
              <AppText className="text-text text-base" variant="bold">Back to Home</AppText>
            </TouchableOpacity>

          </View>
        </ScrollView>
     
    </ScreenWrapper>
  );
}