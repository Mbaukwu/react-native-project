import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { supabase } from '@/constants/supabase/supabase';
import ScreenWrapper from '@/components/global/ScreenWrapper';
import AppText from '@/components/ui/typography/AppText';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
import Toast from 'react-native-toast-message';

export default function ForgotPasswordScreen() {
  const { back, push } = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) {
      Toast.show({ type: 'error', text1: 'Enter your email address' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo:  'myprojectapp://(auth)/reset-password',
    });
    setLoading(false);
    if (error) {
      Toast.show({ type: 'error', text1: 'Failed to send', text2: error.message });
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center px-6">
          <View className="bg-success/15 p-5 rounded-full mb-4">
            <IconSymbol name="envelope.fill" size={40} color={colors.success} />
          </View>
          <AppText className="text-text text-2xl text-center" variant="bold">
            Check your email
          </AppText>
          <AppText className="text-text-secondary text-center mt-2 leading-6">
            We sent a password reset link to {email}
          </AppText>
          <TouchableOpacity
            onPress={() => back()}
            className="mt-8 bg-primary py-4 px-10 rounded-2xl"
          >
            <AppText className="text-white" variant="bold">Back to Sign In</AppText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper keyboardAvoiding>
      <View className="flex-1 px-6 pt-14 pb-8">
        <TouchableOpacity onPress={() => back()} className="mb-8">
          <IconSymbol name="chevron.left" size={28} color={colors.text} />
        </TouchableOpacity>

        <AppText className="text-text text-3xl" variant="bold">Forgot Password</AppText>
        <AppText className="text-text-secondary mt-2">
          Enter your email and we'll send you a reset link
        </AppText>

        <View className="mt-8">
          <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">Email</AppText>
          <View className="flex-row items-center bg-input rounded-2xl px-4 h-14 border border-border">
            <IconSymbol name="envelope.fill" size={18} color={colors.icon} />
            <TextInput
              className="flex-1 text-text ml-3 font-dm-sans"
              placeholder="your@email.com"
              placeholderTextColor={colors.textDisabled}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSend}
          disabled={loading}
          className="bg-primary py-4 rounded-2xl mt-8 items-center"
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <AppText className="text-white text-base" variant="bold">Send Reset Link</AppText>
          )}
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}