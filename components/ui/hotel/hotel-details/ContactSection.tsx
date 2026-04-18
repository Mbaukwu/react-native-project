// ─────────────────────────────────────────────────────────────
// ContactSection Component
// Screen: Hotel Details / Contact info section
// Purpose: Displays hotel phone and email contact information
// Dependencies: React Native, IconSymbol, AppText, Theme hook
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

// ── Props ────────────────────────────────────────────────────
type ContactSectionProps = {
  phone: string | null;
  email: string | null;
};

// ── Component ────────────────────────────────────────────────
export default function ContactSection({ phone, email }: ContactSectionProps) {

  // ── Theme ────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Guard Clause ───────────────────────────────────────────
  if (!phone && !email) return null;

  // ── Render ────────────────────────────────────────────────
  return (
    <View className="mt-4 pt-4 border-t border-border">

      {/* ── Section Title ─────────────────────────────────── */}
      <AppText className="text-text text-base" variant="bold">
        Contact
      </AppText>

      {/* ── Phone ──────────────────────────────────────────── */}
      {phone && (
        <View className="flex-row items-center mt-2 gap-2">
          <IconSymbol name="phone.fill" size={16} color={colors.textSecondary} />
          <AppText className="text-text-secondary">
            {phone}
          </AppText>
        </View>
      )}

      {/* ── Email ──────────────────────────────────────────── */}
      {email && (
        <View className="flex-row items-center mt-1 gap-2">
          <IconSymbol name="envelope.fill" size={16} color={colors.textSecondary} />
          <AppText className="text-text-secondary">
            {email}
          </AppText>
        </View>
      )}

    </View>
  );
}