import { supabase } from '../supabase';

export const getCloudWishlist = async (userId: string): Promise<string[]> => {
    const { data, error } = await supabase
        .from('wishlists')
        .select('hotel_id')
        .eq('user_id', userId)
    if (error) throw new Error(`Failed to fetch wishlist: ${error.message}`);

  return data?.map(item => item.hotel_id) ?? [];
}

export const addToCloudWishlist = async (userId: string, hotelId: string): Promise<void> => {
  const { error } = await supabase
    .from('wishlists')
    .insert({ user_id: userId, hotel_id: hotelId });

  if (error) throw new Error(`Failed to add to wishlist: ${error.message}`);
};

export const removeFromCloudWishlist = async (userId: string, hotelId: string): Promise<void> => {
    const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', userId)
        .eq('hotel_id', hotelId)
    if(error) throw new Error(`Failed to remove from wishlist: ${error.message}`)
}

export const batchAddToCloudWishlist = async (userId: string, hotelIds: string[]): Promise<void> => {
    if (hotelIds.length === 0) return;

    const items = hotelIds.map(hotelId => ({ user_id: userId, hotel_id: hotelId }));

    const { error } = await supabase
        .from('wishlists')
        .upsert(items, { onConflict: 'user_id, hotel_id' });
    
    if (error) throw new Error(`Failed to sync wishlist: ${error.message}`)
}