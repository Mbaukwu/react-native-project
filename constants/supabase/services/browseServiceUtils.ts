import { supabase } from "../supabase";
import { HotelCard, HotelType } from "@/constants/types/hotelTypes";
import { CARD_COLUMNS, PaginatedResult } from "../../types/hotelTypes";


export const getAllHotels= async (page=0,limit=20): Promise<PaginatedResult<HotelCard>> => {
    const { data, error, count } = await supabase
        .from('hotels')
        .select(CARD_COLUMNS,{ count: 'exact' })
        .eq('is_available', true)
        .order('rating', { ascending: false })
        .range(page  * limit, (page +1 ) * limit - 1
    );
    
     if (error) throw new Error(`Failed to fetch all hotels: ${error.message}`)
    return {
       data: data ?? [],
        hasMore: (page + 1) * limit < (count ?? 0),
    totalCount: count ?? 0,}
}

export const getHotelById= async (id: string): Promise<HotelType | null> => {
    const { data, error } = await supabase
        .from('hotels')
        .select('*')
        .eq('id', id)
        .maybeSingle()
    
     if (error) throw new Error(`Failed to fetch hotel ${id}: ${error.message}`)
    return data;
}

export const searchHotels = async (
    query: string,
    page = 0,
    limit = 20): Promise<PaginatedResult<HotelCard>> => {
  if (!query.trim()) return { data: [], hasMore: false };

      const { data, error, count } = await supabase
        .from('hotels')
        .select(CARD_COLUMNS, { count: 'exact' })
        .or(`name.ilike.%${query}%,city.ilike.%${query}%,state.ilike.%${query}%,location.ilike.%${query}%`)
        .eq('is_available', true)
        .order('rating', { ascending: false })
        .range(page * limit, (page + 1) * limit - 1);
    
     if (error) throw new Error(`Search failed for "${query}": ${error.message}`)
     return {
    data: data ?? [],
    hasMore: (page + 1) * limit < (count ?? 0),
    totalCount: count ?? 0,
  };
}
