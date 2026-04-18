// ─────────────────────────────────────────────────────────────
// DescriptionSection
// UI Component: Hotel detail description section
// Purpose: Displays "About this hotel" text content
// Props: description (string)
// ─────────────────────────────────────────────────────────────

import { View } from 'react-native';
import AppText from '@/components/ui/typography/AppText';

// ── Props ────────────────────────────────────────────────────
type DescriptionSectionProps = {
  description: string;
};

// ── Component ────────────────────────────────────────────────
export default function DescriptionSection({ description }: DescriptionSectionProps) {
  return (
    <View className="mt-4 mb-1">

      {/* ── Section Title ─────────────────────────────────── */}
      <AppText className="text-text text-base" variant="bold">
        About this hotel
      </AppText>

      {/* ── Description Content ───────────────────────────── */}
      <AppText className="text-text-secondary mt-2 leading-6">
        {description}
      </AppText>

    </View>
  );
}