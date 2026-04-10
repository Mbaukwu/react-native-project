import { useFeaturedHotels } from "@/components/hooks/hotel-hooks/useFeaturedHotels";
import { useColorScheme } from "@/components/hooks/use-color-scheme";

import HotelCard from "@/components/ui/hotelCards/HotelCard";
import { Colors } from "@/constants/colorTheme/colors";
import { ScrollView, View } from "react-native";
import HotelCardSkeleton from "../skeletons-ui/HotelCardSkeleton";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";
import AppText from "../typography/AppText";

export default function FeaturedHotelsSection() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { data, isLoading, isError, error } = useFeaturedHotels();
 

  if (isLoading) {
    return (
      <View className="mt-2">
        <SectionHeaderSkeleton />
        <HotelCardSkeleton />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="py-8 px-4">
        <AppText className="text-error text-center">Failed to load featured hotels{error?.message ? `: ${error.message}` : ""}</AppText>
      </View>
    );
  }
  if (!data?.length) {
    return <AppText>No featured hotels available</AppText>;
  }
  return (
    <View className="mt-6">
      <AppText className="text-xl text-text px-4 mb-4" variant="bold">
        Featured Hotels
      </AppText>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {data.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </ScrollView>
    </View>
  );
}
