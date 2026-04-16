import { useState, useRef } from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { LegendList, LegendListRef } from "@legendapp/list";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import HotelImage from "./HotelImage";
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";
const { width } = Dimensions.get("window");

type HotelImageCarouselProps = {
  images: string[];
  onBack: () => void;
  onWishlist: () => void;
  isWishlisted: boolean;
  isDeal: boolean;
  isTopRated: boolean;
  colors: any;
};

export default function HotelImageCarousel({ images, onBack, onWishlist, isWishlisted, isDeal, isTopRated, colors }: HotelImageCarouselProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const legendListRef = useRef<LegendListRef>(null);

  return (
    <View className="relative">
      <LegendList
        ref={legendListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        snapToInterval={width}
        snapToAlignment="center"
        decelerationRate="fast"
        renderItem={({ item }) => <HotelImage uri={item} />}
        onScroll={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          if (newIndex !== activeImageIndex) {
            setActiveImageIndex(newIndex);
          }
        }}
        scrollEventThrottle={16}
      />

      {/* Back Button */}
      <TouchableOpacity onPress={onBack} className="absolute top-12 left-4 bg-black/50 p-2 rounded-full">
        <IconSymbol name="chevron.left" size={24} color="white" />
          </TouchableOpacity>
          
      {/* Wishlist Button */}
      <TouchableOpacity onPress={onWishlist} className="absolute top-12 right-4 bg-black/50 p-2 rounded-full">
        <IconSymbol name={isWishlisted ? "heart.fill" : "heart"} size={22} color={isWishlisted ? colors.error : "white"} />
          </TouchableOpacity>
          
      {/* Dark Overlay */}
          <View className="absolute inset-0 bg-black/40" pointerEvents="none" />
          
      {/* Badges - bottom left */}
      <View className="absolute bottom-4 left-4 flex-row gap-2">
        {isDeal && (
          <View className="bg-accent px-3 py-1.5 rounded-full">
            <AppText className="text-white text-xs font-dm-sans-bold">🔥 DEAL</AppText>
          </View>
        )}
        {isTopRated && (
          <View className=" px-3 py-1.5 rounded-full flex-row items-center bg-platinum-dark/70">
            <IconSymbol name="star.fill" size={12} color="#F4C430" />
            <AppText className="text-gray-800 text-[10px] font-dm-sans-bold ml-1">TOP RATED</AppText>
          </View>
        )}
      </View>

      {/* Pagination Dots */}
      {images.length > 1 && (
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2 z-100">
          {images.map((_, index) => (
            <View key={index} className={`h-1.5 rounded-full ${index === activeImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
          ))}
        </View>
      )}
    </View>
  );
}
