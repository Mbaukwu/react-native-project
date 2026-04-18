// ─────────────────────────────────────────────────────────────
// WishlistScreen
// Screen: User wishlist page
// Shows: saved hotels, empty states, auth gating, removal handling
// Depends on: wishlist store, Supabase service, LegendList rendering
// ─────────────────────────────────────────────────────────────

import ScreenWrapper from "@/components/global/ScreenWrapper";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import SearchHotelCard from "@/components/ui/hotel/hotelCards/SearchHotelCard";
import { IconSymbol } from "@/components/ui/icon-symbol";
import AppText from "@/components/ui/typography/AppText";
import { Colors } from "@/constants/colorTheme/colors";
import { useWishlistStore } from "@/constants/stores/wishlistStore";
import { getWishlistHotels } from "@/constants/supabase/services/serviceEntryFile";
import { HotelCardType } from "@/constants/types-interface/hotelTypes";
import { LegendList } from "@legendapp/list";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

// ── Component ────────────────────────────────────────────────
export default function WishlistScreen() {

  // ── Navigation ────────────────────────────────────────────
  const { back, push } = useRouter();

  // ── Theme ────────────────────────────────────────────────
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  // ── Store ────────────────────────────────────────────────
  const { wishlistIds, userId, isLoading: wishlistLoading } = useWishlistStore();

  // ── Local State ───────────────────────────────────────────
  const [hotels, setHotels] = useState<HotelCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // ── Effects: Fetch Wishlist Hotels ────────────────────────
  useEffect(() => {
    const fetchHotels = async () => {
      if (wishlistIds.length === 0) {
        setHotels([]);
        setLoading(false);
        setHasLoaded(true);
        return;
      }

      setLoading(true);

      try {
        const fetchedHotels = await getWishlistHotels(wishlistIds);
        setHotels(fetchedHotels);
      } catch (error) {
        console.error("Failed to fetch wishlist hotels:", error);
      } finally {
        setLoading(false);
        setHasLoaded(true);
      }
    };

    fetchHotels();
  }, [wishlistIds]);

  // ── Handlers ─────────────────────────────────────────────
  const handleRemove = useCallback((hotelId: string) => {
    setHotels((prev) => prev.filter((hotel) => hotel.id !== hotelId));
  }, []);

  // ── Derived State ─────────────────────────────────────────
  const isLoading = wishlistLoading || (!hasLoaded && loading);

  // ── Loading State ─────────────────────────────────────────
  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  // ── Not Authenticated State ───────────────────────────────
  if (!userId) {
    return (
      <ScreenWrapper>
        <View className="flex-1 px-6 mt-5">

          {/* Header */}
          <View className="flex-row items-center mt-5">
            <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </TouchableOpacity>

            <AppText className="text-text text-2xl" variant="bold">
              Wishlist
            </AppText>
          </View>

          {/* Auth Prompt */}
          <View className="flex-1 items-center justify-center">
            <View className="bg-primary/15 p-6 rounded-full mb-6">
              <IconSymbol name="heart.fill" size={56} color={colors.primary} />
            </View>

            <AppText className="text-text text-2xl text-center" variant="bold">
              Save your favourites
            </AppText>

            <AppText className="text-text-secondary text-center mt-2 leading-6">
              Sign in to save hotels and access them from any device
            </AppText>

            <TouchableOpacity
              onPress={() => push("/(auth)/signIn")}
              className="mt-6 bg-primary py-3 px-6 rounded-xl"
            >
              <AppText className="text-white text-base" variant="bold">
                Sign In
              </AppText>
            </TouchableOpacity>
          </View>

        </View>
      </ScreenWrapper>
    );
  }

  // ── Empty State ───────────────────────────────────────────
  if (hotels.length === 0) {
    return (
      <ScreenWrapper>
        <View className="flex-1 px-6 pt-10">

          {/* Header */}
          <View className="flex-row items-center mb-8">
            <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </TouchableOpacity>

            <AppText className="text-text text-2xl" variant="bold">
              Wishlist
            </AppText>
          </View>

          {/* Empty State */}
          <View className="flex-1 items-center justify-center -mt-20">
            <View className="bg-primary/15 p-6 rounded-full mb-6">
              <IconSymbol name="heart.fill" size={56} color={colors.primary} />
            </View>

            <AppText className="text-text text-2xl text-center" variant="bold">
              No items in wishlist
            </AppText>

            <AppText className="text-text-secondary text-center mt-2 leading-6">
              Tap the heart on any hotel to add it here
            </AppText>
          </View>

        </View>
      </ScreenWrapper>
    );
  }

  // ── Render List State ─────────────────────────────────────
  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 pt-8">

        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">

          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </TouchableOpacity>

            <AppText className="text-text text-[22px]" variant="bold">
              Wishlist
            </AppText>
          </View>

          <View className="bg-primary/15 px-3 py-1.5 rounded-full">
            <AppText className="text-primary text-sm" variant="bold">
              {hotels.length} {hotels.length === 1 ? "hotel" : "hotels"}
            </AppText>
          </View>

        </View>

        {/* List */}
        <LegendList
          data={hotels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SearchHotelCard hotel={item} onRemoveFromWishlist={handleRemove} />
          )}
          showsVerticalScrollIndicator={false}
        />

      </View>
    </ScreenWrapper>
  );
}