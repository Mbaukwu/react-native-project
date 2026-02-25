import { useQuery } from "@tanstack/react-query";

type ProductDetail = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export const useGetProductDetail = (id: string | string[]) => {
  const handleGetProductDetail = async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data: ProductDetail = await response.json();
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: handleGetProductDetail,
    enabled: !!id, 
  });

  return { data, isLoading, error };
};