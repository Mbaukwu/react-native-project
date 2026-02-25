import { View, Text, Image, Pressable, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ScreenWrapper from '@/components/global/ScreenWrapper';
import { useFavoritesStore } from '@/constants/stores/useFavoriteStore';
import { useGetProductDetail } from '@/hooks/useGetProductsDetail'; 

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {back} = useRouter();
  const { toggleFavorite, favorites } = useFavoritesStore();

  const { data, isLoading, error } = useGetProductDetail(id);  

  if (isLoading) return (
    <ScreenWrapper className="justify-center items-center">
      <ActivityIndicator size="large" />
    </ScreenWrapper>
  );

  if (error || !data) return (
    <ScreenWrapper className="justify-center items-center">
      <Text className="text-red-500">Error loading product</Text>
    </ScreenWrapper>
  );

  const isFav = favorites.includes(data.id);

  return (
    <ScreenWrapper>
      <ScrollView className=" bg-white font-roboto">
        <Pressable className="p-4" onPress={() => back()}>
          <Text className="text-pink-600 text-lg">← Back</Text>
        </Pressable>

        <Image 
          source={{ uri: data.image }}
          className="w-full h-80"
          resizeMode="contain"
        />

        <View className="p-4 ">
          <View className="flex-row justify-between items-start mb-4">
            <Text className="text-2xl font-bold flex-1 mr-4">
              {data.title}
            </Text>
            <Pressable onPress={() => toggleFavorite(data.id)}>
              <Text className="text-4xl">
                {isFav ? '❤️' : '🤍'}
              </Text>
            </Pressable>
          </View>

          <Text className="text-3xl font-bold text-pink-600 mb-2">
            ${data.price}
          </Text>

          <Text className="text-gray-600 mb-2 text-base">
            Category: {data.category}
          </Text>

          <Text className="text-yellow-600 mb-4">
            ⭐ {data.rating.rate} ({data.rating.count} reviews)
          </Text>

          <Text className="text-gray-800 text-[18px] leading-6">
            {data.description}
          </Text>

          <TouchableOpacity className="bg-sky-700 py-4 rounded-lg mt-6">
            <Text className="text-white text-center text-lg font-bold">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}