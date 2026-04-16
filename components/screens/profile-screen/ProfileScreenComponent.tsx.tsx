import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { useWishlistStore } from "@/constants/stores/wishlistStore";
import { useAuth } from "@/components/hooks/auth-hook/useAuth";

export default function ProfileScreen() {
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { loadWishlist } = useWishlistStore();
  const { userEmail, userName, isAuthenticated, isLoading, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    await loadWishlist();
    push("/(tabs)/home");
    setSigningOut(false);
  };

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  // Not signed in
  if (!isAuthenticated) {
    return (
      <ScreenWrapper>
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
      </ScreenWrapper>
    );
  }

  // Signed in
  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 pt-8 mt-4">
        {/* Profile Header */}
        <View className="items-center mb-8">
          <View className="bg-primary/15 p-5 rounded-full mb-3">
            <IconSymbol name="person.fill" size={48} color={colors.primary} />
          </View>
          <AppText className="text-text text-2xl" variant="bold">
            {userName || userEmail?.split("@")[0]}
          </AppText>
          <AppText className="text-text-secondary text-sm mt-1">{userEmail}</AppText>
        </View>

        {/* Menu Items - Clean list style */}
        <View className="gap-2">
          <TouchableOpacity 
            onPress={() => push("/(tabs)/wishlist")}
            className="flex-row items-center py-4 px-2"
          >
            <IconSymbol name="heart.fill" size={22} color={colors.favorite} />
            <AppText className="text-text flex-1 ml-4 text-base">Wishlist</AppText>
            <IconSymbol name="chevron.right" size={18} color={colors.textDisabled} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => push("/(tabs)/bookings")}
            className="flex-row items-center py-4 px-2"
          >
            <IconSymbol name="calendar" size={22} color={colors.primary} />
            <AppText className="text-text flex-1 ml-4 text-base">My Bookings</AppText>
            <IconSymbol name="chevron.right" size={18} color={colors.textDisabled} />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => push("/(profile)/settings")}
            className="flex-row items-center py-4 px-2"
          >
            <IconSymbol name="gearshape.fill" size={22} color={colors.textSecondary} />
            <AppText className="text-text flex-1 ml-4 text-base">Settings</AppText>
            <IconSymbol name="chevron.right" size={18} color={colors.textDisabled} />
          </TouchableOpacity>
        </View>

        {/* Sign Out - Clean and subtle */}
        <TouchableOpacity
          onPress={handleSignOut}
          disabled={signingOut}
          className="mt-10 items-center py-3"
        >
          {signingOut ? (
            <ActivityIndicator size="small" color={colors.error} />
          ) : (
            <AppText className="text-error text-base">
              Sign Out
            </AppText>
          )}
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}