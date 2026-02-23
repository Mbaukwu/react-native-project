import ScreenWrapper from "@/components/global/ScreenWrapper";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreenComponent() {
  return (
   
      <ScreenWrapper>
      <View className="flex justify-center items-center bg-sky-900 h-full">
        <Text className="text-5xl text-center text-black font-semibold capitalize mb-4 font-playwrite p-4">Explore screen</Text>
      </View>
      </ScreenWrapper>
   
    
  );
}