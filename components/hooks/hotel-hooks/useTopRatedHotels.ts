import { useQuery } from "@tanstack/react-query";
import { getTopRatedHotels } from "@/constants/supabase/services/hotelServiceUtils";
import { HotelCard } from "@/constants/types/hotelTypes";


export const useTopRatedHotels = () => {
  return useQuery<HotelCard[], Error>({
   queryKey: ['top-rated-hotels'],
    queryFn: () => getTopRatedHotels(10),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};