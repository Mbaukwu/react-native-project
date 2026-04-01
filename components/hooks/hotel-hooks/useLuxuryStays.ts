import { getLuxuryStays } from "@/constants/supabase/services/serviceEntryFile";
import { HotelCard } from "@/constants/types-interface/hotelTypes";
import { useQuery } from "@tanstack/react-query";

export const useLuxuryStays = () => {
  return useQuery<HotelCard[], Error>({
    queryKey: ["luxury-stays"],
    queryFn: () => getLuxuryStays(10),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
