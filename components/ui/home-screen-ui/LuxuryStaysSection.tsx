import { View, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import HotelCard from "@/components/ui/hotel/HotelCard";
import AppText from "@/components/ui/typography/AppText";
import { useLuxuryStays } from "@/components/hooks/hotel-hooks/useLuxuryStays";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";

export default function LuxuryStaysSection() {
    const { push } = useRouter();
    const colorScheme = useColorScheme() ?? "light";
    const colors = Colors[colorScheme];
    const { data, isLoading, isError, error } = useLuxuryStays();

    const handleSeeAll = () => {
      push("/searchScreen?filter=luxury")
    };

      if (isLoading) {
    return (
      <View className="py-8 items-center">
        <ActivityIndicator size="large" color={colors.primary} />
        <AppText className="mt-4 text-text-secondary">Loading luxury stays...</AppText>
      </View>
    );
  }
    if (isError || !data?.length) {
        return (
            <View className="py-8 px-4">
                <AppText className="text-error text-center">
                    Failed to load luxury stays{error?.message ? `: ${error.message}` : ""}
                </AppText>
            </View>
        );
    }
      return (
    <View className="mt-8">
      <View className="flex-row items-center justify-between px-4 mb-4">
        <AppText className="text-xl text-text" variant="bold">
          Luxury Stays
        </AppText>
        <TouchableOpacity onPress={handleSeeAll}>
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
        {data.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel}  />
        ))}
      </ScrollView>
    </View>
  );
  
}