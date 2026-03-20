import { View, Text, FlatList, Pressable, ActivityIndicator, Image } from "react-native";
import { useFavoritesStore } from "@/constants/stores/useFavoriteStore";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useGetProducts } from "@/components/hooks/useGetProducts";
import { useRouter } from "expo-router";
import { SheetManager } from "react-native-actions-sheet";
import Toast from "react-native-toast-message";
import { magicModal } from "react-native-magic-modal";
import { ConfirmDeleteModal } from "@/components/ui/modal/ConfirmDeleteModal";

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
        <Text className="text-red-500 font-bold text-3xl">Error loading products</Text>
      </ScreenWrapper>
    );
  return (
    <ScreenWrapper className="">
      <View className="">
       

      
      </View>
    </ScreenWrapper>
  );
}
