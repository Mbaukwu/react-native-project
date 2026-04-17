import { TouchableOpacity, ActivityIndicator } from 'react-native';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

type SignOutButtonProps = {
  onPress: () => void;
  loading: boolean;
};

export default function SignOutButton({ onPress, loading }: SignOutButtonProps) {
  const { colors } = useThemeColors();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      className="mt-10 items-center py-3"
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.error} />
      ) : (
        <AppText className="text-error text-base">Sign Out</AppText>
      )}
    </TouchableOpacity>
  );
}