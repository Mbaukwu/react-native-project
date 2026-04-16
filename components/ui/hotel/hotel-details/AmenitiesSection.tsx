import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

type AmenitiesSectionProps = {
  amenities: string[];
};

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const { push } = useRouter();
  const { colors } = useThemeColors();

  return (
    <View className="mt-4 mb-1">
      <AppText className="text-text text-base" variant="bold">
        Amenities
      </AppText>
      <View className="flex-row flex-wrap mt-2 gap-2">
        {amenities.map((amenity, index) => (
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
  );
}