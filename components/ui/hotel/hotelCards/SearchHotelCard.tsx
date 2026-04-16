import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import AppText from "@/components/ui/typography/AppText";
import { Colors } from "@/constants/colorTheme/colors";
import { HotelCardType } from "@/constants/types-interface/hotelTypes";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { useWishlistStore } from "@/constants/stores/wishlistStore";

type Props = {
  hotel: HotelCardType;
  onRemoveFromWishlist?: (hotelId: string) => void;
};

export default function SearchHotelCard({ hotel, onRemoveFromWishlist }: Props) {
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { toggleWishlist, wishlistIds, userId } = useWishlistStore();
  const [imageError, setImageError] = useState(false);

  const isFav = wishlistIds.includes(hotel.id);

  const handleWishlistPress = () => {
    if (!userId && !isFav) {
      SheetManager.show("auth-prompt", {
        payload: {
          onLocalSave: () => toggleWishlist(hotel.id),
        },
      });
    } else {
      toggleWishlist(hotel.id);
      // If this is in wishlist screen and we're removing, update UI instantly
      if (isFav && onRemoveFromWishlist) {
        onRemoveFromWishlist(hotel.id);
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={() => push(`/hotel/${hotel.id}`)}
      className="flex-row bg-card rounded-2xl overflow-hidden mb-4"
      activeOpacity={0.85}
      style={{ height: 120 }}
    >
      {/* Image - left side */}
      <View style={{ width: 120 }} className="h-full">
        <Image
          source={!imageError && hotel.image_urls[0] ? { uri: hotel.image_urls[0] } : require("@/assets/images/hotel/hotel-placeholder.jpg")}
          onError={() => setImageError(true)}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Simple dark overlay */}
  <View className="absolute bottom-0 left-0 right-0 h-full bg-black/40" />

        {hotel.is_deal && (
          <View className="absolute top-2 left-2 bg-accent px-2 py-0.5 rounded-full">
            <AppText variant="bold" className="text-xs text-white">
              Deal
            </AppText>
          </View>
        )}
      </View>

      {/* Details - right side */}
      <View className="flex-1 p-3 justify-between">
        <View>
          <AppText className="text-text text-sm" variant="bold" numberOfLines={1}>
            {hotel.name}
          </AppText>
          <View className="flex-row items-center mt-0.5 gap-1">
            <IconSymbol name="location.fill" size={11} color={colors.textSecondary} />
            <AppText className="text-text-secondary text-xs" numberOfLines={1}>
              {hotel.location ?? hotel.city}
            </AppText>
          </View>
        </View>

        <View>
          {hotel.rating && (
            <View className="flex-row items-center gap-1 mb-1">
              <View className="bg-primary px-1.5 py-0.5 rounded">
                <AppText className="text-white text-xs" variant="bold">
                  {hotel.rating.toFixed(1)}
                </AppText>
              </View>
              <AppText className="text-text-secondary text-xs">
                {hotel.review_score_word} · {hotel.review_count} reviews
              </AppText>
            </View>
          )}

          {/* Price and Favorite Button Row */}
          <View className="flex-row items-center justify-between">
            <AppText className="text-primary text-sm" variant="bold">
              ₦{hotel.price_per_stay.toLocaleString()}
              <AppText className="text-text-disabled text-xs"> / 24 hrs</AppText>
            </AppText>

            {/* Favorite Button */}
            <TouchableOpacity onPress={handleWishlistPress} className="p-1.5 rounded-full">
              <IconSymbol name={isFav ? "heart.fill" : "heart"} size={20} color={isFav ? colors.favorite : colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
