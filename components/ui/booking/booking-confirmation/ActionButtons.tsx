import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

export default function ActionButtons() {
  const { push } = useRouter();
  const { colors } = useThemeColors();

  return (
    <>
      <TouchableOpacity
        onPress={() => push('/(tabs)/bookings')}
        className="bg-primary py-4 rounded-2xl items-center mb-3"
      >
        <AppText className="text-white text-base" variant="bold">View My Bookings</AppText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => push('/(tabs)/home')}
        className="py-4 rounded-2xl items-center border border-border"
      >
        <AppText className="text-text text-base" variant="bold">Back to Home</AppText>
      </TouchableOpacity>
    </>
  );
}