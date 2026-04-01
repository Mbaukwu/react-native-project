import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/constants/supabase/supabase";

type PopularCity = {
  city: string;
    count: number;
   image?: string; 
};
const cityImages: Record<string, string> = {
  "Lagos": "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800", // Eko Hotel style
  "Abuja": "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800", // Transcorp Hilton style
  "Port Harcourt": "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800", // Hotel Presidential style
  "Calabar": "https://images.pexels.com/photos/258152/pexels-photo-258152.jpeg?auto=compress&cs=tinysrgb&w=800", // Resort style
  "Enugu": "https://images.pexels.com/photos/1617468/pexels-photo-1617468.jpeg?auto=compress&cs=tinysrgb&w=800", // Four Points style
  "Ibadan": "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800", // Premier Hotel style
  "Owerri": "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800", // Rockview style
};
export const usePopularDestinations = () => {
  return useQuery<PopularCity[], Error>({
    queryKey: ['popular-destinations'],          

    queryFn: async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('city')
        .eq('is_available', true)
        .not('city', 'is', null);                 // Exclude null cities

      if (error) throw error;

      // Group by city and count hotels
      const cityMap: Record<string, number> = {};

      data.forEach((row) => {
        const city = row.city.trim();
        cityMap[city] = (cityMap[city] || 0) + 1;
      });

      // Convert to array and sort by count (most hotels first)
      return Object.entries(cityMap)
        .map(([city, count]) => ({ city, count, image: cityImages[city] || cityImages.Lagos }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8); // Top 8 cities
    },

    staleTime: 10 * 60 * 1000,   // Cache for 10 minutes 
    retry: 2,
  
  });
};