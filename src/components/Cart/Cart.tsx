"use client";

import { useEffect, useMemo } from "react";
import ProductList from "../ProductList/ProductList";
import { useProductListStore } from "../StoreProviders/ProductListProvider/ProductListProvider.hooks";

const Cart = () => {
  const products = useProductListStore((state) => state.products);
  const getProducts = useProductListStore((state) => state.getProducts);
  const loadingProducts = useProductListStore((state) => state.loadingProducts);

  const cartProducts = useMemo(
    () => products.filter(({ inCart }) => inCart),
    [products]
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <ProductList products={cartProducts} isCart isLoading={loadingProducts} />
    </div>
  );
};

export default Cart;
