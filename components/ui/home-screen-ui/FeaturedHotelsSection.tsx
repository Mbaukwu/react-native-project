import { View, ScrollView, ActivityIndicator } from 'react-native';
import HotelCard from '@/components/ui/hotel/HotelCard';
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
import { useFeaturedHotels } from '@/components/hooks/hotel-hooks/useFeaturedHotels';
import AppText from '../typography/AppText';

export default function FeaturedHotelsSection() {
    const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { data, isLoading, isError, error } = useFeaturedHotels();

  if (isLoading) {
    return (
      <View className='py-8 items-center'>
        <ActivityIndicator size={'large'} color={colors.primary} />
        <AppText className='mt-4 text-text-secondary'>Loading featured hotels...</AppText>
      </View>
    );
}
if (isError) {
    return (
      <View className="py-8 px-4">
        <AppText className="text-error text-center">
          Failed to load featured hotels{error?.message ? `: ${error.message}` : ''}
        </AppText>
      </View>
    );
  }
if (!data?.length) {
    return  <AppText>No featured hotels available</AppText>
  }
  return (
    <View className='mt-6'>
      <AppText className='text-xl text-text px-4 mb-4' variant='bold'>Featured Hotels</AppText>

      <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}>
        {data.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel}/>
        ))}
      </ScrollView>
    </View>
  )
}