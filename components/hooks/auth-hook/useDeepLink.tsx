

// import { useEffect } from 'react';
// import { useRouter } from 'expo-router';
// import * as Linking from 'expo-linking';
// import { supabase } from '@/constants/supabase/supabase';

// export const useDeepLink = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const handleDeepLink = async (url: string) => {
//       console.log('Deep link received:', url);
      
//       // Extract tokens from the URL hash fragment
//       const hash = url.split('#')[1];
//       if (!hash) return;
      
//       const params = new URLSearchParams(hash);
//       const accessToken = params.get('access_token');
//       const refreshToken = params.get('refresh_token');
//       const type = params.get('type');
      
//       console.log('Type:', type);
//       console.log('Has tokens:', !!accessToken, !!refreshToken);
      
//       if (accessToken && refreshToken) {
//         // Set the session with the tokens
//         const { data, error } = await supabase.auth.setSession({
//           access_token: accessToken,
//           refresh_token: refreshToken,
//         });
        
//         console.log('Session set:', !!data.session, error?.message);
        
//        if (!error && data.session) {
//   console.log('Session set successfully');
  
//   // Small delay to ensure session is persisted
//   setTimeout(() => {
//     if (type === 'recovery') {
//       router.replace('/(auth)/reset-password');
//     } else {
//       router.replace('/(tabs)/home');
//     }
//   }, 100);
// }
//       }
//     };

//     // Handle app opened from link
//     Linking.getInitialURL().then((url) => {
//       if (url) handleDeepLink(url);
//     });

//     // Handle link while app is open
//     const subscription = Linking.addEventListener('url', ({ url }) => {
//       handleDeepLink(url);
//     });

//     return () => subscription.remove();
//   }, []);
// };
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { supabase } from '@/constants/supabase/supabase';

export const useDeepLink = () => {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      console.log('Deep link received:', url);
      
      // Try both hash and query params
      let hash = url.split('#')[1];
      let query = url.split('?')[1];
      
      let params;
      let tokensFound = false;
      
      // Try hash first
      if (hash) {
        params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        
        if (accessToken && refreshToken) {
          tokensFound = true;
          console.log('Tokens found in hash');
          
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          console.log('Session set from hash:', !!data.session, error?.message);
          
          if (!error && data.session) {
            setTimeout(() => {
              router.replace('/(auth)/reset-password');
            }, 500);
            return;
          }
        }
      }
      
      // Try query params if hash didn't work
      if (!tokensFound && query) {
        params = new URLSearchParams(query);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        
        if (accessToken && refreshToken) {
          console.log('Tokens found in query params');
          
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          console.log('Session set from query:', !!data.session, error?.message);
          
          if (!error && data.session) {
            setTimeout(() => {
              router.replace('/(auth)/reset-password');
            }, 500);
            return;
          }
        }
      }
      
      console.log('No valid tokens found in URL');
    };

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    return () => subscription.remove();
  }, []);
};