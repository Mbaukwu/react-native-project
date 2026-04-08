import { useQuery } from '@tanstack/react-query';
import { getUserBookings } from '@/constants/supabase/services/bookingService';
import { IBookingDetails } from '@/constants/types-interface/bookingInterface';

export const useUserBookings = (userId: string | null) => {
  return useQuery<IBookingDetails[]>({
    queryKey: ['user-bookings', userId],
    queryFn: () => getUserBookings(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};