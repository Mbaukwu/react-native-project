import ScreenWrapper from "@/components/global/ScreenWrapper";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import SearchHotelCard from "@/components/ui/hotelCards/SearchHotelCard";
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

export default function WishlistScreen() {
  const { back } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { wishlistIds, isLoading: wishlistLoading } = useWishlistStore();
  const [hotels, setHotels] = useState<HotelCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Fetch hotels whenever wishlistIds changes
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
  }, [wishlistIds]); // ← Add wishlistIds here

  // Handle removal - update local state instantly, no refetch
  const handleRemove = useCallback((hotelId: string) => {
    setHotels((prev) => prev.filter((hotel) => hotel.id !== hotelId));
  }, []);

  const isLoading = wishlistLoading || (!hasLoaded && loading);

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  if (hotels.length === 0) {
    return (
      <ScreenWrapper>
        <View className="flex-1 px-6 pt-10">
          {/* Header with back button */}
          <View className="flex-row items-center mb-8">
            <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </TouchableOpacity>
            <AppText className="text-text text-2xl" variant="bold">
              Wishlist
            </AppText>
          </View>

          {/* Empty state */}
          <View className="flex-1 items-center justify-center -mt-20">
            <View className="bg-primary/15 p-6 rounded-full mb-6">
              <IconSymbol name="heart.fill" size={56} color={colors.primary} />
            </View>
            <AppText className="text-text text-2xl text-center" variant="bold">
              No items in wishlist
            </AppText>
            <AppText className="text-text-secondary text-center mt-2 leading-6">Tap the heart on any hotel to add it here</AppText>
          </View>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 pt-10">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
              <IconSymbol name="chevron.left" size={24} color={colors.text} />
            </TouchableOpacity>
            <AppText className="text-text text-2xl" variant="bold">
              Wishlist
            </AppText>
          </View>
          <View className="bg-primary/15 px-3 py-1.5 rounded-full">
            <AppText className="text-primary text-sm" variant="bold">
              {hotels.length} {hotels.length === 1 ? "hotel" : "hotels"}
            </AppText>
          </View>
        </View>

        {/* Hotel List - LegendList with no extra spacing */}
        <LegendList
          data={hotels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SearchHotelCard hotel={item} onRemoveFromWishlist={handleRemove} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
}
