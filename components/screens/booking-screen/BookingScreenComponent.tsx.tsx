import { useState } from "react";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { useUserBookings } from "@/components/hooks/booking-hook/useUserBooking";
import { useWishlistStore } from "@/constants/stores/wishlistStore";
import { filterUpcomingBookings, filterHistoryBookings } from "@/constants/utilities/booking/booking-screen/bookingFilters";
import { cancelBookingAction, deleteBookingAction } from "@/constants/utilities/booking/booking-screen/bookingActions";
import BookingHeader from "@/components/ui/booking/booking-screen/BookingHeader";
import BookingTabs from "@/components/ui/booking/booking-screen/BookingTabs";
import BookingList from "@/components/ui/booking/booking-screen/BookingList";
import BookingEmptyState from "@/components/ui/booking/booking-screen/BookingEmptyState";
import NotSignedInState from "@/components/ui/booking/booking-screen/BookingNotSignedIn";
import BookingCardSkeleton from "@/components/ui/skeletons-ui/BookingCardSkeleton";
import SectionHeaderSkeleton from "@/components/ui/skeletons-ui/SectionHeaderSkeleton";
import { TouchableOpacity, View } from "react-native";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";



export default function BookingScreenComponent() {
  const { push } = useRouter();
  const { colors } = useThemeColors();
  const { userId } = useWishlistStore();
  const queryClient = useQueryClient();
  const { data: bookings, isLoading, isError, refetch } = useUserBookings(userId);
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");

  const upcoming = filterUpcomingBookings(bookings);
  const history = filterHistoryBookings(bookings);

  // Not signed in
  if (!userId) return <NotSignedInState />;

  // Loading
  if (isLoading) {
    return (
      <ScreenWrapper className="pt-5">
        <SectionHeaderSkeleton />
        <BookingCardSkeleton />
      </ScreenWrapper>
    );
  }

  // Error
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

  // Empty state (no bookings at all)
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

  const currentData = activeTab === "upcoming" ? upcoming : history;

  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 pt-8">
        <BookingHeader count={currentData.length} />
        <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} upcomingCount={upcoming.length} historyCount={history.length} />
        {currentData.length === 0 ? (
          <BookingEmptyState type={activeTab} />
        ) : (
          <BookingList data={currentData} onCancel={(id) => cancelBookingAction(id, refetch)} onDelete={(id) => deleteBookingAction(id, refetch)} />
        )}
      </View>
    </ScreenWrapper>
  );
}
