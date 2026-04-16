import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

type BookingDetailHeaderProps = {
  status: string;
  statusColor: string;
};

export default function BookingDetailHeader({ status, statusColor }: BookingDetailHeaderProps) {
  const { back } = useRouter();
  const { colors } = useThemeColors();

  return (
    <View className="flex-row items-center mb-4 pt-5">
      <TouchableOpacity onPress={() => back()} className="mr-1 p-1">
        <IconSymbol name="chevron.left" size={24} color={colors.text} />
      </TouchableOpacity>
      <AppText className="text-text text-xl flex-1" variant="bold">
        Booking Details
      </AppText>
      <View className="px-3 py-1 rounded-full" style={{ backgroundColor: `${statusColor}20` }}>
        <AppText className="text-xs capitalize" style={{ color: statusColor }} variant="bold">
          {status}
        </AppText>
      </View>
    </View>
  );
}