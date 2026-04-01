import { storage } from "./mmkvStore";

const GUEST_WISHLIST_KEY = "guest_wishlist";

export const getGuestWishlist = (): string[] => {
  const wishlist = storage.getString(GUEST_WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
};

export const addToGuestWishlist = (hotelId: string): void => {
  const current = getGuestWishlist();
  if (!current.includes(hotelId)) {
    const updated = [...current, hotelId];
    storage.set(GUEST_WISHLIST_KEY, JSON.stringify(updated));
  }
};
export const removeFromGuestWishlist = (hotelId: string): void => {
  const current = getGuestWishlist();
  const updated = current.filter((id) => id !== hotelId);
  storage.set(GUEST_WISHLIST_KEY, JSON.stringify(updated));
};

export const toggleGuestWishlist = (hotelId: string): boolean => {
  const current = getGuestWishlist();
  const exists = current.includes(hotelId);
  const updated = exists ? current.filter((id) => id !== hotelId) : [...current, hotelId];
  storage.set(GUEST_WISHLIST_KEY, JSON.stringify(updated));
  return !exists;
};
export const getAndClearGuestWishlist = (): string[] => {
  const guestList = getGuestWishlist();
  storage.remove(GUEST_WISHLIST_KEY);
  return guestList;
};
export const isInWishlist = (hotelId: string): boolean => {
  return getGuestWishlist().includes(hotelId);
};
