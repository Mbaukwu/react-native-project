import { useQuery } from "@tanstack/react-query";
import { getBudgetFriendly } from "@/constants/supabase/services/serviceEntryFile";
import { HotelCardType } from "@/constants/types-interface/hotelTypes";

export const useBudgetFriendly = (limit = 10) => {
  return useQuery<HotelCardType[], Error>({
    queryKey: ['budget-friendly'],
    queryFn: async () => {
      const data = await getBudgetFriendly();
      
      const shuffled = [...data];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      return shuffled.slice(0, limit);
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};