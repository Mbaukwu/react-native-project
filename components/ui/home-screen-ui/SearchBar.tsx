                               
import { View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from '@/constants/colorTheme/colors';
import { useColorScheme } from '@/components/hooks/use-color-scheme';
export default function SearchBar() {
  const [searchQuery, setsearchQuery] = useState("")
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme]
  const handleSearch = (text : string) => {
    setsearchQuery(text)
  }
  return (
    <View className=' pt-3 mx-4'>
      <View className='flex-row items-center bg-input rounded-2xl px-5 my-2 h-13'>
        <IconSymbol name='magnifyingglass' size={20} color={colors.icon} />
        <TextInput className='flex-1 text-text font-dm-sans'
          placeholder='Start your Journey'
          placeholderTextColor={colors.textDisabled}
          value={searchQuery}
          onChangeText={handleSearch}
          autoCorrect={false}
          autoCapitalize="none" />
        
        {/* {clear search button} */}
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <IconSymbol name='x.circle' size={20} color={colors.icon} />
          </TouchableOpacity>)}
     </View>
    </View>
  )
}