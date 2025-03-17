import type { Product } from "@/types/Product.types";
import type { ReactNode } from "react";

export type ProductListProps = {
  isLoading?: boolean;
  products: Product[];
  isCart?: boolean;
};

export type ProductListSectionContainerProps = {
  children: ReactNode;
  className?: string;
};
