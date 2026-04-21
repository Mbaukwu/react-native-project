// ─────────────────────────────────────────────────────────────
// ResetPasswordScreen
// Screen: Set new password after clicking reset email link
// Flow: user enters new password → submit → sign out → sign in
// ─────────────────────────────────────────────────────────────

import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema, ResetPasswordFormData } from "@/components/forms/form-validator/authValidator";
import { supabase } from '@/constants/supabase/supabase';
import ScreenWrapper from '@/components/global/ScreenWrapper';
import AppText from '@/components/ui/typography/AppText';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Toast from 'react-native-toast-message';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';


export default function ResetPasswordScreenComponent() {

  // ── Navigation & Theme ─────────────────────────────────────
  const { replace } = useRouter();
  const {colors} = useThemeColors()

  // ── Local State ────────────────────────────────────────────
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Form Setup ─────────────────────────────────────────────
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // ── Submit Handler ─────────────────────────────────────────
  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password: data.password });

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
            <View className={`flex-row items-center bg-input rounded-2xl px-4 h-14 border ${errors.password ? 'border-error' : 'border-border'}`}>
              <IconSymbol name="lock.fill" size={18} color={colors.icon} />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 text-text ml-3 font-dm-sans"
                    placeholder="At least 6 characters"
                    placeholderTextColor={colors.textDisabled}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                )}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <IconSymbol
                  name={showPassword ? "eye.slash.fill" : "eye.fill"}
                  size={18}
                  color={colors.icon}
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <AppText className="text-error text-xs mt-1">{errors.password.message}</AppText>
            )}
          </View>

          {/* Confirm Password */}
          <View>
            <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">
              Confirm Password
            </AppText>
            <View className={`flex-row items-center bg-input rounded-2xl px-4 h-14 border ${errors.confirmPassword ? 'border-error' : 'border-border'}`}>
              <IconSymbol name="lock.fill" size={18} color={colors.icon} />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 text-text ml-3 font-dm-sans"
                    placeholder="Repeat your password"
                    placeholderTextColor={colors.textDisabled}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                )}
              />
            </View>
            {errors.confirmPassword && (
              <AppText className="text-error text-xs mt-1">{errors.confirmPassword.message}</AppText>
            )}
          </View>

        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
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