import { IBookingDetails } from "@/constants/types-interface/bookingInterface";

export const getToday = () => new Date().toISOString().split("T")[0];

export const filterUpcomingBookings = (bookings: IBookingDetails[] | undefined) => {
  const today = getToday();
  return bookings?.filter((b) => b.status === "confirmed" && b.check_in >= today) ?? [];
};

export const filterHistoryBookings = (bookings: IBookingDetails[] | undefined) => {
  const today = getToday();
  return bookings?.filter(
    (b) =>
      b.status === "cancelled" ||
      b.status === "completed" ||
      (b.status === "confirmed" && b.check_out < today)
  ) ?? [];
}