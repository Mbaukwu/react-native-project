import { useSpecialDealsHotels } from "@/components/hooks/hotel-hooks/useSpecialDealsHotels";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import HotelCard from "@/components/ui/hotelCards/HotelCard";
import { Colors } from "@/constants/colorTheme/colors";
import { ScrollView, TouchableOpacity, View } from "react-native";

import AppText from "@/components/ui/typography/AppText";
import { useRouter } from "expo-router";
import HotelCardSkeleton from "../skeletons-ui/HotelCardSkeleton";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";
import { IconSymbol } from "../icon-symbol";

export default function SpecialDealsSection() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { push } = useRouter();
  const { data, isLoading, isError, error } = useSpecialDealsHotels();

  const handleSeeAll = () => {
    // Navigate to full deals/search screen
    push("/searchScreen?filter=deals");
  };

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
        <AppText className="text-error text-center">Failed to load special deals{error?.message ? `: ${error.message}` : ""}</AppText>
      </View>
    );
  }

  if (!data?.length) {
    return <AppText>No special deals right now</AppText>;
  }
  return (
    <View className="mt-8">
      <View className="flex-row items-center justify-between px-4 mb-4">
        
        <AppText className="text-xl text-text" variant="bold">
         🔥  Special Deals 
        </AppText>
        <TouchableOpacity onPress={handleSeeAll}>
          <AppText className="text-primary text-sm " variant="medium">
            See all →
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {data.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </ScrollView>
    </View>
  );
}
