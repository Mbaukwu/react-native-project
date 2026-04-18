// ─────────────────────────────────────────────────────────────
// AddressSection Component
// Screen: Hotel Details / Booking Details section
// Purpose: Displays hotel address if available
// Dependencies: React Native View, AppText
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { View } from 'react-native';
import AppText from '@/components/ui/typography/AppText';

// ── Props ────────────────────────────────────────────────────
type AddressSectionProps = {
  address: string | null;
};

// ── Component ────────────────────────────────────────────────
export default function AddressSection({ address }: AddressSectionProps) {

  // ── Guard Clause ───────────────────────────────────────────
  if (!address) return null;

  // ── Render ────────────────────────────────────────────────
  return (
    <View className="mt-4 pt-4 border-t border-border">

      {/* ── Section Title ─────────────────────────────────── */}
      <AppText className="text-text text-base" variant="bold">
        Address
      </AppText>

      {/* ── Address Content ────────────────────────────────── */}
      <AppText className="text-text-secondary mt-1">
        {address}
      </AppText>

    </View>
  );
}