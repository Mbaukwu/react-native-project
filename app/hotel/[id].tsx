import ScreenWrapper from "@/components/global/ScreenWrapper";
import { useHotelById } from "@/components/hooks/hotel-hooks/useHotelById";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import AppText from "@/components/ui/typography/AppText";
import { Colors } from "@/constants/colorTheme/colors";
import { RoomType } from "@/constants/types-interface/hotelTypes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { LegendList, LegendListRef } from "@legendapp/list";

const { width } = Dimensions.get("window");

function HotelImage({ uri }: { uri: string }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      source={
        !imageError && uri
          ? { uri }
          : require("@/assets/images/hotel/hotel-placeholder.jpg")
      }
      onError={() => setImageError(true)}
      style={{ width, height: 320 }}
      resizeMode="cover"
    />
  );
}

export default function HotelDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { back, push } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const legendListRef = useRef<LegendListRef>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  const { data: hotel, isLoading, isError } = useHotelById(id);

  // Update selectedPrice when hotel loads
  useEffect(() => {
    if (hotel) {
      setSelectedPrice(hotel.price_per_stay);
    }
  }, [hotel]);

  // When user selects a room
  const handleSelectRoom = (room: RoomType) => {
    setSelectedRoom(room);
    setSelectedPrice(room.price_per_stay);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  if (isError || !hotel) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center px-4">
          <AppText className="text-error text-center">Failed to load hotel details</AppText>
          <TouchableOpacity onPress={() => back()} className="mt-4 bg-primary px-6 py-3 rounded-xl">
            <AppText className="text-white">Go Back</AppText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper className="bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View className="relative">
          <LegendList
            ref={legendListRef}
            data={hotel.image_urls}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            snapToInterval={width}
            snapToAlignment="center"
            decelerationRate="fast"
            renderItem={({ item }) => <HotelImage uri={item} />}
          />

          {/* Back Button */}
          <TouchableOpacity onPress={() => back()} className="absolute top-12 left-4 bg-black/50 p-2 rounded-full">
            <IconSymbol name="chevron.left" size={24} color="white" />
          </TouchableOpacity>

          {/* Wishlist Button */}
          <TouchableOpacity onPress={handleWishlist} className="absolute top-12 right-4 bg-black/50 p-2 rounded-full">
            <IconSymbol name={isWishlisted ? "heart.fill" : "heart"} size={22} color={isWishlisted ? colors.error : "white"} />
          </TouchableOpacity>

          {/* Deal Badge */}
          {hotel.is_deal && (
            <View className="absolute bottom-4 left-4 bg-accent px-4 py-2 rounded-full">
              <AppText className="text-white font-dm-sans-bold">Special Deal</AppText>
            </View>
          )}

          {/* Pagination Dots */}
          {hotel.image_urls.length > 1 && (
            <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
              {hotel.image_urls.map((_, index) => (
                <View key={index} className={`h-1.5 rounded-full ${index === activeImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
              ))}
            </View>
          )}
        </View>

        {/* Hotel Info */}
        <View className="p-4">
          {/* Name and Rating */}
          <View className="flex-row justify-between items-start">
            <View className="flex-1">
              <AppText className="text-2xl text-text" variant="bold">
                {hotel.name}
              </AppText>
              <View className="flex-row items-center mt-1 gap-1">
                <IconSymbol name="location.fill" size={14} color={colors.textSecondary} />
                <AppText className="text-text-secondary text-sm">
                  {hotel.location}, {hotel.city}, {hotel.state}
                </AppText>
              </View>
            </View>
            {hotel.rating && (
              <View className="bg-primary px-3 py-1 rounded-lg">
                <AppText className="text-white text-lg" variant="bold">
                  {hotel.rating.toFixed(1)}
                </AppText>
                <AppText className="text-white/80 text-xs">{hotel.review_score_word}</AppText>
              </View>
            )}
          </View>

          {/* Review Count */}
          {hotel.review_count && <AppText className="text-text-secondary text-sm mt-2">{hotel.review_count} reviews</AppText>}

          {/* Description */}
          <View className="mt-4">
            <AppText className="text-text text-base" variant="bold">
              About this hotel
            </AppText>
            <AppText className="text-text-secondary mt-2 leading-6">{hotel.description}</AppText>
          </View>

          {/* Amenities */}
          {hotel.amenities?.length > 0 && (
            <View className="mt-4">
              <AppText className="text-text text-base" variant="bold">
                Amenities
              </AppText>
              <View className="flex-row flex-wrap mt-2 gap-2">
                {hotel.amenities.map((amenity, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => push(`/searchScreen?amenity=${amenity}`)}
                    className="bg-card px-3 py-1.5 rounded-full border border-border flex-row items-center gap-1"
                    activeOpacity={0.75}
                  >
                    <AppText className="text-text-secondary text-sm">{amenity}</AppText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Room Types */}
          {hotel.room_types &&
            hotel.room_types.length > 0 &&
            hotel.room_types.map((room, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectRoom(room)}
                className={`mt-3 bg-card rounded-xl p-4 border ${selectedRoom?.name === room.name ? "border-primary" : "border-border"}`}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <AppText className="text-text text-base" variant="bold">
                      {room.name}
                    </AppText>
                    <AppText className="text-text-secondary text-sm mt-1">
                      Sleeps {room.capacity} guest{room.capacity > 1 ? "s" : ""}
                    </AppText>
                    <AppText className="text-text-secondary text-xs mt-1">{room.description}</AppText>
                  </View>
                  <AppText className="text-primary text-lg" variant="bold">
                    ₦{room.price_per_stay.toLocaleString()}
                  </AppText>
                </View>

                {/* Selected indicator */}
                {selectedRoom?.name === room.name && (
                  <View className="absolute top-2 right-2">
                    <IconSymbol name="checkmark.circle.fill" size={20} color={colors.primary} />
                  </View>
                )}
              </TouchableOpacity>
            ))}

          {/* Contact Info */}
          {(hotel.contact_phone || hotel.email) && (
            <View className="mt-4 pt-4 border-t border-border">
              <AppText className="text-text text-base" variant="bold">
                Contact
              </AppText>
              {hotel.contact_phone && (
                <View className="flex-row items-center mt-2 gap-2">
                  <IconSymbol name="phone.fill" size={16} color={colors.textSecondary} />
                  <AppText className="text-text-secondary">{hotel.contact_phone}</AppText>
                </View>
              )}
              {hotel.email && (
                <View className="flex-row items-center mt-1 gap-2">
                  <IconSymbol name="envelope.fill" size={16} color={colors.textSecondary} />
                  <AppText className="text-text-secondary">{hotel.email}</AppText>
                </View>
              )}
            </View>
          )}

          {/* Address */}
          {hotel.address && (
            <View className="mt-4 pt-4 border-t border-border">
              <AppText className="text-text text-base" variant="bold">
                Address
              </AppText>
              <AppText className="text-text-secondary mt-1">{hotel.address}</AppText>
            </View>
          )}

          {/* Book Now Button */}
          <TouchableOpacity
            onPress={() => {
              const roomTypeName = selectedRoom?.name || "Standard";
              push(
                `/(booking)/booking-form?hotelId=${hotel.id}&price=${selectedPrice}&hotelName=${encodeURIComponent(hotel.name)}&roomType=${encodeURIComponent(roomTypeName)}`,
              );
            }}
            className="bg-primary py-4 rounded-xl mt-6 mb-8"
          >
            <AppText className="text-white text-center text-lg" variant="bold">
              Book Now — ₦{selectedPrice.toLocaleString()}
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
