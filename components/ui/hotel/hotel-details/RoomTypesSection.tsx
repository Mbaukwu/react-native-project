// ─────────────────────────────────────────────────────────────
// RoomTypesSection
// UI Component: Hotel room selection section
// Purpose: Displays available room types and allows selection
// Props: roomTypes, selectedRoom, onSelectRoom, colors
// ─────────────────────────────────────────────────────────────

import { View, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { RoomType } from '@/constants/types-interface/hotelTypes';

// ── Props ────────────────────────────────────────────────────
type RoomTypesSectionProps = {
  roomTypes: RoomType[];
  selectedRoom: RoomType | null;
  onSelectRoom: (room: RoomType) => void;
  colors: any;
};

// ── Component ────────────────────────────────────────────────
export default function RoomTypesSection({
  roomTypes,
  selectedRoom,
  onSelectRoom,
  colors,
}: RoomTypesSectionProps) {
  return (
    <View className="mt-4 mb-0.5">

      {/* ── Section Title ─────────────────────────────────── */}
      <AppText className="text-text text-base" variant="bold">
        Room Types
      </AppText>

      {/* ── Room List ─────────────────────────────────────── */}
      {roomTypes.map((room, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelectRoom(room)}
          className={`mt-3 bg-card rounded-xl p-4 border ${
            selectedRoom?.name === room.name ? "border-primary" : "border-border"
          }`}
        >

          {/* ── Room Info Row ─────────────────────────────── */}
          <View className="flex-row justify-between items-start">

            {/* ── Room Details ───────────────────────────── */}
            <View className="flex-1">
              <AppText className="text-text text-base" variant="bold">
                {room.name}
              </AppText>

              <AppText className="text-text-secondary text-sm mt-1">
                Sleeps {room.capacity} guest{room.capacity > 1 ? "s" : ""}
              </AppText>

              <AppText className="text-text-secondary text-xs mt-1">
                {room.description}
              </AppText>
            </View>

            {/* ── Price ───────────────────────────────────── */}
            <AppText className="text-primary text-lg" variant="bold">
              ₦{room.price_per_stay.toLocaleString()}
            </AppText>
          </View>

          {/* ── Selected Indicator ────────────────────────── */}
          {selectedRoom?.name === room.name && (
            <View className="absolute top-2 right-2">
              <IconSymbol name="checkmark.circle.fill" size={12} color={colors.primary} />
            </View>
          )}

        </TouchableOpacity>
      ))}

    </View>
  );
}