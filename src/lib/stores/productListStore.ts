import type { Product } from "@/types/Product.types";
import { createStore } from "zustand/vanilla";
import fetch from "@/lib/fetch/fetch";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { cookiesNames } from "@/constants/cookies";

const { CART_COOKIE } = cookiesNames;

export type ProductPriceRange = {
  min: number;
  max: number;
};

export type ProductListFilters = {
  category?: string;
  priceRange?: ProductPriceRange;
  search?: string;
};

export type ProductListState = {
  products: Product[];
  cart: string[];
  isLoadingProducts: boolean;
  isLoadingCategories: boolean;
  error: string;
  categories?: string[];
};

export type ProductListActions = {
  fetchProducts: (filters?: ProductListFilters) => void;
  fetchCategories: () => void;
  addProductToCart: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  setError: (error: string) => void;
};

export type ProductListStore = ProductListState & ProductListActions;

export const productListInitialState: ProductListState = {
  products: [],
  cart: [],
  isLoadingCategories: false,
  isLoadingProducts: false,
  error: "",
};

export const initProductListStore = (): ProductListState => {
  if (!hasCookie(CART_COOKIE)) {
    return productListInitialState;
  }

  const cartCookieValue = getCookie(CART_COOKIE);
  if (cartCookieValue && typeof cartCookieValue === "string") {
    return {
      ...productListInitialState,
      cart: JSON.parse(cartCookieValue),
    };
  }

  return productListInitialState;
};

export const createProductListStore = (
  initState: ProductListState = productListInitialState
) =>
  createStore<ProductListStore>()((set, get) => ({
    ...initState,
    fetchCategories: async () => {
      set({ isLoadingCategories: true });
      try {
        const categories = await fetch<string[]>("productsCategories");
        set({ categories });
      } catch (error) {
        if (error instanceof Error) {
          set({ error: error?.message });
        }
      }
      set({ isLoadingCategories: false });
    },
    fetchProducts: async (filters) => {
      const preparedFilters = filters && {
        ...filters,
        priceRange: filters.priceRange
          ? `${filters.priceRange.min}-${filters.priceRange.max}`
          : undefined,
      };

      const cart = get().cart;
      set({ isLoadingProducts: true });
      try {
        const products = await fetch<Product[]>("products", {
          query: preparedFilters,
        });
        const preparedProducts = products.map((product) => {
          const productInCart = cart.find(
            (cartProductId) => cartProductId === product._id
          );
          return {
            ...product,
            inCart: !!productInCart,
          };
        });
        set({ products: preparedProducts });
      } catch (error) {
        if (error instanceof Error) {
          set({ error: error?.message });
        }
      }
      set({ isLoadingProducts: false });
    },
    addProductToCart: (productId) => {
      const cart = get().cart;
      const products = get().products;

      const updatedCart = [...cart, productId];
      setCookie(CART_COOKIE, JSON.stringify(updatedCart));

      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return { ...product, inCart: true };
        }
        return product;
      });
      set({ products: updatedProducts, cart: updatedCart });
    },
    removeProductFromCart: (productId) => {
      const cart = get().cart;
      const products = get().products;

      const updatedCart = cart.filter(
        (cartProductId) => cartProductId !== productId
      );
      set({ cart: updatedCart });
      setCookie(CART_COOKIE, JSON.stringify(updatedCart));

      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return { ...product, inCart: false };
        }
        return product;
      });
      set({ products: updatedProducts });
    },
    setError: (error) => set({ error }),
  }));
