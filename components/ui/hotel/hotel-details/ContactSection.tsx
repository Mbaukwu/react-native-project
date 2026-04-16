import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

type ContactSectionProps = {
  phone: string | null;
  email: string | null;
};

export default function ContactSection({ phone, email }: ContactSectionProps) {
  const { colors } = useThemeColors();

  if (!phone && !email) return null;

  return (
    <View className="mt-4 pt-4 border-t border-border">
      <AppText className="text-text text-base" variant="bold">
        Contact
      </AppText>
      {phone && (
        <View className="flex-row items-center mt-2 gap-2">
          <IconSymbol name="phone.fill" size={16} color={colors.textSecondary} />
          <AppText className="text-text-secondary">{phone}</AppText>
        </View>
      )}
      {email && (
        <View className="flex-row items-center mt-1 gap-2">
          <IconSymbol name="envelope.fill" size={16} color={colors.textSecondary} />
          <AppText className="text-text-secondary">{email}</AppText>
        </View>
      )}
    </View>
  );
}