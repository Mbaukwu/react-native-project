// ─────────────────────────────────────────────────────────────
// SearchHotelCard
// UI Component: Displays hotel result card in search list
// Features: Image, pricing, rating, wishlist toggle, navigation
// Dependencies: expo-router, wishlist store, actionsheet
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SheetManager } from "react-native-actions-sheet";

import { IconSymbol } from "@/components/ui/icon-symbol";
import AppText from "@/components/ui/typography/AppText";
import { useWishlistStore } from "@/constants/stores/wishlistStore";
import { HotelCardType } from "@/constants/types-interface/hotelTypes";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Props ───────────────────────────────────────────────────
type Props = {
  hotel: HotelCardType;
  onRemoveFromWishlist?: (hotelId: string) => void;
};

// ── Component ────────────────────────────────────────────────
export default function SearchHotelCard({ hotel, onRemoveFromWishlist }: Props) {

  // ── Navigation & Theme ─────────────────────────────────────
  const { push } = useRouter();
  const {colors}= useThemeColors()

  // ── State / Store ──────────────────────────────────────────
  const { toggleWishlist, wishlistIds, userId } = useWishlistStore();
  const [imageError, setImageError] = useState(false);

  const isFav = wishlistIds.includes(hotel.id);

  const isTopRated = hotel.rating && hotel.rating >= 8.0;

  // ── Handlers ───────────────────────────────────────────────
  const handleWishlistPress = () => {
    if (!userId && !isFav) {
      SheetManager.show("auth-prompt", {
        payload: {
          onLocalSave: () => toggleWishlist(hotel.id),
        },
      });
    } else {
      toggleWishlist(hotel.id);

      if (isFav && onRemoveFromWishlist) {
        onRemoveFromWishlist(hotel.id);
      }
    }
  };

  const handlePress = () => {
    push(`/hotel/${hotel.id}`);
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row bg-card rounded-2xl overflow-hidden mb-4"
      activeOpacity={0.85}
      style={{ height: 120 }}
    >
     {/* Image Section */}
      <View style={{ width: 120 }} className="h-full relative">
        <Image
          source={
            !imageError && hotel.image_urls[0]
              ? { uri: hotel.image_urls[0] }
              : require("@/assets/images/hotel/hotel-placeholder.jpg")
          }
          onError={() => setImageError(true)}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Dark overlay for better text contrast */}
        <View className="absolute inset-0 bg-black/40" />

        {/* Badges - top left */}
        <View className="absolute top-2 left-2 flex-row gap-1">
          {hotel.is_deal && (
            <View className="bg-accent px-1.5 py-0.5 rounded-full">
              <AppText variant="bold" className="text-[10px] text-white">
                🔥 DEAL
              </AppText>
            </View>
          )}
          {isTopRated && !hotel.is_deal && (
            <View className="bg-platinum px-1.5 py-0.5 rounded-full flex-row items-center" style={{ backgroundColor: '#E5E4E2' }}>
              <IconSymbol name="star.fill" size={8} color="#D4AF37" />
              <AppText variant="bold" className="text-[10px] text-gray-800 ml-0.5">
                TOP RATED
              </AppText>
            </View>
          )}
        </View>
      </View>


      {/* Details Section */}
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

          {/* Price + Wishlist */}
          <View className="flex-row items-center justify-between">
            <AppText className="text-primary text-sm" variant="bold">
              ₦{hotel.price_per_stay.toLocaleString()}
              <AppText className="text-text-disabled text-xs"> / 24 hrs</AppText>
            </AppText>

            <TouchableOpacity onPress={handleWishlistPress} className="p-1.5 rounded-full">
              <IconSymbol
                name={isFav ? "heart.fill" : "heart"}
                size={20}
                color={isFav ? colors.favorite : colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

        </View>

      </View>
    </TouchableOpacity>
  );
}