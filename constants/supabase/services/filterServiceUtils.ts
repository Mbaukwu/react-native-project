import { supabase } from "../supabase";
import { HotelCard } from "@/constants/types/hotelTypes";
import { CARD_COLUMNS, PaginatedResult } from "../../types/hotelTypes";





export const getHotelsByCity = async (
    city: string,
    page = 0,
    limit = 20): Promise<PaginatedResult<HotelCard>> => {
    const { data, error, count } = await supabase
        .from('hotels')
        .select(CARD_COLUMNS, { count: 'exact' })
        .ilike('city', `%${city}%`)
        .eq('is_available', true)
        .order('rating', { ascending: false })
        .range(page * limit, (page + 1) * limit - 1);
    
     if (error) throw new Error(`Failed to fetch hotels in ${city}: ${error.message}`)
    
  return {
    data: data ?? [],
    hasMore: (page + 1) * limit < (count ?? 0),
    totalCount: count ?? 0,
  };
}

export const getHotelsByFilter= async ( filter: string,
  value: string,
  page = 0,
  limit = 20): Promise<PaginatedResult<HotelCard>> => {
  let query = supabase
    .from('hotels')
    .select(CARD_COLUMNS, { count: 'exact' })
    .eq('is_available', true);
  
  // Apply filter based on type
  switch (filter) {
    case 'city':
      query = query.ilike('city', `%${value}%`)
      break;
    case 'amenity':
      query = query.contains('amenities', [value]);
      break;
    case 'deals':
      query = query.eq('is_deal', true);
      break;
    case 'top-rated':
      query = query.gte('rating', 8.0)
      break;
    case 'luxury':
      query = query.eq('star_class', 5)
      break;
    case 'budget':
      query = query.lt('price_per_night', 35000)
    default:
      break;
  }
  const { data, error, count } = await query
    .order('rating', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);
  
  if (error) throw new Error(`Failed to fetch filtered hotels: ${error.message}`)
  return {
    data: data ?? [],
    hasMore: (page + 1) * limit < (count ?? 0),
    totalCount: count ?? 0,
  };
  }