
import { View, Text, FlatList, Pressable, ActivityIndicator, Image } from "react-native";
import { useFavoritesStore } from "@/constants/stores/useFavoriteStore";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useRouter } from "expo-router";

export default function ProductScreen() {
  const { toggleFavorite, favorites } = useFavoritesStore();
  const { data, isLoading, error } = useGetProducts();
  const { push, back } = useRouter();

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  if (error)
    return (
      <ScreenWrapper className="justify-center items-center">
        <Text className="text-red-500">Error loading products</Text>
      </ScreenWrapper>
    );
  return (
    <ScreenWrapper>
      <View className=" px-4 bg-pink-900 font-roboto">
        <View className="flex-row items-center gap-x-2">
          <Pressable onPress={() => back()}>
            <IconSymbol name="chevron.left" size={28} color={"#fff"} />
          </Pressable>
          {/* header */}
          <Text className="text-3xl font-roboto-bold m-4 text-white uppercase font-bold">Product List ({favorites.length} favorites)</Text>
        </View>

        {/* list */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isFavorite = favorites.includes(item.id);

            return (
              // products
              <Pressable
                onPress={() =>
                  push({
                    pathname: "/products/[id]",
                    params: { id: item.id },
                  })
                }
              >
                {/* products */}
                <View className="bg-pink-100 p-4 mb-3 rounded-lg flex-row justify-between items-center">
                  {/* products-image */}
                  <Image source={{ uri: item.image }} className="w-20 h-20 rounded-lg mr-3" resizeMode="contain" />
                  {/* products info */}
                  <View className="flex-1">
                    <Text className="font-bold text-lg">{item.title}</Text>
                    <Text className="text-gray-600 mt-1">${item.price}</Text>
                  </View>
                  {/* favorite button */}
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation(); 
                      console.log("Toggling favorite for:", item.id);
                      toggleFavorite(item.id);
                    }}
                  >
                    <Text className="text-4xl">{isFavorite ? "❤️" : "🤍"}</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
}
