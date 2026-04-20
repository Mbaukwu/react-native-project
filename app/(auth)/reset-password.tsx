// ─────────────────────────────────────────────────────────────
// ResetPasswordScreen
// Screen: Set new password after clicking reset email link
// Flow: user enters new password → submit → sign out → sign in
// ─────────────────────────────────────────────────────────────

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

export default function ResetPasswordScreen() {

  // ── Navigation & Theme ─────────────────────────────────────
  const { replace } = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // ── State ──────────────────────────────────────────────────
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Submit Handler ─────────────────────────────────────────
  const handleReset = async () => {
    if (password.length < 6) {
      Toast.show({ type: 'error', text1: 'Password must be at least 6 characters' });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({ type: 'error', text1: 'Passwords do not match' });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      Toast.show({ type: 'error', text1: 'Reset failed', text2: error.message });
      setLoading(false);
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Password updated!',
      text2: 'Sign in with your new password',
    });

    await supabase.auth.signOut();
    replace('/(auth)/signIn');
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <ScreenWrapper keyboardAvoiding>
      <View className="flex-1 px-6 pt-14 pb-8">

        {/* Header */}
        <AppText className="text-text text-3xl" variant="bold">New Password</AppText>
        <AppText className="text-text-secondary mt-2">
          Choose a strong password for your account
        </AppText>

        {/* Form */}
        <View className="mt-8 gap-4">

          {/* New Password */}
          <View>
            <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">
              New Password
            </AppText>
            <View className="flex-row items-center bg-input rounded-2xl px-4 h-14 border border-border">
              <IconSymbol name="lock.fill" size={18} color={colors.icon} />
              <TextInput
                className="flex-1 text-text ml-3 font-dm-sans"
                placeholder="At least 6 characters"
                placeholderTextColor={colors.textDisabled}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <IconSymbol
                  name={showPassword ? "eye.slash.fill" : "eye.fill"}
                  size={18}
                  color={colors.icon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View>
            <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">
              Confirm Password
            </AppText>
            <View className="flex-row items-center bg-input rounded-2xl px-4 h-14 border border-border">
              <IconSymbol name="lock.fill" size={18} color={colors.icon} />
              <TextInput
                className="flex-1 text-text ml-3 font-dm-sans"
                placeholder="Repeat your password"
                placeholderTextColor={colors.textDisabled}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
            </View>
          </View>

        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleReset}
          disabled={loading}
          className="bg-primary py-4 rounded-2xl mt-8 items-center"
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading
            ? <ActivityIndicator color="white" />
            : <AppText className="text-white text-base" variant="bold">Update Password</AppText>
          }
        </TouchableOpacity>

      </View>
    </ScreenWrapper>
  );
}