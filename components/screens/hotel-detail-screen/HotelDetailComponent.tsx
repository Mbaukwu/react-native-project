// ─────────────────────────────────────────────────────────────
// HotelDetailsComponent
// Screen: Hotel details page
// Shows: images, description, amenities, rooms, contact, booking CTA
// Depends on: useHotelById, RoomType selection, wishlist state
// ─────────────────────────────────────────────────────────────

import { ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import ScreenWrapper from '@/components/global/ScreenWrapper';
import { useHotelById } from '@/components/hooks/hotel-hooks/useHotelById';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';
import { RoomType } from '@/constants/types-interface/hotelTypes';
import HotelImageCarousel from '@/components/ui/hotel/hotel-details/HotelImageCarousel';
import HotelHeader from '@/components/ui/hotel/hotel-details/HotelHeader';
import DescriptionSection from '@/components/ui/hotel/hotel-details/DescriptionSection';
import AmenitiesSection from '@/components/ui/hotel/hotel-details/AmenitiesSection';
import RoomTypesSection from '@/components/ui/hotel/hotel-details/RoomTypesSection';
import ContactSection from '@/components/ui/hotel/hotel-details/ContactSection';
import AddressSection from '@/components/ui/hotel/hotel-details/AddressSection';
import BookNowButton from '@/components/ui/hotel/hotel-details/BookNowCTA';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import AppText from '@/components/ui/typography/AppText';

// ── Component ────────────────────────────────────────────────
export default function HotelDetailsComponent() {

  // ── Route Params ───────────────────────────────────────────
  const { id } = useLocalSearchParams<{ id: string }>();

  // ── Navigation & Theme ─────────────────────────────────────
  const { back } = useRouter();
  const { colors } = useThemeColors();

  // ── Local State ────────────────────────────────────────────
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  // ── Data Fetch ─────────────────────────────────────────────
  const { data: hotel, isLoading, isError } = useHotelById(id);

  // ── Effects ────────────────────────────────────────────────
  useEffect(() => {
    if (hotel) {
      setSelectedPrice(hotel.price_per_stay);
    }
  }, [hotel]);

  // ── Handlers ───────────────────────────────────────────────
  const handleSelectRoom = (room: RoomType) => {
    setSelectedRoom(room);
    setSelectedPrice(room.price_per_stay);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // ── Loading State ──────────────────────────────────────────
  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  // ── Error State ────────────────────────────────────────────
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

  // ── Render ─────────────────────────────────────────────────
  return (
    <ScreenWrapper className="bg-background">

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Image Carousel ─────────────────────────────────── */}
        <HotelImageCarousel
          images={hotel.image_urls}
          onBack={() => back()}
          onWishlist={handleWishlist}
          isWishlisted={isWishlisted}
          isDeal={hotel.is_deal}
          isTopRated={!!(hotel.rating && hotel.rating >= 8.0)}
          colors={colors}
        />

        <View className="p-4">

          {/* ── Header ─────────────────────────────────────── */}
          <HotelHeader
            name={hotel.name}
            location={hotel.location}
            city={hotel.city}
            state={hotel.state}
            rating={hotel.rating}
            reviewCount={hotel.review_count}
            reviewScoreWord={hotel.review_score_word}
            colors={colors}
          />

          {/* ── Description ───────────────────────────────── */}
          <DescriptionSection description={hotel.description} />

          {/* ── Amenities ─────────────────────────────────── */}
          {hotel.amenities?.length > 0 && (
            <AmenitiesSection amenities={hotel.amenities} />
          )}

          {/* ── Room Types ────────────────────────────────── */}
          {hotel.room_types && hotel.room_types.length > 0 && (
            <RoomTypesSection
              roomTypes={hotel.room_types}
              selectedRoom={selectedRoom}
              onSelectRoom={handleSelectRoom}
              colors={colors}
            />
          )}

          {/* ── Contact ───────────────────────────────────── */}
          <ContactSection phone={hotel.contact_phone} email={hotel.email} />

          {/* ── Address ───────────────────────────────────── */}
          <AddressSection address={hotel.address} />

          {/* ── Booking CTA ───────────────────────────────── */}
          <BookNowButton
            hotelId={hotel.id}
            price={selectedPrice}
            hotelName={hotel.name}
            selectedRoom={selectedRoom?.name || "Standard"}
          />

        </View>

      </ScrollView>

    </ScreenWrapper>
  );
}