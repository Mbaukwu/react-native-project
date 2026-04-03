import { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/constants/supabase/supabase';

type UseAuth = {
  user: User | null;
  session: Session | null;
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

export const useAuth = (): UseAuth => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user ?? null);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    session,
    userId: user?.id ?? null,
    userEmail: user?.email ?? null,
    userName: user?.user_metadata?.name ?? null,
    isAuthenticated: !!user,
    isLoading,
    signOut,
    refreshUser,
  };
};