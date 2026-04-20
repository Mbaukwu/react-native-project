// ─────────────────────────────────────────────────────────────
// HomeHeader
// Screen: Home screen header section
// Purpose: Displays greeting + search entry point
// Dependencies: Supabase auth, useGreeting hook, SearchBarSection
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/constants/supabase/supabase';
import useGreeting from "@/components/hooks/home-sceen-hooks/useGreetings";
import SearchBarSection from './SearchSection';
import AppText from '../typography/AppText';
import HomeHeaderSkeleton from '../skeletons-ui/HomeHeaderSkeleton';

// ── Component ────────────────────────────────────────────────
export default function HomeHeader() {

  // ── State ────────────────────────────────────────────────
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ── Effects (Auth Listener + User Fetch) ─────────────────
  useEffect(() => {

    // ── Fetch current user ────────────────────────────────
   const getUser = async () => {
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    // Try profiles table first — source of truth
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', data.user.id)
      .maybeSingle();

    const name =
      profile?.full_name ??
      data.user.user_metadata?.full_name ?? // key used in signUp
      data.user.user_metadata?.name ??      // fallback
      null;

    setUserName(name);
  } else {
    setUserName(null);
  }

  setIsLoading(false);
};

    getUser();

    // ── Auth state listener ───────────────────────────────
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // ── Greeting Logic ───────────────────────────────────────
  const greeting = useGreeting(userName);

  // ── Loading State ────────────────────────────────────────
  if (isLoading) {
    return <HomeHeaderSkeleton />;
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <View className='px-4 pt-12 pb-4'>

      {/* ── Greeting ─────────────────────────────────────── */}
      <AppText variant='bold' className='text-[23px] text-text mb-1'>
        {greeting}
      </AppText>

      {/* ── Subtitle ──────────────────────────────────────── */}
      <AppText className="text-sm text-text-secondary mb-2">
        Where would you like to stay?
      </AppText>

      {/* ── Search ────────────────────────────────────────── */}
      <SearchBarSection />

    </View>
  );
}
