import ScreenWrapper from "@/components/global/ScreenWrapper";
import { useUserBookings } from "@/components/hooks/booking-hook/useUserBooking";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import BookingCard from "@/components/ui/hotelCards/BookingCard";
import { IconSymbol } from "@/components/ui/icon-symbol";
import BookingCardSkeleton from "@/components/ui/skeletons-ui/BookingCardSkeleton";
import AppText from "@/components/ui/typography/AppText";
import { Colors } from "@/constants/colorTheme/colors";
import { useWishlistStore } from "@/constants/stores/wishlistStore";
import { cancelBooking, deleteBooking } from "@/constants/supabase/services/bookingService";
import { LegendList } from "@legendapp/list";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function BookingScreenComponent() {
  const { push, back } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { userId } = useWishlistStore();
  const { data: bookings, isLoading, isError, refetch } = useUserBookings(userId);
  const queryClient = useQueryClient();

  const handleCancel = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      queryClient.invalidateQueries({ queryKey: ["user-bookings", userId] });
      Toast.show({
        type: "success",
        text1: "Booking Cancelled",
        text2: "Your booking has been cancelled successfully",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to cancel",
        text2: error?.message ?? "Something went wrong",
      });
    }
  };
  const handleDelete = async (bookingId: string) => {
    try {
      await deleteBooking(bookingId);
      queryClient.invalidateQueries({ queryKey: ["user-bookings", userId] });
      Toast.show({
        type: "success",
        text1: "Booking Removed",
        text2: "The booking has been removed from your list",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to remove",
        text2: error?.message ?? "Something went wrong",
      });
    }
  };

  if (!userId) {
    return (
      <ScreenWrapper className="p-6">
        <View className="flex-row items-center mt-4 ">
          <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <AppText className="text-text text-2xl capitalize" variant="bold">
            my bookings
          </AppText>
        </View>

        <View className="flex-1 items-center justify-center">
          <View className="bg-primary/15 p-6 rounded-full mb-2">
            <IconSymbol name="calendar" size={56} color={colors.primary} />
          </View>

          <AppText className="text-text text-xl text-center mt-2" variant="bold">
            Where to next?
          </AppText>
          <AppText className="text-text-secondary text-center mt-2">Sign in to manage your bookings</AppText>
          <TouchableOpacity onPress={() => push("/(auth)/signIn")} className="mt-6 bg-primary py-3 px-6 rounded-xl">
            <AppText className="text-white text-base" variant="bold">
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
        <BookingCardSkeleton />
      </ScreenWrapper>
    );
  }

  if (isError) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center px-6">
          <AppText className="text-error text-center">Failed to load your bookings</AppText>
          <TouchableOpacity onPress={() => refetch()} className="mt-4 bg-primary px-6 py-3 rounded-xl">
            <AppText className="text-white">Try Again</AppText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center px-6">
          <IconSymbol name="calendar" size={64} color={colors.textDisabled} />
          <AppText className="text-text text-xl text-center mt-4">An empty calendar = endless possibilities</AppText>
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

  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 pt-8">
        {/* Header — count beside title */}
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <AppText className="text-text text-[22px] flex-1" variant="bold">
            My Bookings
          </AppText>
          <View className="bg-primary/10 px-3 py-1 rounded-full">
            <AppText className="text-primary text-sm" variant="bold">
              {bookings.length} {bookings.length === 1 ? "stay" : "stays"}
            </AppText>
          </View>
        </View>

        <LegendList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookingCard
              booking={item}
              onCancel={item.status === "confirmed" ? () => handleCancel(item.id) : undefined}
              onDelete={item.status === "cancelled" ? () => handleDelete(item.id) : undefined}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </ScreenWrapper>
  );
}
