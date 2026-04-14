import { View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AppText from "@/components/ui/typography/AppText";
import { useAmenities } from "@/components/hooks/hotel-hooks/useHotelAmenities";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";
import FeatureCardSkeleton from "../skeletons-ui/DestinationSkeleton";
import FeatureCard from "../hotelCards/FeatureCard";
import { IconSymbol } from "../icon-symbol";

export default function AmenitiesSection() {
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { data: amenities, isLoading, isError } = useAmenities();

  // const handleAmenityPress = (amenity: string) => {
  //   push({
  //     pathname: "/searchScreen",
  //     params: { amenity },
  //   });
  // };

  if (isLoading) {
    return (
      <View className="mt-2">
        <SectionHeaderSkeleton />
        <FeatureCardSkeleton />
      </View>
    );
  }

  if (isError || !amenities?.length) {
    return null;
  }

  return (
    <View className="mt-8">
  <View className="flex-row items-center justify-between px-4 mb-4">
    <View className="flex-row items-center gap-2">
      <IconSymbol name="spa.fill" size={15} color={colors.favorite} />
      <AppText variant="bold" className="text-xl text-text">
        Browse by Amenities
      </AppText>
    </View>
  </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {amenities.map((item) => (
          <FeatureCard
            key={item.amenity}
            title={item.amenity}
            subtitle={`${item.count} hotels`}
            imageUrl={item.image}
            onPress={() => push({ pathname: "/searchScreen", params: { amenity: item.amenity } })}
          />
        ))}
      </ScrollView>
    </View>
  );
}
