import { useEffect, useState } from 'react';
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

  // Fetch profile from profiles table — this is the source of truth
  const loadProfile = async (userId: string, fallbackUser?: User | null) => {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', userId)
      .maybeSingle();

    if (data?.full_name) {
      setUserName(data.full_name);
    } else {
      // Fallback — check both metadata keys since different flows may use different keys
      const metaName =
        fallbackUser?.user_metadata?.full_name ??
        fallbackUser?.user_metadata?.name ??
        null;
      setUserName(metaName);
    }
    setAvatarUrl(data?.avatar_url ?? null);
  };

  const refreshUser = async () => {
    const { data } = await supabase.auth.getUser();
    const u = data.user ?? null;
    setUser(u);
    if (u?.id) await loadProfile(u.id, u);
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      const u = data.session?.user ?? null;
      setUser(u);
      if (u?.id) await loadProfile(u.id, u);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        const u = session?.user ?? null;
        setUser(u);
        if (u?.id) {
          await loadProfile(u.id, u);
        } else {
          setUserName(null);
          setAvatarUrl(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserName(null);
    setAvatarUrl(null);
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