import ScreenWrapper from "@/components/global/ScreenWrapper";
import HomeHeader from "@/components/ui/home-screen-ui/HomeHeader";
import { Text, View } from "react-native";
import {  SafeAreaView } from "react-native-safe-area-context";
import FeaturedHotels from "../../ui/home-screen-ui/FeaturedHotelsSection";
import SpecialDealsSection from "../../ui/home-screen-ui/SpecialDealsSection";

export default function HomeScreenComponent() {
  return (
     <ScreenWrapper className="">
      <HomeHeader />
      <FeaturedHotels />
      <SpecialDealsSection />
    </ScreenWrapper>
   
  );
}
 