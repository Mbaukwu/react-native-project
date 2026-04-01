// import { getHotelsByFilter, searchHotels } from "@/constants/supabase/services/serviceEntryFile";
// import { useInfiniteQuery } from "@tanstack/react-query";

// const PAGE_SIZE = 10;

// type SearchParams = {
//   query: string;
//   filter: "city" | "amenity" | "deals" | "top-rated" | "luxury" | "budget" | null;
//   filterValue: string;
// };

// export const useSearchHotels = (params: SearchParams) => {
//   const { query, filter, filterValue } = params;

//   return useInfiniteQuery({
//     queryKey: ["search-hotels", query, filter, filterValue],
//     queryFn: async ({ pageParam = 0 }) => {
//       // If there's an active filter, use filter function

//       if (filter && filterValue) {
//         const result = await getHotelsByFilter(filter, filterValue, pageParam, PAGE_SIZE);
//         return {
//           data: result.data,
//           nextPage: result.hasMore ? pageParam + 1 : undefined,
//         };
//       }
//       // otherwise use text search
//       if (!query.trim()) return { data: [], nextPage: undefined };
//       const result = await searchHotels(query, pageParam, PAGE_SIZE);
//       return {
//         data: result.data,
//         nextPage: result.hasMore ? pageParam + 1 : undefined,
//       };
//     },
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//     enabled: query.trim().length > 0 || (!!filter && !!filterValue),
//     staleTime: 5 * 60 * 1000,
//     retry: 2,
//   });
// };
import { getHotelsByFilter, searchHotels } from "@/constants/supabase/services/serviceEntryFile";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 10;

type SearchParams = {
  query: string;
  filter: "city" | "amenity" | "deals" | "top-rated" | "luxury" | "budget" | null;
  filterValue: string;
};

export const useSearchHotels = (params: SearchParams) => {
  const { query, filter, filterValue } = params;

  return useInfiniteQuery({
    queryKey: ["search-hotels", query, filter, filterValue],
    queryFn: async ({ pageParam = 0 }) => {
      // If there's an active filter
      if (filter) {
        const result = await getHotelsByFilter(filter, filterValue, pageParam, PAGE_SIZE);
        return {
          data: result.data,
          nextPage: result.hasMore ? pageParam + 1 : undefined,
        };
      }
      // Otherwise use text search
      if (!query.trim()) return { data: [], nextPage: undefined };
      const result = await searchHotels(query, pageParam, PAGE_SIZE);
      return {
        data: result.data,
        nextPage: result.hasMore ? pageParam + 1 : undefined,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: query.trim().length > 0 || !!filter,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};