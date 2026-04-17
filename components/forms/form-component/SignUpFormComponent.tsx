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
import { signUpSchema, SignUpFormData } from "@/components/forms/form-validator/authValidator";
import { useState } from "react";

export default function SignUpFormComponent() {
  const { push, back } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

const onSubmit = async (data: SignUpFormData) => {
  setServerError(null);

  try {
    const response = await supabase.auth.signUp({
      email: data.email.trim(),
      password: data.password,
      options: {
        data: { name: data.name.trim() },
      },
    });

    if (response.error) throw response.error;

    // Check if email confirmation is required
    if (!response.data?.session) {
      // Email confirmation required
      setServerError(
        "✅ Verification email sent! Please check your inbox and confirm your email before signing in."
      );
      // Navigate to Sign In screen after a short delay
      setTimeout(() => {
        push("/(auth)/signIn");
      }, 2000);
    } else {
    
      push("/(tabs)/home");
    }
  } catch (error: any) {
    setServerError(error.message ?? "Sign up failed. Please try again.");
  }
};

  return (
    <ScreenWrapper keyboardAvoiding scrollable>
      <View className="px-6 pt-10 pb-10 mb-0">
        {/* Back */}
        <TouchableOpacity onPress={() => back()} className="flex-row items-center mb-8">
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
          <AppText className="text-text text-[16px] ml-1 capitalize px-1" variant="bold">
            go back
          </AppText>
        </TouchableOpacity>

        {/* Header */}
        <AppText className="text-text text-3xl" variant="bold">
          Create Account
        </AppText>
        <AppText className="text-text-secondary mt-2">Join StayEasy to save favourites and book hotels</AppText>

        {/* Server Error */}
        {serverError && (
          <View className="bg-error/10 border border-error/30 rounded-xl px-4 py-3 mt-4">
            <AppText className="text-error text-sm">{serverError}</AppText>
          </View>
        )}

        {/* Form Fields */}
        <View className="gap-4 mt-8">
          {/* Name */}
          <View>
            <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">
              Name
            </AppText>
            <View className={`flex-row items-center bg-input rounded-2xl px-4 h-14 border ${errors.name ? "border-error" : "border-border"}`}>
              <IconSymbol name="person.fill" size={18} color={colors.icon} />
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 text-text ml-3 font-dm-sans"
                    placeholder="Your name"
                    placeholderTextColor={colors.textDisabled}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                  />
                )}
              />
            </View>
            {errors.name && <AppText className="text-error text-xs mt-1">{errors.name.message}</AppText>}
          </View>

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
            <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">
              Password
            </AppText>
            <View className={`flex-row items-center bg-input rounded-2xl px-4 h-14 border ${errors.password ? "border-error" : "border-border"}`}>
              <IconSymbol name="lock.fill" size={18} color={colors.icon} />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="flex-1 text-text ml-3 font-dm-sans"
                    placeholder="At least 8 characters"
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

          {/* Confirm Password */}
          <View>
            <AppText className="text-text-secondary text-sm mb-1.5" variant="bold">
              Confirm Password
            </AppText>
            <View
              className={`flex-row items-center bg-input rounded-2xl px-4 h-14 border ${errors.confirmPassword ? "border-error" : "border-border"}`}
            >
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
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                )}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <IconSymbol name={showConfirmPassword ? "eye.slash.fill" : "eye.fill"} size={18} color={colors.icon} />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <AppText className="text-error text-xs mt-1">{errors.confirmPassword.message}</AppText>}
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="bg-primary py-4 rounded-2xl mt-8 items-center"
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <AppText className="text-white text-base" variant="bold">
              Create Account
            </AppText>
          )}
        </TouchableOpacity>

        {/* Sign In Link */}
        <View className="flex-row justify-center mt-6">
          <AppText className="text-text-secondary">Already have an account? </AppText>
          <TouchableOpacity onPress={() => push("/(auth)/signIn")}>
            <AppText className="text-primary" variant="bold">
              Sign In
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}