import { create } from 'zustand';
import { supabase } from '@/constants/supabase/supabase';
import {
  getGuestWishlist,
  toggleGuestWishlist,
  getAndClearGuestWishlist,
} from './wishlistUtils';
import {
  getCloudWishlist,
  addToCloudWishlist,
  removeFromCloudWishlist,
  batchAddToCloudWishlist,
} from '@/constants/supabase/services/wishlistServiceUtils';
import { IWishlistState } from '@/constants/types-interface/IWishlistState';


export const useWishlistStore = create<IWishlistState>((set, get) => ({
    wishlistIds: [],
    userId: null,
    isLoading: true,

    setUserId: (userId) => {
        set({ userId });
        get().loadWishlist();
    },
    
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
      console.error('Failed to load wishlist:', error);
    } finally {
      set({ isLoading: false });
    }
  },
    mergeGuestWishlist: async () => {
        const { userId, loadWishlist } = get();
        const guestIds = getAndClearGuestWishlist();
        if (userId && guestIds.length > 0) {
            await batchAddToCloudWishlist(userId, guestIds);
            await loadWishlist();
        }
    },
    toggleWishlist: async (hotelId: string) => {
        const { wishlistIds, userId } = get();
        const isCurrentlyToggled = wishlistIds.includes(hotelId);

        set({
            wishlistIds: isCurrentlyToggled
                ? wishlistIds.filter(id => id !== hotelId)
                : [...wishlistIds, hotelId]
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
            // Revert on error
            set({ wishlistIds });
            console.error('Toggle failed:', error);
        }
    },
    isWishlisted: (hotelId: string) => {
        return get().wishlistIds.includes(hotelId);
    },
    
}));

// Watch auth state changes
supabase.auth.onAuthStateChange((_event, session) => { 
    const userId = session?.user.id ?? null;
    const store = useWishlistStore.getState();

    if (userId && !store.userId){
        store.setUserId(userId);
        store.mergeGuestWishlist();
    } else {
        store.setUserId(userId)
    
    }
})

// Initial load
supabase.auth.getSession().then(({ data }) => {
  useWishlistStore.getState().setUserId(data.session?.user.id ?? null);
});