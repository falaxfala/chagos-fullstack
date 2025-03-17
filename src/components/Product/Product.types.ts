import type { Product } from "@/types/Product.types";

export type ProductProps = {
  data?: Product;
  isLoading?: boolean;
  isCart?: boolean;
};
