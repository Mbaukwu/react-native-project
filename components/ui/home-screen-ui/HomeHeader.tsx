import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/constants/supabase/supabase';
import useGreeting from "@/components/hooks/home-sceen-hooks/useGreetings";
import SearchBarSection from './SearchSection';
import AppText from '../typography/AppText';

export default function HomeHeader() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get user name if signed in
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const name = data.user.user_metadata?.name || data.user.email?.split('@')[0] || null;
        setUserName(name);
      } else {
        setUserName(null);
      }
      setIsLoading(false);
    };
    
    getUser();
    
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });
    
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const greeting = useGreeting(userName);

  if (isLoading) {
    return (
      <View className='px-4 pt-12 pb-4'>
        <View className='h-8 w-48 bg-border rounded-lg mb-1' />
        <View className='h-4 w-64 bg-border rounded-lg mb-2' />
        <View className='h-12 w-full bg-border rounded-xl' />
      </View>
    );
  }

  return (
    <View className='px-4 pt-12 pb-4'>
      {/* greeting */}
      <AppText variant='bold' className='text-[23px] text-text mb-1'>
        {greeting}
      </AppText>
      <AppText className="text-sm text-text-secondary mb-2">
        Where would you like to stay?
      </AppText>
      <SearchBarSection />
    </View>
  );
}