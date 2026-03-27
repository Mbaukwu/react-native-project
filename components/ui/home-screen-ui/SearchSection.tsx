import { useColorScheme } from "@/components/hooks/use-color-scheme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/colorTheme/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { push } = useRouter();

 
  const handleSearchSubmit = () => {
  if (searchQuery.trim()) {
    push({
      pathname: "/searchScreen",
      params: { query: searchQuery.trim() },
    });
  }
};

  const clearSearch = () => {
    setSearchQuery("");
  };
  return (
    <View className=" pt-3 mx-4">
      <View className="flex-row items-center bg-input rounded-2xl px-5 my-2 h-13">
        <IconSymbol name="magnifyingglass" size={20} color={colors.icon} />

        <TextInput
          className="flex-1 text-text font-dm-sans ml-3"
          placeholder="Start your Journey"
          placeholderTextColor={colors.textDisabled}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />

        {/* {clear search button} */}
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <IconSymbol name="x.circle" size={20} color={colors.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
