import ScreenWrapper from "@/components/global/ScreenWrapper";
import HomeHeader from "@/components/ui/home-screen-ui/HomeHeader";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeaturedHotels from "../../ui/home-screen-ui/FeaturedHotelsSection";
import SpecialDealsSection from "../../ui/home-screen-ui/SpecialDealsSection";
import PopularDestinations from "@/components/ui/home-screen-ui/PopularDestinationSection";
import TopRatedHotels from "@/components/ui/home-screen-ui/TopRatedHotelsSection";
import LuxuryStays from "@/components/ui/home-screen-ui/LuxuryStays";

export default function ExploreScreenComponent() {
  return (
    <ScreenWrapper className="" scrollable>
      <HomeHeader />
      <PopularDestinations />
      <SpecialDealsSection />
      <FeaturedHotels />
      <TopRatedHotels />
      <LuxuryStays />
    </ScreenWrapper>
  );
}
