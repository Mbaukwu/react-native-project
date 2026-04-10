import { supabase } from '../supabase';
import { IBooking, IBookingDetails } from '@/constants/types-interface/bookingInterface';

export const createBooking = async (booking: IBooking): Promise<IBookingDetails> => {
  const { data, error } = await supabase
    .from('bookings')
    .insert({ ...booking, status: 'confirmed' })
    .select()
    .single();

  if (error) throw new Error(`Failed to create booking: ${error.message}`);
  return data;
};

export const getUserBookings = async (userId: string): Promise<IBookingDetails[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, hotels(name, city, image_urls, address)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch bookings: ${error.message}`);
  return data ?? [];
};

export const cancelBooking = async (bookingId: string): Promise<void> => {
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId);

  if (error) throw new Error(`Failed to cancel booking: ${error.message}`);
};

export const deleteBooking = async (bookingId: string): Promise<void> => {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);
  if (error) throw new Error(error.message);
};