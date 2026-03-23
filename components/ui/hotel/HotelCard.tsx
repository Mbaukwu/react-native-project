import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import AppText from "@/components/ui/typography/AppText";
import { HotelCard as HotelCardType } from "@/constants/types/hotelTypes";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
// import { Colors } from "@/constants/colorTheme/colors";

type HotelProps = {
  hotel: HotelCardType;
};

export default function HotelCard({ hotel }: HotelProps) {
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  // const colors = Colors[colorScheme];

  const handlePress = () => {
    push(`/(hotel)/${hotel.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="w-56 mr-4 bg-card rounded-2xl overflow-hidden shadow-md" activeOpacity={0.85}>
      {/* Image */}
      <View className="w-full h-36">
        <Image source={{ uri: hotel.image_urls[0] || "https://via.placeholder.com/300x180" }} className="w-full h-full" resizeMode="cover" />

        {/* Deal Badge */}
        {hotel.is_deal && (
          <View className="absolute top-2 left-2 bg-accent px-2 py-1 rounded-full">
            <AppText variant="bold" className="text-xs text-white ">
              Deal
            </AppText>
          </View>
        )}
      </View>

      {/* Details */}
      <View className="p-3">
        <AppText className="text-text text-sm" variant="bold" numberOfLines={1}>
          {hotel.name}
        </AppText>
        <AppText className="text-text-secondary text-xs mt-0.5" numberOfLines={1}>
          {hotel.city} • {hotel.location || "Central"}
        </AppText>

        {/* Rating */}
        <View className="flex-row items-center mt-1.5 gap-1">
          <View className="bg-primary px-1.5 py-0.5 rounded">
            <AppText className="text-white text-xs " variant="bold">
              {hotel.rating?.toFixed(1)}
            </AppText>
          </View>
          <AppText className="text-text-secondary text-xs"> {hotel.review_score_word}</AppText>
        </View>

        {/* Price */}
        <AppText className="text-primary text-sm mt-1.5" variant="bold">
          {" "}
          ₦{hotel.price_per_night.toLocaleString()}
        </AppText>
        <AppText className="text-text-disabled text-xs" variant="bold">
          /night
        </AppText>
      </View>
    </TouchableOpacity>
  );
}
