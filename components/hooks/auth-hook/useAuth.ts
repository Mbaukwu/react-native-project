
// import { useEffect, useState } from 'react';
// import { supabase } from '@/constants/supabase/supabase';

// type UseAuth = {
//   userId: string | null;
//   userEmail: string | null;
//   userName: string | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   signOut: () => Promise<void>;
//   refreshUser: () => Promise<void>;
// };

// export const useAuth = (): UseAuth => {
//   const [userId, setUserId] = useState<string | null>(null);
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   const [userName, setUserName] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const refreshUser = async () => {
//     const { data } = await supabase.auth.getSession();
//     const sessionUser = data.session?.user ?? null;
    
//     setUserId(sessionUser?.id ?? null);
//     setUserEmail(sessionUser?.email ?? null);
//     // Read from metadata directly — no extra database call
//     setUserName(sessionUser?.user_metadata?.full_name ?? sessionUser?.user_metadata?.name ?? null);
//   };

//   useEffect(() => {
//     let isMounted = true;

//     supabase.auth.getSession().then(async ({ data }) => {
//       if (!isMounted) return;
//       const sessionUser = data.session?.user ?? null;
//       setUserId(sessionUser?.id ?? null);
//       setUserEmail(sessionUser?.email ?? null);
//       setUserName(sessionUser?.user_metadata?.full_name ?? sessionUser?.user_metadata?.name ?? null);
//       setIsLoading(false);
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
//       if (!isMounted) return;
//       const sessionUser = session?.user ?? null;
//       setUserId(sessionUser?.id ?? null);
//       setUserEmail(sessionUser?.email ?? null);
//       setUserName(sessionUser?.user_metadata?.full_name ?? sessionUser?.user_metadata?.name ?? null);
//     });

//     return () => {
//       isMounted = false;
//       subscription.unsubscribe();
//     };
//   }, []);

//   const signOut = async () => {
//     await supabase.auth.signOut();
//     setUserId(null);
//     setUserEmail(null);
//     setUserName(null);
//   };

//   return {
//     userId,
//     userEmail,
//     userName,
//     isAuthenticated: !!userId,
//     isLoading,
//     signOut,
//     refreshUser,
//   };
// };


import { useEffect, useState } from 'react';
import { supabase } from '@/constants/supabase/supabase';

type UseAuth = {
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

export const useAuth = (): UseAuth => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    const { data } = await supabase.auth.getSession();
    const sessionUser = data.session?.user ?? null;
    
    setUserId(sessionUser?.id ?? null);
    setUserEmail(sessionUser?.email ?? null);
    // Read from metadata directly — no extra database call
    setUserName(sessionUser?.user_metadata?.full_name ?? sessionUser?.user_metadata?.name ?? null);
  };

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!isMounted) return;
      const sessionUser = data.session?.user ?? null;
      setUserId(sessionUser?.id ?? null);
      setUserEmail(sessionUser?.email ?? null);
      setUserName(sessionUser?.user_metadata?.full_name ?? sessionUser?.user_metadata?.name ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;
      const sessionUser = session?.user ?? null;
      setUserId(sessionUser?.id ?? null);
      setUserEmail(sessionUser?.email ?? null);
      setUserName(sessionUser?.user_metadata?.full_name ?? sessionUser?.user_metadata?.name ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserId(null);
    setUserEmail(null);
    setUserName(null);
  };

  return {
    userId,
    userEmail,
    userName,
    isAuthenticated: !!userId,
    isLoading,
    signOut,
    refreshUser,
  };
};