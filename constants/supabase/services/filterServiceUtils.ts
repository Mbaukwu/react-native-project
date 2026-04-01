import { HotelCardType, HotelDetailType } from "@/constants/types-interface/hotelTypes";
import { CARD_COLUMNS, PaginatedResult } from "../../types-interface/hotelTypes";
import { supabase } from "../supabase";

export const getHotelById = async (id: string): Promise<HotelDetailType | null> => {
  const { data, error } = await supabase.from("hotels").select("*").eq("id", id).maybeSingle();

  if (error) throw new Error(`Failed to fetch hotel ${id}: ${error.message}`);
  return data;
};

export const getHotelsByCity = async (city: string, page = 0, limit = 20): Promise<PaginatedResult<HotelCardType>> => {
  const { data, error, count } = await supabase
    .from("hotels")
    .select(CARD_COLUMNS, { count: "exact" })
    .ilike("city", `%${city}%`)
    .eq("is_available", true)
    .order("rating", { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (error) throw new Error(`Failed to fetch hotels in ${city}: ${error.message}`);

  return {
    data: data ?? [],
    hasMore: (page + 1) * limit < (count ?? 0),
    totalCount: count ?? 0,
  };
};

export const getHotelsByFilter = async (filter: string, value: string, page = 0, limit = 20): Promise<PaginatedResult<HotelCardType>> => {
  let query = supabase.from("hotels").select(CARD_COLUMNS, { count: "exact" }).eq("is_available", true);

  // Apply filter based on type
  switch (filter) {
    case "city":
      query = query.ilike("city", `%${value}%`);
      break;
    case "amenity":
      query = query.contains("amenities", [value]);
      break;
    case "deals":
      query = query.eq("is_deal", true);
      break;
    case "top-rated":
      query = query.gte("rating", 8.0);
      break;
    case "luxury":
      query = query.eq("star_class", 5);
      break;
    case "budget":
      query = query.lt("price_per_night", 35000);
      break;
    default:
      return { data: [], hasMore: false, totalCount: 0 };
  }
  const { data, error, count } = await query.order("rating", { ascending: false }).range(page * limit, (page + 1) * limit - 1);

  if (error) throw new Error(`Failed to fetch filtered hotels: ${error.message}`);
  return {
    data: data ?? [],
    hasMore: (page + 1) * limit < (count ?? 0),
    totalCount: count ?? 0,
  };
};
export const getWishlistHotels = async (ids: string[]): Promise<HotelCardType[]> => {
  if (!ids.length) return [];
  
  const { data, error } = await supabase
    .from('hotels')
    .select(CARD_COLUMNS)
    .in('id', ids);
  
  if (error) throw new Error(`Failed to fetch wishlist hotels: ${error.message}`);
  return data ?? [];
};