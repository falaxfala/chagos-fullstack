import { createProductListStore } from "@/lib/stores/productListStore";
import type { ReactNode } from "react";

export type ProductListStoreApi = ReturnType<typeof createProductListStore>;

export type ProductListProviderProps = {
  children: ReactNode;
};
