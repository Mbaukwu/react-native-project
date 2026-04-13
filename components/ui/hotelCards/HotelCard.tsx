// import { View, Image, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";
// import { magicModal } from "react-native-magic-modal";
// import AppText from "@/components/ui/typography/AppText";
// import { IconSymbol } from "@/components/ui/icon-symbol";
// import { Colors } from "@/constants/colorTheme/colors";
// import { useColorScheme } from "@/components/hooks/use-color-scheme";
// import { useWishlistStore } from "@/constants/stores/wishlistStore";
// import { SheetManager } from "react-native-actions-sheet";

// import { HotelCardType } from "@/constants/types-interface/hotelTypes";
// import { useState } from "react";

// type HotelProps = {
//   hotel: HotelCardType;
// };

// export default function HotelCard({ hotel }: HotelProps) {
//   const { push } = useRouter();
//   const colorScheme = useColorScheme() ?? "light";
//   const colors = Colors[colorScheme];
//   const { toggleWishlist, wishlistIds, userId } = useWishlistStore();
//   const [imageError, setImageError] = useState(false);

//   const isFav = wishlistIds.includes(hotel.id);

//   const handleWishlistPress = () => {
//     if (!userId && !isFav) {
//       SheetManager.show("auth-prompt", {
//         payload: {
//           onLocalSave: () => toggleWishlist(hotel.id),
//         },
//       });
//     } else {
//       toggleWishlist(hotel.id);
//     }
//   };

//   const handlePress = () => {
//     push(`/hotel/${hotel.id}`);
//   };

//   return (
//     <TouchableOpacity onPress={handlePress} className="w-56 mr-4 bg-card rounded-2xl overflow-hidden shadow-md" activeOpacity={0.85}>
//       <View className="w-full h-36">
//         <Image
//           source={!imageError && hotel.image_urls[0] ? { uri: hotel.image_urls[0] } : require("@/assets/images/hotel/hotel-placeholder.jpg")}
//           onError={() => setImageError(true)}
//           className="w-full h-full"
//           resizeMode="cover"
//         />
//         {/* Simple dark overlay */}
//         <View className="absolute bottom-0 left-0 right-0 h-full bg-black/40" />

//         <TouchableOpacity onPress={handleWishlistPress} className="absolute right-1 p-1.5" style={{ zIndex: 10 }}>
//           <IconSymbol name={isFav ? "heart.fill" : "heart"} size={20} color={isFav ? colors.favorite : "white"} />
//         </TouchableOpacity>

//         {hotel.is_deal && (
//           <View className="absolute top-2 left-2 bg-accent px-2 py-1 rounded-full">
//             <AppText variant="bold" className="text-xs text-white px-1.5">
//               Deal
//             </AppText>
//           </View>
//         )}
//       </View>

//       <View className="p-3">
//         <AppText className="text-text text-sm" variant="bold" numberOfLines={1}>
//           {hotel.name}
//         </AppText>
//         <AppText className="text-text-secondary text-xs mt-0.5">
//           {hotel.city} • {hotel.location || "Central"}
//         </AppText>

//         <View className="flex-row items-center mt-1.5 gap-1">
//           <View className="bg-primary px-1.5 py-0.5 rounded">
//             <AppText className="text-white text-xs">{hotel.rating?.toFixed(1)}</AppText>
//           </View>
//           <AppText className="text-text-secondary text-xs">{hotel.review_score_word}</AppText>
//         </View>

//         {hotel.is_deal ? (
//           <View className="flex-row items-baseline mt-1.5">
//             <AppText className="text-text-disabled text-[10px] line-through mr-1">₦{Math.round(hotel.price_per_stay * 1.3).toLocaleString()}</AppText>
//             <AppText className="text-primary text-sm" variant="bold">
//               ₦{hotel.price_per_stay.toLocaleString()}
//             </AppText>
//             <AppText className="text-text-disabled text-[10px] ml-0.5">/24hrs</AppText>
//           </View>
//         ) : (
//           <View className="flex-row items-baseline mt-1.5">
//             <AppText className="text-primary text-sm" variant="bold">
//               ₦{hotel.price_per_stay.toLocaleString()}
//             </AppText>
//             <AppText className="text-text-disabled text-xs ml-0.5">/24hrs</AppText>
//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// }
import { View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { magicModal } from "react-native-magic-modal";
import AppText from "@/components/ui/typography/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { useWishlistStore } from "@/constants/stores/wishlistStore";
import { SheetManager } from "react-native-actions-sheet";
import { HotelCardType } from "@/constants/types-interface/hotelTypes";
import { useState } from "react";

type HotelProps = {
  hotel: HotelCardType;
};

export default function HotelCard({ hotel }: HotelProps) {
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { toggleWishlist, wishlistIds, userId } = useWishlistStore();
  const [imageError, setImageError] = useState(false);

  const isFav = wishlistIds.includes(hotel.id);
  const isTopRated = hotel.rating && hotel.rating >= 8.0;

  const handleWishlistPress = () => {
    if (!userId && !isFav) {
      SheetManager.show("auth-prompt", {
        payload: {
          onLocalSave: () => toggleWishlist(hotel.id),
        },
      });
    } else {
      toggleWishlist(hotel.id);
    }
  };

  const handlePress = () => {
    push(`/hotel/${hotel.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="w-56 mr-4 bg-card rounded-2xl overflow-hidden shadow-md" activeOpacity={0.85}>
      <View className="w-full h-36">
        <Image
          source={!imageError && hotel.image_urls[0] ? { uri: hotel.image_urls[0] } : require("@/assets/images/hotel/hotel-placeholder.jpg")}
          onError={() => setImageError(true)}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Dark overlay */}
        <View className="absolute bottom-0 left-0 right-0 h-full bg-black/40" />

        <TouchableOpacity onPress={handleWishlistPress} className="absolute right-1 p-1.5" style={{ zIndex: 10 }}>
          <IconSymbol name={isFav ? "heart.fill" : "heart"} size={20} color={isFav ? colors.favorite : "white"} />
        </TouchableOpacity>

        {/* Badges - top left */}
        <View className="absolute top-2 left-2 flex-row gap-1.5">
          {hotel.is_deal && (
            <View className="bg-accent/90 px-2 py-0.5 rounded-full">
              <AppText variant="bold" className="text-[10px] text-white">
                🔥 DEAL
              </AppText>
            </View>
          )}
          {isTopRated && !hotel.is_deal && (
            <View className="bg-platinum/90 px-2 py-0.5 rounded-full flex-row items-center shadow-sm" >
              <IconSymbol name="star.fill" size={10} color={colors.platinumDark} />
              <AppText variant="bold" className="text-[10px] text-gray-800 ml-1">
                TOP RATED
              </AppText>
            </View>
          )}
        </View>

        {/* If both badges exist, show only Deal (priority) */}
        {hotel.is_deal && isTopRated && (
          <View className="absolute top-2 left-2 bg-accent/90 px-2 py-0.5 rounded-full">
            <AppText variant="bold" className="text-[10px] text-white">
              🔥 DEAL
            </AppText>
          </View>
        )}
      </View>

      <View className="p-3">
        <AppText className="text-text text-sm" variant="bold" numberOfLines={1}>
          {hotel.name}
        </AppText>
        <AppText className="text-text-secondary text-xs mt-0.5">
          {hotel.city} • {hotel.location || "Central"}
        </AppText>

        <View className="flex-row items-center mt-1.5 gap-1">
          <View className="bg-primary px-1.5 py-0.5 rounded">
            <AppText className="text-white text-xs">{hotel.rating?.toFixed(1)}</AppText>
          </View>
          <AppText className="text-text-secondary text-xs">{hotel.review_score_word}</AppText>
        </View>

        {hotel.is_deal ? (
          <View className="flex-row items-baseline mt-1.5">
            <AppText className="text-text-disabled text-[10px] line-through mr-1">
              ₦{Math.round(hotel.price_per_stay * 1.3).toLocaleString()}
            </AppText>
            <AppText className="text-primary text-sm" variant="bold">
              ₦{hotel.price_per_stay.toLocaleString()}
            </AppText>
            <AppText className="text-text-disabled text-[10px] ml-0.5">/24hrs</AppText>
          </View>
        ) : (
          <View className="flex-row items-baseline mt-1.5">
            <AppText className="text-primary text-sm" variant="bold">
              ₦{hotel.price_per_stay.toLocaleString()}
            </AppText>
            <AppText className="text-text-disabled text-xs ml-0.5">/24hrs</AppText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}