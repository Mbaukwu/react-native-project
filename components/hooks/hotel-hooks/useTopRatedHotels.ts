import { getTopRatedHotels } from "@/constants/supabase/services/serviceEntryFile";
import { HotelCard } from "@/constants/types-interface/hotelTypes";
import { useQuery } from "@tanstack/react-query";

export const useTopRatedHotels = () => {
  return useQuery<HotelCard[], Error>({
    queryKey: ["top-rated-hotels"],
    queryFn: () => getTopRatedHotels(10),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
