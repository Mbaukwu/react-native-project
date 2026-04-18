import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/constants/supabase/supabase';

type UseAuth = {
  user: User | null;
  session: Session | null;
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  avatarUrl: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

export const useAuth = (): UseAuth => {

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = async (userId: string, fallbackUser?: User | null) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', userId)
        .maybeSingle();

      const name = data?.full_name
        ?? fallbackUser?.user_metadata?.full_name
        ?? fallbackUser?.user_metadata?.name
        ?? null;

      setUserName(name);
      setAvatarUrl(data?.avatar_url ?? null);
    } catch (err) {
      console.error('loadProfile error:', err);
    }
  };

  const refreshUser = async () => {
    console.log('🔄 refreshUser called');
    const { data } = await supabase.auth.getUser();
    const u = data.user ?? null;
    setUser(u);
    if (u?.id) {
      await loadProfile(u.id, u);
    }
    console.log('✅ refreshUser complete, user:', u?.email);
  };

  // Refresh when app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('📱 App became active, refreshing user');
        refreshUser();
      }
    });
    return () => subscription.remove();
  }, []);

  // Auth Initialization
  useEffect(() => {
    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!isMounted) return;
      setSession(data.session);
      const u = data.session?.user ?? null;
      setUser(u);
      if (u?.id) await loadProfile(u.id, u);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth event:', event);
        if (!isMounted) return;
        
        // Ignore SIGNED_OUT if it happens right before SIGNED_IN
        if (event === 'SIGNED_OUT') {
          // Wait a bit to see if SIGNED_IN follows
          timeoutId = setTimeout(() => {
            console.log('🔐 Confirming SIGNED_OUT, clearing user');
            setSession(null);
            setUser(null);
            setUserName(null);
            setAvatarUrl(null);
            setIsLoading(false);
          }, 500);
          return;
        }
        
        // Clear the timeout if SIGNED_IN arrives
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        
        setSession(session);
        const u = session?.user ?? null;
        setUser(u);

        if (u?.id) {
          await loadProfile(u.id, u);
        } else {
          setUserName(null);
          setAvatarUrl(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserName(null);
    setAvatarUrl(null);
    setIsLoading(false);
  };

  return {
    user,
    session,
    userId: user?.id ?? null,
    userEmail: user?.email ?? null,
    userName,
    avatarUrl,
    isAuthenticated: !!user,
    isLoading,
    signOut,
    refreshUser,
  };
};