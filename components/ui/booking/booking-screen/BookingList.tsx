import BookingCard from "@/components/ui/hotel/hotelCards/BookingCard";
import { IBookingDetails } from "@/constants/types-interface/bookingInterface";
import { LegendList } from "@legendapp/list";

type BookingListProps = {
  data: IBookingDetails[];
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function BookingList({ data, onCancel, onDelete }: BookingListProps) {
  return (
    <LegendList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookingCard
          booking={item}
          onCancel={item.status === "confirmed" ? () => onCancel(item.id) : undefined}
          onDelete={item.status === "cancelled" ? () => onDelete(item.id) : undefined}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}
