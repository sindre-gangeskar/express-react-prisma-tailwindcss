import { useQuery } from "@tanstack/react-query";
import { searchProduct } from "../libs/api";
export default function useSearch(searchTerm: string) {
	return useQuery({ queryKey: ["products", searchTerm], queryFn: () => searchProduct(searchTerm) });
}
