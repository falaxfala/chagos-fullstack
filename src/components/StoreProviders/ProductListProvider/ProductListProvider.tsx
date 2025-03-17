"use client";

import { createContext, useRef } from "react";
import {
  ProductListProviderProps,
  ProductListStoreApi,
} from "./ProductListProvider.types";
import {
  createProductListStore,
  initProductListStore,
} from "@/lib/stores/productListStore";

export const ProductListContext = createContext<
  ProductListStoreApi | undefined
>(undefined);

export const ProductListProvider = ({ children }: ProductListProviderProps) => {
  const storeRef = useRef<ProductListStoreApi | undefined>(undefined);

  if (storeRef.current === undefined) {
    storeRef.current = createProductListStore(initProductListStore());
  }

  return (
    <ProductListContext.Provider value={storeRef.current}>
      {children}
    </ProductListContext.Provider>
  );
};
