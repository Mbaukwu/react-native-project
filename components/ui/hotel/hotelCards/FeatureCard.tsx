// ─────────────────────────────────────────────────────────────
// FeatureCard
// UI Component: Featured horizontal card
// Purpose: Displays image-based feature item (city, amenity, category)
// Props: title, subtitle, imageUrl, onPress, placeholderImage
// ─────────────────────────────────────────────────────────────

import { View, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AppText from '@/components/ui/typography/AppText';

// ── Props ────────────────────────────────────────────────────
type FeatureCardProps = {
  title: string;
  subtitle: string;
  imageUrl?: string;
  onPress: () => void;
  placeholderImage?: any;
};

// ── Component ────────────────────────────────────────────────
export default function FeatureCard({
  title,
  subtitle,
  imageUrl,
  onPress,
  placeholderImage = require("@/assets/images/hotel/hotel-story-placeholder.jpg"),
}: FeatureCardProps) {

  // ── Local State ───────────────────────────────────────────
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mr-4 w-44 rounded-2xl overflow-hidden shadow-md"
      activeOpacity={0.85}
    >

      {/* ── Image ─────────────────────────────────────────── */}
      <Image
        source={
          !imageError && imageUrl
            ? { uri: imageUrl }
            : placeholderImage
        }
        onError={() => setImageError(true)}
        className="w-44 h-56"
        resizeMode="cover"
      />

      {/* ── Dark Overlay ─────────────────────────────────── */}
      <View className="absolute bottom-0 left-0 right-0 h-full bg-black/60" />

      {/* ── Text Content ─────────────────────────────────── */}
      <View className="absolute bottom-4 left-4">

        <AppText
          className="text-white text-lg font-dm-sans-bold"
          numberOfLines={1}
        >
          {title}
        </AppText>

        <AppText className="text-white/80 text-xs">
          {subtitle}
        </AppText>

      </View>

    </TouchableOpacity>
  );
}