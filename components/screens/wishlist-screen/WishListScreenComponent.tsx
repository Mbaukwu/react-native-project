import ScreenWrapper from "@/components/global/ScreenWrapper";
import AppText from "@/components/ui/typography/AppText";
import { View, Text, FlatList, Pressable, ActivityIndicator, Image } from "react-native";

export default function WishListScreen() {
  return (
    <ScreenWrapper className="">
      <View className=""><AppText>Wishlist</AppText></View>
    </ScreenWrapper>
  );
}
