import { SectionList, View } from "react-native";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import HomeHeader from "@/components/ui/home-screen-ui/HomeHeader";
import PopularDestinations from "@/components/ui/home-screen-ui/PopularDestinationSection";
import SpecialDealsSection from "@/components/ui/home-screen-ui/SpecialDealsSection";
import FeaturedHotels from "@/components/ui/home-screen-ui/FeaturedHotelsSection";
import TopRatedHotels from "@/components/ui/home-screen-ui/TopRatedHotelsSection";
import AmenitiesSection from "@/components/ui/home-screen-ui/AmenitiesSection";
import LuxuryStays from "@/components/ui/home-screen-ui/LuxuryStaysSection";
import BudgetFriendlySection from "@/components/ui/home-screen-ui/BudgetFriendlySection";


type SectionItem = {
  key: string
}
type Section = {
  id: string;
  data: SectionItem[];
}

const SECTIONS: Section[] = [
  { id: "destinations", data: [{ key: "destinations" }] },
  { id: "deals", data: [{ key: "deals" }] },
  { id: "featured", data: [{ key: "featured" }] },
  { id: "topRated", data: [{ key: "topRated" }] },
  { id: "amenities", data: [{ key: "amenities" }] },
  { id: "luxury", data: [{ key: "luxury" }] },
  { id: "budget", data: [{ key: "budget" }] },
];

const renderSection = (id:string) => {
  switch (id) {
    case "destinations":
      return <PopularDestinations />;
    case "deals":
      return <SpecialDealsSection />;
    case "featured":
      return <FeaturedHotels />;
    case "topRated":
      return <TopRatedHotels />;
    case "amenities":
      return <AmenitiesSection />;
    case "luxury":
      return <LuxuryStays />;
    case "budget":
      return <BudgetFriendlySection />;
    default:
      return null;
  }
}
export default function HomeScreenComponent() {
  return (
    <ScreenWrapper >
       <View className="flex-1">
        {/* Sticky Header */}
        <View className="bg-background">
          <HomeHeader />
        </View>

      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.key}
        renderItem={({ section }) => renderSection(section.id)}
        renderSectionHeader={() => null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, gap: 2 }}
        stickySectionHeadersEnabled={false}
        />
      </View>
      
    </ScreenWrapper>
  );
}
