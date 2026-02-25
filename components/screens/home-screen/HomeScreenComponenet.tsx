import ScreenWrapper from "@/components/global/ScreenWrapper";
import { Text, View } from "react-native";
import {  SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreenComponent() {
  return (
     <ScreenWrapper>
      <View className="h-full justify-center items-center bg-pink-900">
        <Text className="text-5xl text-center text-slate-300 uppercase mb-4 font-roboto-bold font-bold w-full">
          Welcome Home!
        </Text>
        <Text className="text-center text-xl text-white px-6">
          Explore the latest products, find new trends, and enjoy your personalized recommendations.
        </Text>
      </View>
    </ScreenWrapper>
   
  );
}
