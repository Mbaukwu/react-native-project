// ─────────────────────────────────────────────────────────────
// HotelImage
// UI Component: Hotel detail image display
// Purpose: Renders hotel image with fallback placeholder on error
// Props: uri (string)
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import { Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// ── Props ────────────────────────────────────────────────────
type HotelImageProps = {
  uri: string;
};

// ── Component ────────────────────────────────────────────────
export default function HotelImage({ uri }: HotelImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      source={
        !imageError && uri
          ? { uri }
          : require("@/assets/images/hotel/hotel-placeholder.jpg")
      }
      onError={() => setImageError(true)}
      style={{ width, height: 320 }}
      resizeMode="cover"
    />
  );
}