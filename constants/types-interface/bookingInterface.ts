
export interface IBooking {
  id?: string;
  user_id: string;
  hotel_id: string;
  room_type: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status?: string;
  special_requests?: string;
  created_at?: string;
}

export interface IBookingDetails extends IBooking {
  id: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  hotels?: {
    name: string;
    city: string;
    image_urls: string[];
  };
}