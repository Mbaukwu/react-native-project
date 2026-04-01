export interface IWishlistState {
  wishlistIds: string[];
  userId: string | null;
  isLoading: boolean;
  loadWishlist: () => Promise<void>;
  toggleWishlist: (hotelId: string) => Promise<void>;
  isWishlisted: (hotelId: string) => boolean;
  setUserId: (userId: string | null) => void;
  mergeGuestWishlist: () => Promise<void>;
}