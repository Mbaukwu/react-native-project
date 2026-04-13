import { View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "@/constants/supabase/supabase";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { signInSchema, SignInFormData } from "@/components/forms/form-validator/authValidator";
import { useState } from "react";

export default function SignInFormComponent() {
  const { push, back } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setServerError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email.trim(),
        password: data.password,
      });

      if (signInError) throw signInError;
      push("/(tabs)/home");
    } catch (error: any) {
      setServerError(error.message ?? "Sign in failed. Please try again.");
    }
  };

  return (
    <ScreenWrapper keyboardAvoiding>
      <View className="flex-1 px-6 pt-10 pb-10">
        {/* Back */}
       <TouchableOpacity onPress={() => back()} className="flex-row items-center mb-8">
  <IconSymbol name="chevron.left" size={24} color={colors.text} />
  <AppText className="text-text text-[16px] ml-1 capitalize px-1" variant="bold">go back</AppText>
</TouchableOpacity>

        {/* Header */}
        <AppText className="text-text text-3xl" variant="bold">
          Welcome Back
        </AppText>
        <AppText className="text-text-secondary mt-2">
          Sign in to access your favourites and bookings
        </AppText>

        {/* Server Error */}
        {serverError && (
          <View className="bg-error/10 border border-error/30 rounded-xl px-4 py-3 mt-4">
            <AppText className="text-error text-sm">{serverError}</AppText>
          </View>
        )}

        {/* Form Fields */}
        <View className="gap-4 mt-8">
          {/* Email */}
          <View>
            <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">
              Email
            </AppText>
            <View className={`flex-row items-center bg-input rounded-2xl px-4 h-14 border ${errors.email ? "border-error" : "border-border"}`}>
              <IconSymbol name="envelope.fill" size={18} color={colors.icon} />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 text-text ml-3 font-dm-sans"
                    placeholder="your@email.com"
                    placeholderTextColor={colors.textDisabled}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                )}
              />
            </View>
            {errors.email && <AppText className="text-error text-xs mt-1">{errors.email.message}</AppText>}
          </View>

          {/* Password */}
          <View>
            <View className="flex-row justify-between mb-1.5">
              <AppText className="text-text-secondary text-sm" variant="bold">
                Password
              </AppText>
             <TouchableOpacity onPress={() => push('/(auth)/forgot-password')}>
                <AppText className="text-primary text-sm">Forgot password?</AppText>
              </TouchableOpacity>
            </View>
            <View className={`flex-row items-center bg-input rounded-2xl px-4 h-14 border ${errors.password ? "border-error" : "border-border"}`}>
              <IconSymbol name="lock.fill" size={18} color={colors.icon} />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 text-text ml-3 font-dm-sans"
                    placeholder="Your password"
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
                <IconSymbol name={showPassword ? "eye.slash.fill" : "eye.fill"} size={18} color={colors.icon} />
              </TouchableOpacity>
            </View>
            {errors.password && <AppText className="text-error text-xs mt-1">{errors.password.message}</AppText>}
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-primary py-4 rounded-2xl mt-8 items-center"
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <AppText className="text-white text-base" variant="bold">Sign In</AppText>
          )}
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row justify-center mt-6">
          <AppText className="text-text-secondary">Don't have an account? </AppText>
          <TouchableOpacity onPress={() => push("/(auth)/signUp")}>
            <AppText className="text-primary" variant="bold">Create Account</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}