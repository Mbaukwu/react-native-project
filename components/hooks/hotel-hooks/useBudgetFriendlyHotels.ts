import { getBudgetFriendly } from "@/constants/supabase/services/serviceEntryFile";
import { HotelCard } from "@/constants/types-interface/hotelTypes";
import { useQuery } from "@tanstack/react-query";

export const useBudgetFriendly = () => {
  return useQuery<HotelCard[], Error>({
    queryKey: ["budget-friendly"],
    queryFn: () => getBudgetFriendly(10),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
