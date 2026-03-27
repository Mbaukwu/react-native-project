import { useQuery } from "@tanstack/react-query";
import { getLuxuryStays } from "@/constants/supabase/services/index";
import { HotelCard } from "@/constants/types/hotelTypes";

export const useLuxuryStays = () => {
  return useQuery<HotelCard[], Error>({
    queryKey: ['luxury-stays'],
    queryFn: () => getLuxuryStays(10),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};