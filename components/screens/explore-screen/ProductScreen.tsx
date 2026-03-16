// import { View, Text, FlatList, Pressable, ActivityIndicator, Image } from "react-native";
// import { useFavoritesStore } from "@/constants/stores/useFavoriteStore";
// import ScreenWrapper from "@/components/global/ScreenWrapper";
// import { IconSymbol } from "@/components/ui/icon-symbol";
// import { useGetProducts } from "@/components/hooks/useGetProducts";
// import { useRouter } from "expo-router";
// import { SheetManager } from "react-native-actions-sheet";
// import Toast from "react-native-toast-message";
// import { magicModal } from "react-native-magic-modal";
// import { ConfirmDeleteModal } from "@/components/ui/modal/ConfirmDeleteModal";

// export default function ProductScreen() {
//   const { toggleFavorite, favorites } = useFavoritesStore();
//   const { data, isLoading, error } = useGetProducts();
//   const { push, back } = useRouter();


  

//   if (isLoading)
//     return (
//       <View className="flex-1 justify-center items-center">
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   if (error)
//     return (
//       <ScreenWrapper className="justify-center items-center">
//         <Text className="text-red-500 font-bold text-3xl">Error loading products</Text>
//       </ScreenWrapper>
//     );
//   return (
//     <ScreenWrapper>
//       <View className="px-4 bg-pink-900 font-roboto pt-4">
//         <View className="flex-row items-center gap-x-2">
//           <Pressable onPress={() => back()}>
//             <IconSymbol name="chevron.left" size={28} color={"#fff"} />
//           </Pressable>
//           <Text className="text-3xl font-roboto-bold m-4 text-white uppercase font-bold">Product List ({favorites.length} favorites)</Text>
//         </View>

//         <FlatList
//           data={data}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => {
//             const isFavorite = favorites.includes(item.id);

//             return (
//               // <Pressable
//               //   onPress={() =>
//               //     push({
//               //       pathname: "/products/[id]",
//               //       params: { id: item.id },
//               //     })
//               //   }
//               // >
//                 <View className="bg-pink-100 p-4 mb-3 rounded-lg flex-row justify-between items-center">
//                   <Image source={{ uri: item.image }} className="w-20 h-20 rounded-lg mr-3" resizeMode="contain" />
//                   <View className="flex-1">
//                     <Text className="font-bold text-lg">{item.title}</Text>
//                     <Text className="text-gray-600 mt-1">${item.price}</Text>
//                   </View>

//                   <Pressable
//                     onPress={(e) => {
//                       e.stopPropagation();

//                       if (isFavorite) {
//                         magicModal.show(() => (
//                           <ConfirmDeleteModal
//                             productTitle={item.title}
//                             onConfirm={() => {
//                               toggleFavorite(item.id);
//                               Toast.show({
//                                 type: "error",
//                                 text1: "Removed from Favorites",
//                                 text2: item.title,
//                                 visibilityTime: 2000,
//                               });
//                             }}
//                           />
//                         ));
//                       } else {
//                         toggleFavorite(item.id);
//                         Toast.show({
//                           type: "success",
//                           text1: "Added to Favorites",
//                           text2: item.title,
//                           visibilityTime: 2000,
//                         });
//                       }
//                     }}
//                   >
//                     <Text className="text-2xl">{isFavorite ? "❤️" : "🤍"}</Text>
//                   </Pressable>

//                   <Pressable
//                     onPress={(e) => {
//                       e.stopPropagation();

//                       SheetManager.show("product-options-sheet", {
//                         payload: {
//                           productId: item.id,
//                           productTitle: item.title,
//                         },
//                       });
//                     }}
//                     className="ml-7"
//                   >
//                     <Text className="text-3xl font-bold mr-3">⋮</Text>
//                   </Pressable>
//                 </View>
//               </Pressable>
//             );
//           }}
//         />
//       </View>
//     </ScreenWrapper>
//   );
// }
