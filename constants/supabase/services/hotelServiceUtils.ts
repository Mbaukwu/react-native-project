 import { supabase } from "../supabase";
import { HotelType , HotelCard} from "@/constants/types/hotelTypes";
 

const CARD_COLUMNS = 'id, name, city, location, price_per_night, rating, review_count, review_score_word, star_class, image_urls, is_deal, is_featured'


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
export const getAllHotels= async (page=0,limit=20): Promise<HotelCard[]> => {
    const { data, error } = await supabase
        .from('hotels')
        .select(CARD_COLUMNS)
        .eq('is_available', true)
        .order('rating', { ascending: false })
        .range(page  * limit, (page +1 ) * limit - 1
    );
    
     if (error) throw new Error(`Failed to fetch all hotels: ${error.message}`)
    return data ?? [];
}
export const getHotelsByCity = async (
    city: string,
    page = 0,
    limit = 20): Promise<HotelCard[]> => {
    const { data, error } = await supabase
        .from('hotels')
        .select(CARD_COLUMNS)
        .ilike('city', `%${city}%`)
        .eq('is_available', true)
        .order('rating', { ascending: false })
        .range(page * limit, (page + 1) * limit - 1);
    
     if (error) throw new Error(`Failed to fetch hotels in ${city}: ${error.message}`)
    return data ?? [];
}
export const getHotelsById= async (id: string): Promise<HotelType | null> => {
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
    limit = 20): Promise<HotelCard[]> => {
    if (!query.trim()) return []; 

    const { data, error } = await supabase
        .from('hotels')
        .select(CARD_COLUMNS)
        .or(`name.ilike.%${query}%,city.ilike.%${query}%,state.ilike.%${query}%,location.ilike.%${query}%`)
        .eq('is_available', true)
        .order('rating', { ascending: false })
        .range(page * limit, (page + 1) * limit - 1);
    
     if (error) throw new Error(`Search failed for "${query}": ${error.message}`)
    return data ?? [];
}