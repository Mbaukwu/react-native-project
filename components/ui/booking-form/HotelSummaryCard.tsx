import { View } from 'react-native';
import AppText from '@/components/ui/typography/AppText';

type Props = {
  hotelName: string;
  roomType: string;
  price: string;
};

export default function HotelSummaryCard({ hotelName, roomType, price }: Props) {
  return (
    <View className="bg-primary/10 rounded-xl p-4 mb-6">
      <AppText className="text-primary text-lg" variant="bold">{hotelName}</AppText>
      <AppText className="text-text-secondary text-sm mt-1">Room: {roomType}</AppText>
      <AppText className="text-text-secondary text-sm">
        Total: ₦{Number(price).toLocaleString()}
      </AppText>
    </View>
  );
}