export type RoomType = {
    name: string;
    price_per_stay: number;
    capacity: number;
    description: string;
}



 export type HotelDetailType={
    id: string;
    name: string;
    description: string;
    city: string;
    state: string;
    location: string | null;
    address: string | null;
    price_per_stay: number;
    room_types: RoomType[] | null;
    is_available: boolean;
    rating: number | null;
    review_count: number | null;
    review_score_word: string | null;
    star_class: number | null;
    image_urls: string[];
    amenities: string[];
    is_featured: boolean;
    is_deal: boolean;
    contact_phone: string | null;
    email: string | null;
    created_at: string;

 }

 export type HotelCardType = Pick<HotelDetailType, 
  'id' | 'name' | 'city' | 'location' | 'price_per_stay' | 
  'rating' | 'review_count' | 'review_score_word' | 'star_class' | 
  'image_urls' | 'is_deal' | 'is_featured'
   >;

  //  hotel service types
   export const CARD_COLUMNS = 'id, name, city, location, price_per_stay, rating, review_count, review_score_word, star_class, image_urls, is_deal, is_featured';

export type PaginatedResult<T> = {
  data: T[];
  hasMore: boolean;
  totalCount?: number;
};