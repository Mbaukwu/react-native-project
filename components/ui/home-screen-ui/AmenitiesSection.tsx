import { View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AppText from "@/components/ui/typography/AppText";
import { useAmenities } from "@/components/hooks/hotel-hooks/useHotelAmenities";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";
import DestinationSkeleton from "../skeletons-ui/DestinationSkeleton";

export default function AmenitiesSection() {
  const { push } = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { data: amenities, isLoading, isError } = useAmenities();

  const handleAmenityPress = (amenity: string) => {
     push({
    pathname: "/searchScreen",
    params: { amenity }
  });
  };

  if (isLoading) {
    return (
     <View className="mt-8">
             <SectionHeaderSkeleton />
             <DestinationSkeleton />
           </View>
    );
  }

  if (isError || !amenities?.length) {
    return null;
  }

  return (
    <View className="mt-8">
      <View className="flex-row items-center justify-between px-4 mb-4">
        <AppText variant="bold" className="text-xl text-text">
          Browse by Amenities
        </AppText>
        <TouchableOpacity>
          <AppText className="text-primary text-sm" variant="medium">
            See all →
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {amenities.map((item) => (
          <TouchableOpacity
            key={item.amenity}
            onPress={() => handleAmenityPress(item.amenity)}
            className="mr-4 w-44 rounded-2xl overflow-hidden"
            activeOpacity={0.85}
          >
            <Image
              source={{ uri: item.image }}
              className="w-44 h-56"
              resizeMode="cover"
            />

            <View className="absolute bottom-0 left-0 right-0 h-full bg-black/60" />

            <View className="absolute bottom-4 left-4">
              <AppText className="text-white text-lg font-dm-sans-bold" numberOfLines={1}>
                {item.amenity}
              </AppText>
              <AppText className="text-white/80 text-xs">
                {item.count} hotels
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}