import { useState } from 'react';
import { View, Image } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

type HotelInfoCardProps = {
  hotelName: string;
  hotelCity: string;
  imageUrl?: string;
};

export default function HotelInfoCard({ hotelName, hotelCity, imageUrl }: HotelInfoCardProps) {
  const { colors } = useThemeColors();
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <Image
        source={
          !imageError && imageUrl
            ? { uri: imageUrl }
            : require("@/assets/images/hotel/hotel-placeholder.jpg")
        }
        onError={() => setImageError(true)}
        className="w-full h-48 rounded-2xl mb-4"
        resizeMode="cover"
      />
      <View className="bg-card border border-border rounded-2xl p-4 mb-4">
        <AppText className="text-text text-lg" variant="bold" numberOfLines={1}>
          {hotelName}
        </AppText>
        <View className="flex-row items-center gap-1 mt-1">
          <IconSymbol name="location.fill" size={14} color={colors.textSecondary} />
          <AppText className="text-text-secondary text-sm">{hotelCity}</AppText>
        </View>
      </View>
    </>
  );
}