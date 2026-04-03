import ScreenWrapper from "@/components/global/ScreenWrapper";
import HomeHeader from "@/components/ui/home-screen-ui/HomeHeader";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeaturedHotels from "../../ui/home-screen-ui/FeaturedHotelsSection";
import SpecialDealsSection from "../../ui/home-screen-ui/SpecialDealsSection";
import PopularDestinations from "@/components/ui/home-screen-ui/PopularDestinationSection";
import TopRatedHotels from "@/components/ui/home-screen-ui/TopRatedHotelsSection";
import LuxuryStays from "@/components/ui/home-screen-ui/LuxuryStaysSection";
import BudgetFriendlySection from '@/components/ui/home-screen-ui/BudgetFriendlySection';
import AmenitiesSection from "@/components/ui/home-screen-ui/AmenitiesSection";
import Footer from "@/components/ui/home-screen-ui/Footer";
import { ScrollView } from "react-native-actions-sheet";


export default function HomeScreenComponent() {
  return (
    <ScreenWrapper className="" scrollable={false}>
      <HomeHeader />
      <ScrollView className="flex-1 ">
      <PopularDestinations />
      <SpecialDealsSection />
      <FeaturedHotels />
      <TopRatedHotels />
       <AmenitiesSection />
      <LuxuryStays />
      <BudgetFriendlySection />
       
        </ScrollView>
    </ScreenWrapper>
  );
}
