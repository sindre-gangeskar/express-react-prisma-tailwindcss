import React, { createContext, type SetStateAction } from "react";
import type { ProductsContextProps, VisitProps } from "../../definitions";

const ctx = createContext({
  visits: null,
	setVisits: (() => {}) as React.Dispatch<SetStateAction<VisitProps>>
} as ProductsContextProps);

export default ctx;
