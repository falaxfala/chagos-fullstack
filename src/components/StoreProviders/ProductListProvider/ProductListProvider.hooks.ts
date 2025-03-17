import { type ProductListStore } from "@/lib/stores/productListStore";
import { useContext } from "react";
import { ProductListContext } from "./ProductListProvider";
import { useStore } from "zustand";

export const useProductListStore = <T>(
  selector: (store: ProductListStore) => T
) => {
  const productListStoreContext = useContext(ProductListContext);

  if (!productListStoreContext) {
    throw new Error(
      "useProductListStore must be used within a ProductListProvider"
    );
  }

  return useStore(productListStoreContext, selector);
};

/*
export const useFilteredProductList = () => {
  const [filters, setFilters] = useState<ProductListFilters | null>(null);
  const { products } = useProductListStore((state) => state);

  // Usually I'd make filtering at backend side, so re-fetching would be here, with proper filtering params
  // I think it's pointless in this particular case (no params in API)
  // and I'll just fetch it once in the component (performance reasons)
  // And filters would be applied at frontend side

  const filteredProducts = useMemo(() => {
    if (!filters) {
      return products;
    }
    const result: Product[] = [];

    for (const product of products) {
      if (filters.category && filters.category !== product.category) {
        continue;
      }

      if (filters.priceRange) {
        const parsedPrice = extractProductPrice(product.price);
        if (
          parsedPrice < filters.priceRange.min ||
          parsedPrice > filters.priceRange.max
        ) {
          continue;
        }
      }

      if (
        filters.search &&
        !product.productName
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        continue;
      }

      result.push(product);
    }
  }, [filters, products]);

  return {
    setFilters,
    filteredProducts,
    debugAppliedFilters: filters,
  };
};
*/
