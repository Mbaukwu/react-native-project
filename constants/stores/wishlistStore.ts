// ─────────────────────────────────────────────────────────────
// Wishlist Store (Zustand)
// Screen: Global State Management (Favorites / Wishlist)
// Handles: Guest + Cloud wishlist sync, auth merge, toggles
// Depends on: Supabase, guest storage utils, wishlist service utils
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { create } from "zustand";
import { supabase } from "@/constants/supabase/supabase";

import {
  getGuestWishlist,
  toggleGuestWishlist,
  getAndClearGuestWishlist,
} from "./wishlistUtils";

import {
  getCloudWishlist,
  addToCloudWishlist,
  removeFromCloudWishlist,
  batchAddToCloudWishlist,
} from "@/constants/supabase/services/wishlistServiceUtils";

import { IWishlistState } from "@/constants/types-interface/IWishlistState";

// ── Store ───────────────────────────────────────────────────
export const useWishlistStore = create<IWishlistState>((set, get) => ({
  wishlistIds: [],
  userId: null,
  isLoading: true,

  // ── Set User ──────────────────────────────────────────────
  setUserId: (userId) => {
    set({ userId });
    get().loadWishlist();
  },

  // ── Load Wishlist ─────────────────────────────────────────
  loadWishlist: async () => {
    const { userId } = get();
    set({ isLoading: true });

    try {
      if (userId) {
        const ids = await getCloudWishlist(userId);
        set({ wishlistIds: ids });
      } else {
        set({ wishlistIds: getGuestWishlist() });
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // ── Merge Guest Wishlist → Cloud ──────────────────────────
  mergeGuestWishlist: async () => {
    const { userId, loadWishlist } = get();
    const guestIds = getAndClearGuestWishlist();

    if (userId && guestIds.length > 0) {
      await batchAddToCloudWishlist(userId, guestIds);
      await loadWishlist();
    }
  },

  // ── Toggle Wishlist ───────────────────────────────────────
  toggleWishlist: async (hotelId: string) => {
    const { wishlistIds, userId } = get();
    const isCurrentlyToggled = wishlistIds.includes(hotelId);

    // optimistic update
    set({
      wishlistIds: isCurrentlyToggled
        ? wishlistIds.filter((id) => id !== hotelId)
        : [...wishlistIds, hotelId],
    });

    try {
      if (userId) {
        if (isCurrentlyToggled) {
          await removeFromCloudWishlist(userId, hotelId);
        } else {
          await addToCloudWishlist(userId, hotelId);
        }
      } else {
        toggleGuestWishlist(hotelId);
      }
    } catch (error) {
      // revert on failure
      set({ wishlistIds });
      console.error("Toggle failed:", error);
    }
  },

  // ── Helper: Check Wishlist ────────────────────────────────
  isWishlisted: (hotelId: string) => {
    return get().wishlistIds.includes(hotelId);
  },
}));

// ── Auth Listener ───────────────────────────────────────────
supabase.auth.onAuthStateChange((_event, session) => {
  const userId = session?.user.id ?? null;
  const store = useWishlistStore.getState();

  if (userId && !store.userId) {
    store.setUserId(userId);
    store.mergeGuestWishlist();
  } else {
    store.setUserId(userId);
  }
});

// ── Initial Load ────────────────────────────────────────────
supabase.auth.getSession().then(({ data }) => {
  useWishlistStore.getState().setUserId(data.session?.user.id ?? null);
});