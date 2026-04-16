import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

export default function BookingInfoNote() {
  const { colors } = useThemeColors();

  return (
    <View className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-5 flex-row gap-3 items-start">
      <IconSymbol name="checkmark.circle.fill" size={18} color={colors.primary} />
      <AppText className="text-text-secondary text-xs flex-1 leading-5">
      Your booking is confirmed! You can check in anytime.  Present this confirmation at the hotel reception. See you soon!
      </AppText>
    </View>
  );
}