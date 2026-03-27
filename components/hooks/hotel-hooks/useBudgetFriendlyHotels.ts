import { useQuery } from "@tanstack/react-query";
import { getBudgetFriendly } from "@/constants/supabase/services/index";
import { HotelCard } from "@/constants/types/hotelTypes";

export const useBudgetFriendly = () => {
  return useQuery<HotelCard[], Error>({
    queryKey: ['budget-friendly'],
    queryFn: () => getBudgetFriendly(10),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};