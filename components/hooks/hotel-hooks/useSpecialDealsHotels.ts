import { getSpecialDealsHotels } from "@/constants/supabase/services/serviceEntryFile";
import { HotelCard } from "@/constants/types-interface/hotelTypes";
import { useQuery } from "@tanstack/react-query";

export const useSpecialDealsHotels = () => {
  return useQuery<HotelCard[], Error>({
    queryKey: ["special-deals-hotels"],
    queryFn: getSpecialDealsHotels,
    //duration of keeping data before refreshing
    staleTime: 5 * 60 * 1000,
    // Retry failed requests 2 times
    retry: 2,
    // Return empty array if no data (prevents undefined crashes)
    select: (data) => data ?? [],
  });
};
