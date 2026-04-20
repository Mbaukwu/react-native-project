// ─────────────────────────────────────────────────────────────
// SignOutButton
// UI Component: Button to sign user out
// Purpose: Handles logout action with loading state
// Depends on: theme system
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { TouchableOpacity, ActivityIndicator } from "react-native";

import AppText from "@/components/ui/typography/AppText";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Props ───────────────────────────────────────────────────
type SignOutButtonProps = {
  onPress: () => void;
  loading: boolean;
};

// ── Component ────────────────────────────────────────────────
export default function SignOutButton({
  onPress,
  loading,
}: SignOutButtonProps) {

  // ── Theme ──────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Handlers ───────────────────────────────────────────────
  const handlePress = () => {
    if (!loading) {
      onPress();
    }
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={loading}
      className="mt-10 items-center py-3"
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.error} />
      ) : (
        <AppText className="text-error text-base">
          Sign Out
        </AppText>
      )}
    </TouchableOpacity>
  );
}