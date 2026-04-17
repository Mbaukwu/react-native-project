import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

export default function NotSignedInState() {
  const { push } = useRouter();
  const { colors } = useThemeColors();

  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="bg-primary/15 p-5 rounded-full">
        <IconSymbol name="person.fill" size={48} color={colors.primary} />
      </View>
      <AppText className="text-text text-xl text-center mt-4" variant="bold">
        Not Signed In
      </AppText>
      <AppText className="text-text-secondary text-center mt-2">
        Sign in to save favourites and manage bookings
      </AppText>

      <View className="w-full gap-3 mt-6">
        <TouchableOpacity
          onPress={() => push("/(auth)/signIn")}
          className="bg-primary py-3.5 rounded-xl items-center"
        >
          <AppText className="text-white text-base" variant="bold">
            Sign In
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => push("/(auth)/signUp")}
          className="py-3.5 rounded-xl items-center border border-border"
        >
          <AppText className="text-text text-base" variant="bold">
            Create Account
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}