import { TouchableOpacity } from 'react-native';
import { useRouter, Href } from 'expo-router';
import { IconSymbol, IconName } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

type ProfileMenuItemProps = {
   icon: IconName; 
  title: string;
  route: Href;  // Use Href type from expo-router
  iconColor?: string;
};

export default function ProfileMenuItem({ icon, title, route, iconColor }: ProfileMenuItemProps) {
  const { push } = useRouter();
  const { colors } = useThemeColors();

  return (
    <TouchableOpacity 
      onPress={() => push(route)}
      className="flex-row items-center py-4 px-2"
    >
      <IconSymbol name={icon} size={22} color={iconColor || colors.textSecondary} />
      <AppText className="text-text flex-1 ml-4 text-base">{title}</AppText>
      <IconSymbol name="chevron.right" size={18} color={colors.textDisabled} />
    </TouchableOpacity>
  );
}