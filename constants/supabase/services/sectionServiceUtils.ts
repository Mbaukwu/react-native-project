import { supabase } from "../supabase";
import { HotelCard, CARD_COLUMNS } from "@/constants/types/hotelTypes";



// all hotels service utility functions
export const getFeaturedHotels = async (): Promise<HotelCard[]> => {
    const { data, error } = await supabase
        .from('hotels')
        .select(CARD_COLUMNS)
        .eq('is_featured', true)
        .eq('is_available', true)
        .order('rating', { ascending: false })

    if (error) throw new Error(`Failed to fetch featured hotels: ${error.message}`)
    return data ?? [];
}


export const getSpecialDealsHotels = async (): Promise<HotelCard[]> => {
    const { data, error } = await supabase
        .from('hotels')
        .select(CARD_COLUMNS)
        .eq('is_deal', true)
        .eq('is_available', true)
        .order('rating', { ascending: false });

     if (error) throw new Error(`Failed to fetch special deals: ${error.message}`)
    return data ?? [];
}


export const getTopRatedHotels = async (limit = 10): Promise<HotelCard[]> => {
  const { data, error } = await supabase
    .from('hotels')
    .select(CARD_COLUMNS)
    .eq('is_available', true)
    .gte('rating', 8.0)
    .order('rating', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch top rated hotels: ${error.message}`);
  return data ?? [];
};

export const getLuxuryStays= async (limit = 10): Promise<HotelCard[]> => {
  const { data, error } = await supabase
    .from('hotels')
    .select(CARD_COLUMNS)
    .eq('is_available', true)
    .eq('star_class', 5)
    .order('price_per_night', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch luxury stays: ${error.message}`);
  return data ?? [];
};


export const getBudgetFriendly = async (limit = 10): Promise<HotelCard[]> => {
  const { data, error } = await supabase
    .from('hotels')
    .select(CARD_COLUMNS)
    .eq('is_available', true)
    .lt('price_per_night', 40000)
    .order('rating', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch budget friendly hotels: ${error.message}`);
  return data ?? [];
};
export const getHotelByAmenities = async (): Promise<string[]> => {
  const { data, error } = await supabase
    .from('hotels')
    .select('amenities')
    .eq('is_available', true)
    .not('amenities', 'is', null);

  if (error) throw new Error(`Failed to fetch amenities: ${error.message}`);
  
 
  return data?.flatMap(hotel => hotel.amenities) ?? [];
};
