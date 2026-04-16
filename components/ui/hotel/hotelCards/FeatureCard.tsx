import { View, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AppText from '@/components/ui/typography/AppText';

type FeatureCardProps = {
  title: string;
  subtitle: string;
  imageUrl?: string;
  onPress: () => void;
  placeholderImage?: any;
};

export default function FeatureCard({
  title,
  subtitle,
  imageUrl,
  onPress,
  placeholderImage = require("@/assets/images/hotel/hotel-story-placeholder.jpg"),
}: FeatureCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mr-4 w-44 rounded-2xl overflow-hidden shadow-md"
      activeOpacity={0.85}
    >
      <Image
        source={!imageError && imageUrl ? { uri: imageUrl } : placeholderImage}
        onError={() => setImageError(true)}
        className="w-44 h-56"
        resizeMode="cover"
      />
      <View className="absolute bottom-0 left-0 right-0 h-full bg-black/60" />
      <View className="absolute bottom-4 left-4">
        <AppText className="text-white text-lg font-dm-sans-bold" numberOfLines={1}>
          {title}
        </AppText>
        <AppText className="text-white/80 text-xs">
          {subtitle}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}