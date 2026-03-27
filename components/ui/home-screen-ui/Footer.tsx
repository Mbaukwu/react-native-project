import { View } from "react-native";
import AppText from "@/components/ui/typography/AppText";

export default function Footer() {
  return (
    <View className="py-6 items-center">
      <AppText className="text-text-disabled text-xs">
          StayEasy • Book with confidence
      </AppText>
      
      <View className="flex-row items-center mt-2">
        <AppText className="text-text-disabled text-xs">
          Crafted with 
        </AppText>
        <AppText className="text-primary text-xs mx-0.5">❤️</AppText>
        <AppText className="text-text-disabled text-xs">
          by Mbakwu
        </AppText>
      </View>
    </View>
  );
}