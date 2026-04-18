// ─────────────────────────────────────────────────────────────
// ProfileScreen
// Screen: User profile page
// Shows: user info, menu navigation, sign out action
// Depends on: useAuth, wishlist store, navigation routes
// ─────────────────────────────────────────────────────────────

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

// ── Component ────────────────────────────────────────────────
export default function ProfileScreen() {

  // ── Navigation ────────────────────────────────────────────
  const { push } = useRouter();

  // ── Theme ────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Store ────────────────────────────────────────────────
  const { loadWishlist } = useWishlistStore();

  // ── Auth ────────────────────────────────────────────────
  const {
    userEmail,
    userName,
    avatarUrl,
    isAuthenticated,
    isLoading,
    signOut
  } = useAuth();

  // ── Local State ───────────────────────────────────────────
  const [signingOut, setSigningOut] = useState(false);

  // ── Handlers ─────────────────────────────────────────────
  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    await loadWishlist();
    push("/(tabs)/home");
    setSigningOut(false);
  };

  // ── Loading State ─────────────────────────────────────────
  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  // ── Not Authenticated ─────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <ScreenWrapper>
        <NotSignedInState />
      </ScreenWrapper>
    );
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 pt-8 mt-4">

        {/* ── Header ─────────────────────────────────────── */}
        <ProfileHeader userName={userName} userEmail={userEmail} />

        {/* ── Menu Items ────────────────────────────────── */}
        <View className="gap-2 mt-4">
          <ProfileMenuItem
            icon="heart.fill"
            title="Wishlist"
            route="/(tabs)/wishlist"
            iconColor={colors.favorite}
          />
          <ProfileMenuItem
            icon="calendar"
            title="My Bookings"
            route="/(tabs)/bookings"
            iconColor={colors.primary}
          />
          <ProfileMenuItem
            icon="gearshape.fill"
            title="Settings"
            route="/(profile)/settings"
          />
        </View>

        {/* ── Sign Out ──────────────────────────────────── */}
        <SignOutButton onPress={handleSignOut} loading={signingOut} />

      </View>
    </ScreenWrapper>
  );
}