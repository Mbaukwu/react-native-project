import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import AppText from "@/components/ui/typography/AppText";
import { HotelCard as HotelCardType } from "@/constants/types/hotelTypes";

type Props = {
  hotel: HotelCardType;
};

export default function SearchHotelCard({ hotel }: Props) {
  const { push } = useRouter();

  const handlePress = () => {
    push(`/(hotel)/${hotel.id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-card rounded-2xl overflow-hidden mb-4"
      activeOpacity={0.85}
    >
      {/* Image - larger for search results */}
      <View className="w-full h-52">
        <Image
          source={{ uri: hotel.image_urls[0] || "https://via.placeholder.com/400x200" }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Deal Badge */}
        {hotel.is_deal && (
          <View className="absolute top-3 left-3 bg-accent px-3 py-1 rounded-full">
            <AppText variant="bold" className="text-xs text-white">
              Deal
            </AppText>
          </View>
        )}
      </View>

      {/* Details */}
      <View className="p-4">
        {/* Name and Rating Row */}
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-3">
            <AppText className="text-text text-lg" variant="bold" numberOfLines={1}>
              {hotel.name}
            </AppText>
            <AppText className="text-text-secondary text-sm mt-1" numberOfLines={1}>
              {hotel.city} • {hotel.location || "Central"}
            </AppText>
          </View>

          {/* Rating Badge */}
          {hotel.rating && (
            <View className="bg-primary px-2 py-1 rounded-lg">
              <AppText className="text-white text-sm" variant="bold">
                {hotel.rating.toFixed(1)}
              </AppText>
            </View>
          )}
        </View>

        {/* Review Info */}
        {hotel.review_score_word && (
          <View className="flex-row items-center mt-2">
            <AppText className="text-text-secondary text-sm">
              {hotel.review_score_word}
            </AppText>
            <AppText className="text-text-disabled text-sm mx-1">•</AppText>
            <AppText className="text-text-secondary text-sm">
              {hotel.review_count || 0} reviews
            </AppText>
          </View>
        )}

        {/* Price */}
        <View className="flex-row items-baseline mt-3 pt-1 border-t border-border">
          <AppText className="text-primary text-xl" variant="bold">
            ₦{hotel.price_per_night.toLocaleString()}
          </AppText>
          <AppText className="text-text-disabled text-sm ml-1">/night</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}