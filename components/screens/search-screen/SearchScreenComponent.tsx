import { View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { LegendList } from "@legendapp/list";
import { useSearchHotels } from "@/components/hooks/hotel-hooks/useSearchHotels";
import { IconSymbol } from "@/components/ui/icon-symbol";
import SearchHotelCard from "@/components/ui/hotel/SearchHotelCard";
import AppText from "@/components/ui/typography/AppText";
import { Colors } from "@/constants/colorTheme/colors";
import { useColorScheme } from "@/components/hooks/use-color-scheme";
import ScreenWrapper from "@/components/global/ScreenWrapper";

type LocalSearchParamsType = {
  query?: string;
  city?: string;
  amenity?: string;
  filter?: string;
};

export default function SearchScreenComponent() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { back } = useRouter();
  const params = useLocalSearchParams<LocalSearchParamsType>();

  // Determine initial state from params
  let initialQuery = "";
  let initialFilter: "city" | "amenity" | "deals" | "top-rated" | "luxury" | "budget" | null = null;
  let initialFilterValue = "";

  if (params.query) {
    initialQuery = params.query;
  } else if (params.city) {
    initialQuery = params.city;
    initialFilter = "city";
    initialFilterValue = params.city;
  } else if (params.amenity) {
    initialQuery = params.amenity;
    initialFilter = "amenity";
    initialFilterValue = params.amenity;
  } else if (params.filter === "deals") {
    initialFilter = "deals";
  } else if (params.filter === "top-rated") {
    initialFilter = "top-rated";
  } else if (params.filter === "luxury") {
    initialFilter = "luxury";
  } else if (params.filter === "budget") {
    initialFilter = "budget";
  }

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [filterValue, setFilterValue] = useState(initialFilterValue);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      if (activeFilter && searchQuery !== initialQuery) {
        setActiveFilter(null);
        setFilterValue("");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchHotels({
    query: debouncedQuery,
    filter: activeFilter,
    filterValue: filterValue,
  });

  const hotels = data?.pages.flatMap((page) => page.data) ?? [];

  const handleClear = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setActiveFilter(null);
    setFilterValue("");
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const getFilterLabel = () => {
    if (activeFilter === "deals") return "Special Deals";
    if (activeFilter === "top-rated") return "Top Rated Hotels";
    if (activeFilter === "luxury") return "Luxury Stays";
    if (activeFilter === "budget") return "Budget Friendly";
    if (activeFilter === "city") return `Hotels in ${filterValue}`;
    if (activeFilter === "amenity") return `Hotels with ${filterValue}`;
    if (debouncedQuery) return `"${debouncedQuery}"`;
    return "Search";
  };

  const shouldShowResults = debouncedQuery || activeFilter;
  const filterLabel = getFilterLabel();

  return (
    <ScreenWrapper>
      {/* Header - fixed at top */}
      <View className="px-4 pt-12 pb-2 bg-background">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => back()} className="mr-3 p-1">
            <IconSymbol name="chevron.left" size={28} color={colors.text} />
          </TouchableOpacity>
          <AppText variant="bold" className="text-xl text-text flex-1" numberOfLines={1}>
            Search
          </AppText>
        </View>

        {/* Search Input */}
        <View className="flex-row items-center bg-input rounded-2xl px-5 h-13">
          <IconSymbol name="magnifyingglass" size={20} color={colors.icon} />
          <TextInput
            className="flex-1 text-text font-dm-sans ml-3"
            placeholder="Search hotels, cities, locations..."
            placeholderTextColor={colors.textDisabled}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoFocus={!initialFilter}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClear}>
              <IconSymbol name="x.circle" size={20} color={colors.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results - scrollable area */}
      <View className="flex-1">
        {!shouldShowResults ? (
          <View className="flex-1 items-center justify-center px-4">
            <IconSymbol name="magnifyingglass" size={48} color={colors.textDisabled} />
            <AppText className="text-text-secondary text-center mt-4">
              Search for hotels by name, city, or location
            </AppText>
          </View>
        ) : isLoading && hotels.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={colors.primary} />
            <AppText className="text-text-secondary mt-4">Searching...</AppText>
          </View>
        ) : isError ? (
          <View className="flex-1 items-center justify-center px-4">
            <AppText className="text-error text-center">Failed to load results</AppText>
          </View>
        ) : hotels.length === 0 ? (
          <View className="flex-1 items-center justify-center px-4">
            <AppText className="text-text-secondary text-center">No hotels found</AppText>
          </View>
        ) : (
          <>
            <View className="px-4 py-2">
              <AppText className="text-text-secondary text-sm">
                {hotels.length} {hotels.length === 1 ? "result" : "results"}
              </AppText>
            </View>

            <LegendList
              data={hotels}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="px-4 mb-4">
                  <SearchHotelCard hotel={item} />
                </View>
              )}
              showsVerticalScrollIndicator={false}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isFetchingNextPage ? (
                  <View className="py-4 items-center">
                    <ActivityIndicator size="small" color={colors.primary} />
                  </View>
                ) : null
              }
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
}