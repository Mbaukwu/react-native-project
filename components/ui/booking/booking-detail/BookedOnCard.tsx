import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

type BookedOnCardProps = {
  createdAt: string;
};

export default function BookedOnCard({ createdAt }: BookedOnCardProps) {
  const { colors } = useThemeColors();
  
  const bookedDate = new Date(createdAt).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View className="bg-card border border-border rounded-2xl p-4 mb-6 flex-row items-center gap-2">
      <IconSymbol name="info.circle.fill" size={16} color={colors.platinumDark} />
      <AppText className="text-text-secondary text-xs flex-1">
        Booked on {bookedDate}
      </AppText>
    </View>
  );
}