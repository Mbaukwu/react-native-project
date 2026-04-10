import { View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { IBookingDetails } from "@/constants/types-interface/bookingInterface";

type BookingCardProps = {
  booking: IBookingDetails;
  onCancel?: () => void;
  onDelete?: () => void;
};

export default function BookingCard({ booking, onCancel, onDelete }: BookingCardProps) {
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const formatDisplay = (dateStr: string): string => {
    if (!dateStr) return "—";
    const [year, month, day] = dateStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

  const statusConfig = {
    confirmed: { color: colors.success, bg: `${colors.success}20`, label: "Confirmed" },
    cancelled: { color: colors.error, bg: `${colors.error}20`, label: "Cancelled" },
    completed: { color: colors.textSecondary, bg: `${colors.textSecondary}20`, label: "Completed" },
  }[booking.status] ?? { color: colors.textSecondary, bg: `${colors.textSecondary}20`, label: booking.status };

  return (
    <TouchableOpacity
      onPress={() => push({
        pathname: "/(booking)/booking-detail" as any,
        params: { bookingId: booking.id },
      })}
      className="bg-card rounded-2xl overflow-hidden mb-4 border border-border"
      activeOpacity={0.85}
    >
      <View className="flex-row">
        {/* Image - fixed height */}
        <View style={{ width: 110 }}>
          <Image
            source={{ uri: booking.hotels?.image_urls?.[0] || "https://via.placeholder.com/110x140" }}
            style={{ width: 110, height: 140 }}
            resizeMode="cover"
          />
            <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}
          />
          {/* Status badge on image */}
          <View
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full"
            style={{ backgroundColor: statusConfig.bg }}
          >
            <AppText className="text-xs" style={{ color: statusConfig.color }} variant="bold">
              {statusConfig.label}
            </AppText>
          </View>
        </View>

        {/* Details - takes remaining space */}
        <View className="flex-1 p-3">
          <AppText className="text-text text-base" variant="bold" numberOfLines={1}>
            {booking.hotels?.name}
          </AppText>
          
          <View className="flex-row items-center gap-1 mt-1">
            <IconSymbol name="location.fill" size={12} color={colors.textSecondary} />
            <AppText className="text-text-secondary text-xs" numberOfLines={1}>
              {booking.hotels?.city}
            </AppText>
          </View>

          {/* Check-in / Check-out grid */}
          <View className="flex-row gap-2 mt-3 mb-2">
            <View className="flex-1 bg-background rounded-lg px-2 py-1.5">
              <AppText className="text-text-disabled text-[10px]">Check-in</AppText>
              <AppText className="text-text text-xs mt-0.5" variant="bold">
                {formatDisplay(booking.check_in)}
              </AppText>
            </View>
            <View className="flex-1 bg-background rounded-lg px-2 py-1.5">
              <AppText className="text-text-disabled text-[10px]">Check-out</AppText>
              <AppText className="text-text text-xs mt-0.5" variant="bold">
                {formatDisplay(booking.check_out)}
              </AppText>
            </View>
          </View>

          {/* Guests + price */}
          <View className="flex-row items-center justify-between mt-1">
            <AppText className="text-text-secondary text-xs">
              {booking.guests} guest{booking.guests > 1 ? "s" : ""} · {booking.room_type}
            </AppText>
            <AppText className="text-primary text-sm font-bold" variant="bold">
              ₦{booking.total_price.toLocaleString()}
            </AppText>
          </View>
        </View>
      </View>

      {/* Action button */}
      {(onCancel || onDelete) && (
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onCancel ? onCancel() : onDelete?.();
          }}
          className="border-t border-border py-3 items-center"
        >
          <AppText
            className="text-sm"
            variant="bold"
            style={{ color: onDelete ? colors.textSecondary : colors.error }}
          >
            {onDelete ? "Remove from list" : "Cancel Booking"}
          </AppText>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}