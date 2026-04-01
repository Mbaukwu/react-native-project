// import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';
// import { useEffect, useState } from 'react';
// import ScreenWrapper from '@/components/global/ScreenWrapper';
// import AppText from '@/components/ui/typography/AppText';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { useWishlistStore } from '@/constants/stores/wishlistStore';
// import { getWishlistHotels } from '@/constants/supabase/services/serviceEntryFile';
// import SearchHotelCard from '@/components/ui/hotel/SearchHotelCard';
// import { Colors } from '@/constants/colorTheme/colors';
// import { useColorScheme } from '@/components/hooks/use-color-scheme';
// import { HotelCardType } from '@/constants/types-interface/hotelTypes';

// export default function WishlistScreen() {
//   const { push } = useRouter();
//   const colorScheme = useColorScheme() ?? 'light';
//   const colors = Colors[colorScheme];
//   const { wishlistIds, userId, isLoading: wishlistLoading } = useWishlistStore();
//   const [hotels, setHotels] = useState<HotelCardType[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!userId) {
//       setHotels([]);
//       setLoading(false);
//       return;
//     }
    
//     if (wishlistIds.length === 0) {
//       setHotels([]);
//       setLoading(false);
//       return;
//     }
    
//     setLoading(true);
//     getWishlistHotels(wishlistIds)
//       .then(setHotels)
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, [wishlistIds, userId]);

//   const isLoading = wishlistLoading || loading;

//   // Not logged in state
//   if (!userId) {
//     return (
//       <ScreenWrapper>
//         <View className="flex-1 items-center justify-center px-6">
//           <IconSymbol name="heart" size={64} color={colors.textDisabled} />
//           <AppText className="text-text text-xl text-center mt-4" variant="bold">
//             Save your favourites
//           </AppText>
//           <AppText className="text-text-secondary text-center mt-2">
// Sign in to save hotels you love. Access them anywhere, anytime.
//           </AppText>
          
//           <View className="w-full gap-3 mt-6">
//             <TouchableOpacity
//               onPress={() => push('/(auth)/signIn')}
//               className="bg-primary py-3.5 rounded-xl items-center"
//               activeOpacity={0.8}
//             >
//               <AppText className="text-white text-base" variant="bold">
//                 Sign In
//               </AppText>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               onPress={() => push('/(auth)/signUp')}
//               className="py-3.5 rounded-xl items-center border border-border"
//               activeOpacity={0.8}
//             >
//               <AppText className="text-text text-base" variant="bold">
//                 Create Account
//               </AppText>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               onPress={() => push('/(tabs)/home')}
//               className="py-2 items-center"
//             >
//               <AppText className="text-text-disabled text-sm">
//                 Browse as guest
//               </AppText>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScreenWrapper>
//     );
//   }

//   // Loading state
//   if (isLoading) {
//     return (
//       <ScreenWrapper>
//         <View className="flex-1 items-center justify-center">
//           <ActivityIndicator size="large" color={colors.primary} />
//         </View>
//       </ScreenWrapper>
//     );
//   }

//   // Empty wishlist state
//   if (hotels.length === 0) {
//     return (
//       <ScreenWrapper>
//         <View className="flex-1 items-center justify-center px-6">
//           <IconSymbol name="heart" size={64} color={colors.textDisabled} />
//           <AppText className="text-text text-xl text-center mt-4" variant="bold">
//             No favourites yet
//           </AppText>
//           <AppText className="text-text-secondary text-center mt-2">
//             Tap the heart on any hotel to save it here
//           </AppText>
//           <TouchableOpacity
//             onPress={() => push('/(tabs)/home')}
//             className="mt-6 bg-primary px-8 py-3 rounded-xl"
//           >
//             <AppText className="text-white" variant="bold">
//               Explore Hotels
//             </AppText>
//           </TouchableOpacity>
//         </View>
//       </ScreenWrapper>
//     );
//   }

//   // Wishlist with hotels
//   return (
//     <ScreenWrapper>
//       <View className="flex-1 px-4 pt-4">
//         <View className="flex-row items-center justify-between mb-4">
//           <AppText className="text-text text-2xl" variant="bold">
//             Your Favourites
//           </AppText>
//           <AppText className="text-text-secondary text-sm">
//             {hotels.length} {hotels.length === 1 ? 'hotel' : 'hotels'}
//           </AppText>
//         </View>

//         <FlatList
//           data={hotels}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => <SearchHotelCard hotel={item} />}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 24 }}
//         />
//       </View>
//     </ScreenWrapper>
//   );
// }

import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import ScreenWrapper from '@/components/global/ScreenWrapper';
import AppText from '@/components/ui/typography/AppText';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useWishlistStore } from '@/constants/stores/wishlistStore';
import { getWishlistHotels } from '@/constants/supabase/services/serviceEntryFile';
import SearchHotelCard from '@/components/ui/hotel/SearchHotelCard';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
import { HotelCardType } from '@/constants/types-interface/hotelTypes';

export default function WishlistScreen() {
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { wishlistIds, isLoading: wishlistLoading } = useWishlistStore();
  const [hotels, setHotels] = useState<HotelCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Initial load only - runs once
  useEffect(() => {
    const fetchHotels = async () => {
      if (wishlistIds.length === 0) {
        setHotels([]);
        setLoading(false);
        setHasLoaded(true);
        return;
      }
      
      setLoading(true);
      try {
        const fetchedHotels = await getWishlistHotels(wishlistIds);
        setHotels(fetchedHotels);
      } catch (error) {
        console.error('Failed to fetch wishlist hotels:', error);
      } finally {
        setLoading(false);
        setHasLoaded(true);
      }
    };

    fetchHotels();
  }, []); // Empty array = runs once on mount

  // Handle removal - update local state instantly without refetch
  const handleRemove = useCallback((hotelId: string) => {
    setHotels(prev => prev.filter(hotel => hotel.id !== hotelId));
  }, []);

  const isLoading = wishlistLoading || (!hasLoaded && loading);

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenWrapper>
    );
  }

  if (hotels.length === 0) {
    return (
      <ScreenWrapper>
        <View className="flex-1 items-center justify-center px-6">
          <IconSymbol name="heart" size={64} color={colors.textDisabled} />
          <AppText className="text-text text-xl text-center mt-4" variant="bold">
            No favourites yet
          </AppText>
          <AppText className="text-text-secondary text-center mt-2">
            Tap the heart on any hotel to save it here
          </AppText>
          <TouchableOpacity
            onPress={() => push('/(tabs)/home')}
            className="mt-6 bg-primary px-8 py-3 rounded-xl"
          >
            <AppText className="text-white" variant="bold">
              Explore Hotels
            </AppText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View className="flex-1 px-4 pt-4">
        <View className="flex-row items-center justify-between mb-4">
          <AppText className="text-text text-2xl" variant="bold">
            Your Favourites
          </AppText>
          <AppText className="text-text-secondary text-sm">
            {hotels.length} {hotels.length === 1 ? 'hotel' : 'hotels'}
          </AppText>
        </View>

        <FlatList
          data={hotels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SearchHotelCard 
              hotel={item} 
              onRemoveFromWishlist={handleRemove}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </ScreenWrapper>
  );
}
