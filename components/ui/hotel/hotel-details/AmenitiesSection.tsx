// ─────────────────────────────────────────────────────────────
// AmenitiesSection Component
// Screen: Hotel Details / Search filter section
// Purpose: Displays clickable list of hotel amenities
// Dependencies: Expo Router, React Native, AppText
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '@/components/ui/typography/AppText';
import { useThemeColors } from '@/components/hooks/theme/useThemeColors';

// ── Props ────────────────────────────────────────────────────
type AmenitiesSectionProps = {
  amenities: string[];
};

// ── Component ────────────────────────────────────────────────
export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {

  // ── Navigation ────────────────────────────────────────────
  const { push } = useRouter();

  // ── Theme ────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Render ────────────────────────────────────────────────
  return (
    <View className="mt-4 mb-1">

      {/* ── Section Title ─────────────────────────────────── */}
      <AppText className="text-text text-base" variant="bold">
        Amenities
      </AppText>

      {/* ── Amenities List ─────────────────────────────────── */}
      <View className="flex-row flex-wrap mt-2 gap-2">

        {amenities.map((amenity, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => push(`/searchScreen?amenity=${amenity}`)}
            className="bg-card px-3 py-1.5 rounded-full border border-border flex-row items-center gap-1"
            activeOpacity={0.75}
          >
            <AppText className="text-text-secondary text-sm">
              {amenity}
            </AppText>
          </TouchableOpacity>
        ))}

      </View>

    </View>
  );
}