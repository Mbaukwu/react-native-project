import { cancelBooking, deleteBooking } from "@/constants/supabase/services/bookingService";
import Toast from "react-native-toast-message";

export const cancelBookingAction = async (
  bookingId: string,
  refetch: () => void
) => {
  try {
    await cancelBooking(bookingId);
    refetch(); // Force refetch instead of just invalidating
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

export const deleteBookingAction = async (
  bookingId: string,
  refetch: () => void
) => {
  try {
    await deleteBooking(bookingId);
    refetch(); // Force refetch
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