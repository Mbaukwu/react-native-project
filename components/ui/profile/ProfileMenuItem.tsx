// ─────────────────────────────────────────────────────────────
// ProfileMenuItem
// UI Component: Single item in profile/settings menu
// Purpose: Displays icon, title, and navigates to a route
// Depends on: expo-router, theme system
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { TouchableOpacity } from "react-native";
import { useRouter, Href } from "expo-router";

import { IconSymbol, IconName } from "@/components/ui/icon-symbol";
import AppText from "@/components/ui/typography/AppText";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";

// ── Props ───────────────────────────────────────────────────
type ProfileMenuItemProps = {
  icon: IconName;
  title: string;
  route: Href;
  iconColor?: string;
};

// ── Component ────────────────────────────────────────────────
export default function ProfileMenuItem({
  icon,
  title,
  route,
  iconColor,
}: ProfileMenuItemProps) {

  // ── Navigation & Theme ─────────────────────────────────────
  const { push } = useRouter();
  const { colors } = useThemeColors();

  // ── Handlers ───────────────────────────────────────────────
  const handlePress = () => {
    push(route);
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center py-4 px-2"
    >
      <IconSymbol
        name={icon}
        size={22}
        color={iconColor || colors.textSecondary}
      />

      <AppText className="text-text flex-1 ml-4 text-base">
        {title}
      </AppText>

      <IconSymbol
        name="chevron.right"
        size={18}
        color={colors.textDisabled}
      />
    </TouchableOpacity>
  );
}