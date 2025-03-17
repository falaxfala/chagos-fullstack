"use client";
import { useProductListStore } from "../StoreProviders/ProductListProvider/ProductListProvider.hooks";
import ProductListFilters from "../ProductListFilters/ProductListFilters";
import ProductList from "../ProductList/ProductList";

const ProductCatalog = () => {
  const products = useProductListStore((state) => state.products);
  const loadingProducts = useProductListStore(
    (state) => state.isLoadingProducts
  );

  return (
    <section className="px-8 py-12">
      <ProductListFilters />
      <ProductList products={products} isLoading={loadingProducts} />
    </section>
  );
};

export default ProductCatalog;
