import ScreenWrapper from "@/components/global/ScreenWrapper";
import HomeHeader from "@/components/ui/home-screen-ui/HomeHeader";
import { Text, View } from "react-native";
import {  SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreenComponent() {
  return (
     <ScreenWrapper className="">
    <HomeHeader/>
    </ScreenWrapper>
   
  );
}
 