import { getHotelById } from "@/constants/supabase/services/serviceEntryFile";
import { HotelDetailType } from "@/constants/types-interface/hotelTypes";
import { useQuery } from "@tanstack/react-query";

export const useHotelById = (id: string) => {
  return useQuery<HotelDetailType | null, Error>({
    queryKey: ["hotel", id],
    queryFn: () => getHotelById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
