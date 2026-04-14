import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { supabase } from '@/constants/supabase/supabase';

export const useDeepLink = () => {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      console.log('Deep link received:', url);
      
      // Extract tokens from the URL hash fragment
      const hash = url.split('#')[1];
      if (!hash) return;
      
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const type = params.get('type');
      
      console.log('Type:', type);
      console.log('Has tokens:', !!accessToken, !!refreshToken);
      
      if (accessToken && refreshToken) {
        // Set the session with the tokens
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        
        console.log('Session set:', !!data.session, error?.message);
        
        if (!error && data.session) {
          // Navigate based on the type
          if (type === 'recovery') {
            router.replace('/(auth)/reset-password');
          } else if (type === 'signup') {
            router.replace('/(tabs)/home');
          } else {
            router.replace('/(tabs)/home');
          }
        }
      }
    };

    // Handle app opened from link
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    // Handle link while app is open
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    return () => subscription.remove();
  }, []);
};