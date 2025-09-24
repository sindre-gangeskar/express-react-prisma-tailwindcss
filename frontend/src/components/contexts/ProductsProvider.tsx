import { useState } from "react";
import ctx from "./ProductsContext";
import type { VisitProps } from "../../definitions";

export default function ProductsProvider({ children }: { children: React.ReactNode }) {
	const [visits, setVisits] = useState<VisitProps>({});
	return <ctx.Provider value={{ visits, setVisits }}>{children}</ctx.Provider>;
}
