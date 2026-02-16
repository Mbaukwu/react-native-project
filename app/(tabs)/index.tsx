
import {  Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 justify-center items-center bg-amber-900"  >
        <Text className="text-5xl text-center text-black: dark:text-white font-semibold capitalize mb-4">
          Home screen
        </Text>
      </SafeAreaView>
 </SafeAreaProvider>
  );
}



