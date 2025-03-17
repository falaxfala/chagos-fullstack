import type { ProductListFilters } from "@/lib/stores/productListStore";
import type { Dispatch, SetStateAction } from "react";

export type ProductListCategoriesFilterProps = {
  setFilters: Dispatch<SetStateAction<ProductListFilters | undefined>>;
  categoryFilter?: string;
  className?: string;
};
