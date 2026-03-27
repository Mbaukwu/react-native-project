import { View } from 'react-native'
import React from 'react'
import useGreeting from "@/components/hooks/home-sceen-hooks/useGreetings"
import SearchBarSection from './SearchSection'
import AppText from '../typography/AppText'


export default function HomeHeader() {
  const greeting = useGreeting(null)
  return (
    <View className='px-4 pt-12 pb-4'>
      {/* greeting */}
      <AppText variant='bold' className='text-2xl text-text mb-1'>{greeting}</AppText>
      <AppText className="text-sm text-text-secondary mb-2">
  Where would you like to stay?
</AppText>
      <SearchBarSection/>
    </View>
  )
}