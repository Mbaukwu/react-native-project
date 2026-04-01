import { getHotelByAmenities } from "@/constants/supabase/services/serviceEntryFile";
import { useQuery } from "@tanstack/react-query";

export type AmenityItem = {
  amenity: string;
  count: number;
  image: string;
};

// Map amenities to images
export const amenityImages: Record<string, string> = {
  "Swimming Pool": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  Spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
  "Business Center": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
  Restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  "Beach Access": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  Parking: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=800",
  "Free WiFi": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
  Gym: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
};

export const useAmenities = () => {
  return useQuery<AmenityItem[], Error>({
    queryKey: ["amenities"],

    queryFn: async () => {
      const amenities = await getHotelByAmenities();

      // Group by amenity and count
      const amenityMap: Record<string, number> = {};

      amenities.forEach((amenity: string) => {
        const trimmed = amenity.trim();
        amenityMap[trimmed] = (amenityMap[trimmed] || 0) + 1;
      });

      // Convert to array, add images, sort by count, limit to top 6
      return Object.entries(amenityMap)
        .map(([amenity, count]) => ({
          amenity,
          count,
          image: amenityImages[amenity] || amenityImages["Swimming Pool"],
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);
    },

    staleTime: 10 * 60 * 1000,
    retry: 2,
  });
};
