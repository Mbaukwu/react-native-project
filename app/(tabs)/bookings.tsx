import BookingScreenComponent from "@/components/screens/booking-screen/BookingScreenComponent.tsx";
import ProfileScreenComponent from "@/components/screens/profile-screen/ProfileScreenComponent.tsx";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function MenuScreen() {
  return (
    <BookingScreenComponent/>
  );
}
