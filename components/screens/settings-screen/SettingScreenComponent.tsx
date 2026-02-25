import ScreenWrapper from "@/components/global/ScreenWrapper";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreenComponent() {
  return (
 <ScreenWrapper>
      <View className="flex justify-center items-center bg-pink-900 h-full">
        <Text className="text-5xl text-center text-black font-semibold capitalize mb-4 p-2 font-roboto">Settings screen</Text>
      </View>
      
    </ScreenWrapper>
  );
}
