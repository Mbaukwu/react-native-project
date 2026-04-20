// ─────────────────────────────────────────────────────────────
// Guest Wishlist Utilities
// Screen: Local Storage (Guest Mode Wishlist Handling)
// Handles: MMKV persistence for unauthenticated users
// Depends on: mmkv storage
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { storage } from "./mmkvStore";

// ── Constants ───────────────────────────────────────────────
const GUEST_WISHLIST_KEY = "guest_wishlist";

// ── Get Guest Wishlist ──────────────────────────────────────
export const getGuestWishlist = (): string[] => {
  const wishlist = storage.getString(GUEST_WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
};

// ── Add To Guest Wishlist ───────────────────────────────────
export const addToGuestWishlist = (hotelId: string): void => {
  const current = getGuestWishlist();

  if (!current.includes(hotelId)) {
    const updated = [...current, hotelId];
    storage.set(GUEST_WISHLIST_KEY, JSON.stringify(updated));
  }
};

// ── Remove From Guest Wishlist ──────────────────────────────
export const removeFromGuestWishlist = (hotelId: string): void => {
  const current = getGuestWishlist();
  const updated = current.filter((id) => id !== hotelId);
  storage.set(GUEST_WISHLIST_KEY, JSON.stringify(updated));
};

// ── Toggle Guest Wishlist ───────────────────────────────────
export const toggleGuestWishlist = (hotelId: string): boolean => {
  const current = getGuestWishlist();
  const exists = current.includes(hotelId);

  const updated = exists
    ? current.filter((id) => id !== hotelId)
    : [...current, hotelId];

  storage.set(GUEST_WISHLIST_KEY, JSON.stringify(updated));

  return !exists;
};

// ── Clear + Return Guest Wishlist ───────────────────────────
export const getAndClearGuestWishlist = (): string[] => {
  const guestList = getGuestWishlist();
  storage.remove(GUEST_WISHLIST_KEY);
  return guestList;
};

// ── Check If In Wishlist ────────────────────────────────────
export const isInWishlist = (hotelId: string): boolean => {
  return getGuestWishlist().includes(hotelId);
};