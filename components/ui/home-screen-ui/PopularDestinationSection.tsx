import { usePopularDestinations } from "@/components/hooks/hotel-hooks/usePopularDestination";
import { useColorScheme } from "@/components/hooks/use-color-scheme.web";
import FeatureCard from "@/components/ui/hotel/hotelCards/FeatureCard";
import AppText from "@/components/ui/typography/AppText";
import { Colors } from "@/constants/colorTheme/colors";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { IconSymbol } from "../icon-symbol";
import DestinationSkeleton from "../skeletons-ui/DestinationSkeleton";
import SectionHeaderSkeleton from "../skeletons-ui/SectionHeaderSkeleton";

export default function PopularDestinations() {
  const { push } = useRouter();
  const { data: cities, isLoading, isError } = usePopularDestinations();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  if (isLoading) {
    return (
      <View className="mt-2">
        <SectionHeaderSkeleton />
        <DestinationSkeleton />
      </View>
    );
  }

  if (isError || !cities || cities.length === 0) return null;

  return (
    <View className="mt-8">
      <View className="flex-row items-center px-4 mb-4">
        <IconSymbol name="airplane" size={15} color={colors.success} />
        <AppText variant="bold" className="text-xl text-text ml-2">
          Popular Destinations
        </AppText>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {cities.map((dest) => (
          <FeatureCard
            key={dest.city}
            title={dest.city}
            subtitle={`${dest.count} hotels`}
            imageUrl={dest.image}
            onPress={() => push({ pathname: "/searchScreen", params: { city: dest.city } })}
          />
        ))}
      </ScrollView>
    </View>
  );
}
