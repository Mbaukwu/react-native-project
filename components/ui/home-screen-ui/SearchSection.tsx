// ─────────────────────────────────────────────────────────────
// SearchBar
// Screen: Home / Search input component
// Purpose: Allows user to search hotels/destinations
// Navigation: Routes to searchScreen with query params
// ─────────────────────────────────────────────────────────────

// ── Imports ──────────────────────────────────────────────────
import { useThemeColors } from "@/components/hooks/theme/useThemeColors";
import { IconSymbol } from "@/components/ui/icon-symbol";

import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

// ── Component ────────────────────────────────────────────────
export default function SearchBar() {

  // ── State ────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");

  // ── Theme ────────────────────────────────────────────────
  const { colors } = useThemeColors();

  // ── Navigation ───────────────────────────────────────────
  const { push } = useRouter();

  // ── Handlers ─────────────────────────────────────────────
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

  // ── Render ───────────────────────────────────────────────
  return (
    <View className="pt-3 mx-4">

      {/* ── Search Input Container ───────────────────────── */}
      <View className="flex-row items-center bg-input rounded-2xl px-5 my-2 h-13">

        <IconSymbol name="magnifyingglass" size={20} color={colors.icon} />

        {/* ── Text Input ─────────────────────────────────── */}
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

        {/* ── Clear Button ──────────────────────────────── */}
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <IconSymbol name="x.circle" size={20} color={colors.icon} />
          </TouchableOpacity>
        )}

      </View>

    </View>
  );
}