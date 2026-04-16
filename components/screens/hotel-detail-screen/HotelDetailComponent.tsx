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

export default function HotelDetailsComponent() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { back } = useRouter();
  const { colors } = useThemeColors();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);
  const { data: hotel, isLoading, isError } = useHotelById(id);

  useEffect(() => {
    if (hotel) {
      setSelectedPrice(hotel.price_per_stay);
    }
  }, [hotel]);

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
          <DescriptionSection description={hotel.description} />

          {hotel.amenities?.length > 0 && <AmenitiesSection amenities={hotel.amenities} />}

          {hotel.room_types && hotel.room_types.length > 0 && (
            <RoomTypesSection
              roomTypes={hotel.room_types}
              selectedRoom={selectedRoom}
              onSelectRoom={handleSelectRoom}
              colors={colors}
            />
          )}

          <ContactSection phone={hotel.contact_phone} email={hotel.email} />
          <AddressSection address={hotel.address} />

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