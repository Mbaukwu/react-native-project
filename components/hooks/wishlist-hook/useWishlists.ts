import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/constants/supabase/supabase';
import { storage } from '@/constants/stores/mmkvStore';

const GUEST_WISHLIST_KEY = 'guest_wishlist';

export const useGuestWishlist = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from storage
  const loadWishlist = useCallback(async () => {
    try {
      if (userId) {
        // Fetch from Supabase
        const { data } = await supabase
          .from('wishlists')
          .select('hotel_id')
          .eq('user_id', userId);
        setWishlistIds(data?.map(item => item.hotel_id) ?? []);
      } else {
        // Load from MMKV
        const stored = storage.getString(GUEST_WISHLIST_KEY);
        setWishlistIds(stored ? JSON.parse(stored) : []);
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Toggle wishlist
  const toggle = useCallback(async (hotelId: string) => {
    const isCurrently = wishlistIds.includes(hotelId);
    
    // Optimistic update
    setWishlistIds(prev => 
      isCurrently ? prev.filter(id => id !== hotelId) : [...prev, hotelId]
    );

    try {
      if (userId) {
        if (isCurrently) {
          await supabase.from('wishlists').delete().eq('user_id', userId).eq('hotel_id', hotelId);
        } else {
          await supabase.from('wishlists').insert({ user_id: userId, hotel_id: hotelId });
        }
      } else {
        const updated = isCurrently 
          ? wishlistIds.filter(id => id !== hotelId) 
          : [...wishlistIds, hotelId];
        storage.set(GUEST_WISHLIST_KEY, JSON.stringify(updated));
      }
    } catch (error) {
      // Revert on error
      setWishlistIds(prev => 
        isCurrently ? [...prev, hotelId] : prev.filter(id => id !== hotelId)
      );
      console.error('Toggle failed:', error);
    }
  }, [userId, wishlistIds]);

  // Check if a specific hotel is wishlisted
  const isWishlisted = useCallback((hotelId: string) => {
    return wishlistIds.includes(hotelId);
  }, [wishlistIds]);

  // Watch auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load when userId changes
  useEffect(() => {
    loadWishlist();
  }, [userId, loadWishlist]);

  return {
    wishlistIds,
    toggle,
    isWishlisted,
    loading,
    isAuthenticated: !!userId,
  };
};