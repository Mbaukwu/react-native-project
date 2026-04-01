import ScreenWrapper from "@/components/global/ScreenWrapper";
import AppText from "@/components/ui/typography/AppText";
import { Text, View } from "react-native";
import {  SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreenComponent() {
  return (
    <ScreenWrapper>
      
      <View><AppText className="text-white text-center flex-1">Profile</AppText></View>
      
    </ScreenWrapper>
  );
}
