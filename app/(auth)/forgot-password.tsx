import { View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { supabase } from '@/constants/supabase/supabase';
import ScreenWrapper from '@/components/global/ScreenWrapper';
import AppText from '@/components/ui/typography/AppText';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const { back } = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center px-6">
          <IconSymbol name="envelope.fill" size={64} color={colors.primary} />
          <AppText className="text-text text-xl text-center mt-4" variant="bold">
            Check Your Email
          </AppText>
          <AppText className="text-text-secondary text-center mt-2">
            We've sent a password reset link to {email}
          </AppText>
          <TouchableOpacity onPress={() => back()} className="mt-6 bg-primary py-3 px-8 rounded-xl">
            <AppText className="text-white">Back to Sign In</AppText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View className="flex-1 px-6 pt-14">
        <TouchableOpacity onPress={() => back()} className="mb-8">
          <IconSymbol name="chevron.left" size={28} color={colors.text} />
        </TouchableOpacity>

        <AppText className="text-text text-3xl" variant="bold">
          Forgot Password?
        </AppText>
        <AppText className="text-text-secondary mt-2">
          Enter your email and we'll send you a link to reset your password.
        </AppText>

        <View className="mt-8">
          <View className="flex-row items-center bg-card rounded-2xl px-4 h-14 border border-border">
            <IconSymbol name="envelope.fill" size={18} color={colors.icon} />
            <TextInput
              className="flex-1 text-text ml-3"
              placeholder="your@email.com"
              placeholderTextColor={colors.textDisabled}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleResetPassword}
          disabled={loading}
          className="bg-primary py-4 rounded-2xl mt-8 items-center"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <AppText className="text-white text-base" variant="bold">
              Send Reset Link
            </AppText>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => back()} className="mt-4 items-center">
          <AppText className="text-primary">Back to Sign In</AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}