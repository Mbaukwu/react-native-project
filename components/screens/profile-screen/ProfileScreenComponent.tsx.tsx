import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { useWishlistStore } from "@/constants/stores/wishlistStore";
import { useAuth } from "@/components/hooks/auth-hook/useAuth";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";
import ProfileHeader from "@/components/ui/profile/ProfileHeader";
import ProfileMenuItem from "@/components/ui/profile/ProfileMenuItem";
import SignOutButton from "@/components/ui/profile/SignOutButton";
import NotSignedInState from "@/components/ui/profile/NotSignedInState";

export default function ProfileScreen() {
  const { push } = useRouter();
  const { colors } = useThemeColors();
  const { loadWishlist } = useWishlistStore();
    const { userEmail, userName, avatarUrl, isAuthenticated, isLoading, signOut } = useAuth();
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

  if (!isAuthenticated) {
    return (
      <ScreenWrapper>
        <NotSignedInState />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 pt-8 mt-4">
        <ProfileHeader userName={userName} userEmail={userEmail} />
        
        <View className="gap-2 mt-4">
          <ProfileMenuItem icon="heart.fill" title="Wishlist" route="/(tabs)/wishlist" iconColor={colors.favorite} />
          <ProfileMenuItem icon="calendar" title="My Bookings" route="/(tabs)/bookings" iconColor={colors.primary} />
          <ProfileMenuItem icon="gearshape.fill" title="Settings" route="/(profile)/settings" />
        </View>

        <SignOutButton onPress={handleSignOut} loading={signingOut} />
      </View>
    </ScreenWrapper>
  );
}