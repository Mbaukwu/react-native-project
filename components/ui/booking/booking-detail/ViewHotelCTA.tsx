import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

type ViewHotelButtonProps = {
  hotelId: string;
};

export default function ViewHotelButton({ hotelId }: ViewHotelButtonProps) {
  const { push } = useRouter();
  const { colors } = useThemeColors();

  return (
    <TouchableOpacity
      onPress={() => push(`/hotel/${hotelId}`)}
      className="border border-border py-4 rounded-2xl items-center bg-primary/80"
    >
      <AppText className="text-text text-base" variant="bold">View Hotel</AppText>
    </TouchableOpacity>
  );
}