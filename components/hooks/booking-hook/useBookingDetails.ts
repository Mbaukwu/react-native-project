import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/constants/supabase/supabase';
import { IBookingDetails } from '@/constants/types-interface/bookingInterface';

export const useBookingDetails = (bookingId: string | null) => {
  return useQuery<IBookingDetails>({
    queryKey: ['booking-detail', bookingId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*, hotels(name, city, image_urls, address)')
        .eq('id', bookingId)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!bookingId,
    staleTime: 5 * 60 * 1000,
  });
};