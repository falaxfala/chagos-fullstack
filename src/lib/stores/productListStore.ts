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
  loadingProducts: boolean;
  loadingCategories: boolean;
  error: string;
  categories?: string[];
};

export type ProductListActions = {
  getProducts: (filters?: ProductListFilters) => void;
  getCategories: () => void;
  addProductToCart: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  setError: (error: string) => void;
};

export type ProductListStore = ProductListState & ProductListActions;

export const productListInitialState: ProductListState = {
  products: [],
  cart: [],
  loadingProducts: false,
  loadingCategories: false,
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
    getCategories: async () => {
      set({ loadingCategories: true });
      await fetch<string[]>("productsCategories")
        .then((categories) => {
          set({ categories });
        })
        .catch((error) => {
          set({ error: error.message });
        })
        .finally(() => {
          set({ loadingCategories: false });
        });
    },
    getProducts: async (filters) => {
      const preparedFilters = filters && {
        ...filters,
        priceRange: filters.priceRange
          ? `${filters.priceRange.min}-${filters.priceRange.max}`
          : undefined,
      };

      const cart = get().cart;
      set({ loadingProducts: true });
      await fetch<Product[]>("products", { query: preparedFilters })
        .then((products) => {
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
        })
        .catch((error) => {
          set({ error: error.message });
        })
        .finally(() => {
          set({ loadingProducts: false });
        });
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
