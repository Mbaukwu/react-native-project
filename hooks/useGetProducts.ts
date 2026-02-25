import { useQuery } from "@tanstack/react-query";

type Product = {
  id: number;
  title: string;
    price: number;
  image: string;
};
export const useGetProducts = () => {
  //
  const handleGetProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data: Product[] = await response.json();
    return data;
  };
  //
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: handleGetProducts,
  });

  return { data, isLoading, error };
};

