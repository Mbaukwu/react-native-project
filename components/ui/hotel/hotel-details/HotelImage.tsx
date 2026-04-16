import { useState } from 'react';
import { Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type HotelImageProps = {
  uri: string;
};

export default function HotelImage({ uri }: HotelImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      source={!imageError && uri ? { uri } : require("@/assets/images/hotel/hotel-placeholder.jpg")}
      onError={() => setImageError(true)}
      style={{ width, height: 320 }}
      resizeMode="cover"
    />
  );
}