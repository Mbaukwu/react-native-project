import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/constants/supabase/supabase";

type PopularCity = {
  city: string;
    count: number;
   image?: string; 
};
const cityImages: Record<string, string> = {
  "Lagos": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "Abuja": "https://images.unsplash.com/photo-1580130718646-9f694209b207?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "Port Harcourt": "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "Calabar": "https://images.unsplash.com/photo-1551884831-bbf0e3b4a4d4?w=800",
  "Enugu": "https://images.unsplash.com/photo-1589391886645-9d1f1e6c4d6a?w=800",
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