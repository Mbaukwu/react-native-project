import { View, Text } from 'react-native'
import React from 'react'
import useGreeting from "@/components/hooks/home-sceen-hooks/useGreetings"
import SearchBar from './SearchBar'
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
      <SearchBar/>
    </View>
  )
}