import { useContext,  } from "react";
import ctx from "../components/contexts/ProductsContext";
export default function useProducts() {
	const { setVisits, visits } = useContext(ctx);
	return { visits, setVisits };
}
