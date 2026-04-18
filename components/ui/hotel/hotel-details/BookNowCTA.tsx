// ─────────────────────────────────────────────────────────────
// BookNowButton Component
// Screen: Hotel Details / Booking CTA
// Purpose: Navigates user to booking form with selected hotel data
// Dependencies: Expo Router, React Native, AppText
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '@/components/ui/typography/AppText';

// ── Props ────────────────────────────────────────────────────
type BookNowButtonProps = {
  hotelId: string;
  price: number;
  hotelName: string;
  selectedRoom: string;
};

// ── Component ────────────────────────────────────────────────
export default function BookNowButton({
  hotelId,
  price,
  hotelName,
  selectedRoom,
}: BookNowButtonProps) {

  // ── Navigation ────────────────────────────────────────────
  const { push } = useRouter();

  // ── Derived Values ────────────────────────────────────────
  const roomTypeName = selectedRoom || "Standard";

  // ── Render ────────────────────────────────────────────────
  return (
    <TouchableOpacity
      onPress={() => {
        push(
          `/(booking)/booking-form?hotelId=${hotelId}&price=${price}&hotelName=${encodeURIComponent(
            hotelName
          )}&roomType=${encodeURIComponent(roomTypeName)}`
        );
      }}
      className="bg-primary py-4 rounded-xl mt-6 mb-8"
    >

      {/* ── CTA Label ─────────────────────────────────────── */}
      <AppText className="text-white text-center text-lg" variant="bold">
        Book Now — ₦{price.toLocaleString()}
      </AppText>

    </TouchableOpacity>
  );
}