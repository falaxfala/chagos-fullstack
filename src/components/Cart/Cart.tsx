"use client";

import { useEffect, useMemo } from "react";
import ProductList from "../ProductList/ProductList";
import { useProductListStore } from "../StoreProviders/ProductListProvider/ProductListProvider.hooks";

const Cart = () => {
  const products = useProductListStore((state) => state.products);
  const fetchProducts = useProductListStore((state) => state.fetchProducts);
  const fetchCategories = useProductListStore((state) => state.fetchCategories);
  const loadingProducts = useProductListStore(
    (state) => state.isLoadingProducts
  );

  const cartProducts = useMemo(
    () => products.filter(({ inCart }) => inCart),
    [products]
  );

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchCategories, fetchProducts]);

  return (
    <div>
      <ProductList products={cartProducts} isCart isLoading={loadingProducts} />
    </div>
  );
};

export default Cart;
