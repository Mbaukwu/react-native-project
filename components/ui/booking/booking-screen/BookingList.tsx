// ─────────────────────────────────────────────────────────────
// BookingList Component
// Screen: Bookings list renderer
// Purpose: Displays list of user bookings using LegendList
// Dependencies: BookingCard, LegendList, IBookingDetails
// ─────────────────────────────────────────────────────────────

import BookingCard from "@/components/ui/hotel/hotelCards/BookingCard";
import { IBookingDetails } from "@/constants/types-interface/bookingInterface";
import { LegendList } from "@legendapp/list";

type BookingListProps = {
  data: IBookingDetails[];
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
};

// ── Component ────────────────────────────────────────────────
export default function BookingList({ data, onCancel, onDelete }: BookingListProps) {
  return (
    <LegendList

      // ── Data Source ───────────────────────────────────────
      data={data}
      keyExtractor={(item) => item.id}

      // ── Render Item ───────────────────────────────────────
      renderItem={({ item }) => (
        <BookingCard
          booking={item}

          // ── Conditional Actions ───────────────────────────
          onCancel={item.status === "confirmed" ? () => onCancel(item.id) : undefined}
          onDelete={item.status === "cancelled" ? () => onDelete(item.id) : undefined}
        />
      )}

      // ── List UI Config ────────────────────────────────────
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}