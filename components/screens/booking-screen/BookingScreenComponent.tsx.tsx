import ScreenWrapper from "@/components/global/ScreenWrapper";
import { useUserBookings } from "@/components/hooks/booking-hook/useUserBooking";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import BookingCard from "@/components/ui/hotelCards/BookingCard";
import { IconSymbol } from "@/components/ui/icon-symbol";
import AppText from "@/components/ui/typography/AppText";
import { Colors } from "@/constants/colorTheme/colors";
import { useWishlistStore } from "@/constants/stores/wishlistStore";
import { LegendList } from "@legendapp/list";
import { useRouter } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

export default function BookingScreenComponent() {
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { userId } = useWishlistStore();
  const { data: bookings, isLoading, isError } = useUserBookings(userId);

  // Not logged in
  if (!userId) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center px-6">
          <IconSymbol name="calendar" size={64} color={colors.textDisabled} />
          <AppText className="text-text text-xl text-center mt-4 capitalize" variant="bold">
            Where to next?
          </AppText>
          <AppText className="text-text-secondary text-center mt-2 ">Sign in to manage your bookings</AppText>
          <TouchableOpacity onPress={() => push("/(auth)/signIn")} className="mt-6 bg-primary py-3 px-6 rounded-xl">
            <AppText className="text-white text-base capitalize" variant="bold">
              Sign In
            </AppText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }
  // Error
  if (isError) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center px-6">
          <AppText className="text-error text-center">Failed to load your bookings</AppText>
          <TouchableOpacity onPress={() => {}} className="mt-4 bg-primary px-6 py-3 rounded-xl">
            <AppText className="text-white">Try Again</AppText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  // Empty bookings
  if (!bookings || bookings.length === 0) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center px-6">
          <IconSymbol name="calendar" size={64} color={colors.textDisabled} />
          <AppText className="text-text text-xl text-center mt-4 capitalize">An empty calendar = endless possibilities</AppText>
          <AppText className="text-text-secondary text-center mt-2">Find your perfect stay today!</AppText>
          <TouchableOpacity onPress={() => push("/(tabs)/home")} className="mt-6 bg-primary py-3.5 px-8 rounded-xl">
            <AppText className="text-white text-base" variant="bold">
              Explore Hotels
            </AppText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }
  // Bookings list
  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 pt-4">
        <View className="flex-row items-center justify-between mb-4">
          <AppText className="text-text text-2xl" variant="bold">
            My Bookings
          </AppText>
          <AppText className="text-text-secondary text-sm">
            {bookings.length} {bookings.length === 1 ? "stay" : "stays"}
          </AppText>
        </View>

        <LegendList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookingCard booking={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </ScreenWrapper>
  );
}
