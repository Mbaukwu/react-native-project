import { useLuxuryStays } from "@/components/hooks/hotel-hooks/useLuxuryStays";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import HotelCard from "@/components/ui/hotelCards/HotelCard";
import AppText from "@/components/ui/typography/AppText";
import { Colors } from "@/constants/colorTheme/colors";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import HotelCardSkeleton from "../skeletons-ui/HotelCardSkeleton";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";
import { IconSymbol } from "../icon-symbol";

export default function LuxuryStaysSection() {
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { data, isLoading, isError, error } = useLuxuryStays();

  const handleSeeAll = () => {
    push("/searchScreen?filter=luxury");
  };

  if (isLoading) {
    return (
      <View className="mt-2">
        <SectionHeaderSkeleton />
        <HotelCardSkeleton />
      </View>
    );
  }
  if (isError || !data?.length) {
    return (
      <View className="py-8 px-4">
        <AppText className="text-error text-center">Failed to load luxury stays{error?.message ? `: ${error.message}` : ""}</AppText>
      </View>
    );
  }
  return (
     <View className="mt-8">
  <View className="flex-row items-center justify-between px-4 mb-4">
    <View className="flex-row items-center gap-2">
      <IconSymbol name="sparkles" size={15} color={colors.success} />
      <AppText className="text-xl text-text" variant="bold">
        Luxury Stays
      </AppText>
    </View>
    <TouchableOpacity onPress={handleSeeAll}>
      <AppText className="text-primary text-sm" variant="medium">
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
