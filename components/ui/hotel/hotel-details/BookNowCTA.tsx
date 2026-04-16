import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '@/components/ui/typography/AppText';

type BookNowButtonProps = {
  hotelId: string;
  price: number;
  hotelName: string;
  selectedRoom: string;
};

export default function BookNowButton({ hotelId, price, hotelName, selectedRoom }: BookNowButtonProps) {
  const { push } = useRouter();

  const roomTypeName = selectedRoom || "Standard";

  return (
    <TouchableOpacity
      onPress={() => {
        push(
          `/(booking)/booking-form?hotelId=${hotelId}&price=${price}&hotelName=${encodeURIComponent(hotelName)}&roomType=${encodeURIComponent(roomTypeName)}`
        );
      }}
      className="bg-primary py-4 rounded-xl mt-6 mb-8"
    >
      <AppText className="text-white text-center text-lg" variant="bold">
        Book Now — ₦{price.toLocaleString()}
      </AppText>
    </TouchableOpacity>
  );
}