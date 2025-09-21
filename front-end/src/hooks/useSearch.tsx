import { useQuery } from "@tanstack/react-query";
import { getProducts, searchProduct } from "../libs/api";
export default function useSearch(searchTerm: string) {
	return useQuery({ queryKey: ["products", searchTerm], queryFn: () =>  searchTerm ? searchProduct(searchTerm) : getProducts() });
}
