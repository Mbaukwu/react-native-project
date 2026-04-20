
import { View, Image } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

type ProfileHeaderProps = {
  userName: string | null;
  userEmail: string | null;
  avatarUrl?: string | null;
};

export default function ProfileHeader({ userName, userEmail, avatarUrl }: ProfileHeaderProps) {
  const { colors } = useThemeColors();

  return (
    <View className="items-center mb-8">
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} className="w-24 h-24 rounded-full mb-3" />
      ) : (
        <View className="bg-primary/15 p-5 rounded-full mb-3">
          <IconSymbol name="person.fill" size={48} color={colors.primary} />
        </View>
      )}
      <AppText className="text-text text-2xl" variant="bold">
        {userName || userEmail?.split("@")[0]}
      </AppText>
      <AppText className="text-text-secondary text-sm mt-1">{userEmail}</AppText>
    </View>
  );
}