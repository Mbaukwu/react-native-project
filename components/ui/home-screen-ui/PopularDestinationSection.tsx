import { View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AppText from '@/components/ui/typography/AppText';
import { usePopularDestinations } from '@/components/hooks/hotel-hooks/usePopularDestination';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
import SectionHeaderSkeleton from '../skeletons-ui/SectionHeaderSkeleton';
import DestinationSkeleton from '../skeletons-ui/DestinationSkeleton';


// Map cities to nice images (you can expand this)

export default function PopularDestinations() {
    const { push } = useRouter();
     const colorScheme = useColorScheme() ?? 'light';
      const colors = Colors[colorScheme];

  const { data: cities, isLoading, isError } = usePopularDestinations()

  const handleCityPress = (city: string) => {
    push({
      pathname: "/searchScreen",
      params: { city },
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

  if (isError || !cities || cities.length === 0) {
    return null;
  }

  return (
    <View className="mt-8">
      <View className="flex-row items-center justify-between px-4 mb-4">
        <AppText variant="bold" className="text-xl  text-text">
          Popular Destinations
        </AppText>
        <TouchableOpacity>
          <AppText className="text-primary text-sm " variant="medium">
            See all →
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {cities.map((dest) => (
          <TouchableOpacity
            key={dest.city}
            onPress={() => handleCityPress(dest.city)}
            className="mr-4 w-44 rounded-2xl overflow-hidden relative shadow-md"
            activeOpacity={0.85}
          >
            <Image
              source={{ uri: dest.image }}
              className="w-44 h-56"
              resizeMode="cover"
            />

            {/* Gradient overlay */}
            <View className="absolute bottom-0 left-0 right-0 h-full bg-black/60 " />

            {/* City Name + Count */}
            <View className="absolute bottom-4 left-4">
              <AppText className="text-white text-lg font-dm-sans-bold">
                {dest.city}
              </AppText>
              <AppText className="text-white/80 text-xs">
                {dest.count} hotels
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}