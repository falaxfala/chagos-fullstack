import { useEffect, useRef, useState } from "react";
import ProductListCategoriesFilter from "./ProductListCategoriesFilter/ProductListCategoriesFilter";
import type {
  ProductListFilters as ProductListFiltersType,
  ProductPriceRange,
} from "@/lib/stores/productListStore";
import { useProductListStore } from "../StoreProviders/ProductListProvider/ProductListProvider.hooks";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import ButtonLink from "../Button/ButtonLink";
import { appRoute } from "@/constants/appRoute";
import { useDebouncedState } from "@/hooks/useDebouncedState";
import Typography from "../Typography/Typography";

const ProductListFilters = () => {
  const [filters, setFilters] = useState<ProductListFiltersType | undefined>(
    undefined
  );
  const cart = useProductListStore((state) => state.cart);
  const ref = useRef<HTMLDivElement>(null);

  const fetchProducts = useProductListStore((state) => state.fetchProducts);

  const [searchQuery, setSearchQuery, realTimeSearchQuery] =
    useDebouncedState("");

  const [debouncedPriceFilter, setDebouncedPriceFilter, realTimePriceFilter] =
    useDebouncedState<ProductPriceRange>({ max: 10000, min: 0 });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: searchQuery,
    }));
  }, [searchQuery]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: debouncedPriceFilter,
    }));
  }, [debouncedPriceFilter]);

  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  return (
    <div
      ref={ref}
      className="bg-white p-4 transition-all duration-200 flex flex-col gap-4"
    >
      <div className="flex flex-row justify-between gap-2">
        <ProductListCategoriesFilter
          categoryFilter={filters?.category}
          setFilters={setFilters}
          className="w-full"
        />
        <div>
          <ButtonLink href={appRoute.cart} className="px-5 h-full relative">
            <ShoppingCartIcon className="w-7 h-7" />
            <div className="rounded-full bg-green-500 text-white w-6 h-6 flex items-center justify-center absolute -top-2 -right-2">
              {cart.length}
            </div>
          </ButtonLink>
        </div>
      </div>
      <div className="w-full flex flex-col justify-between gap-2 md:gap-10 md:flex-row">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 rounded-md border border-slate-300"
          value={realTimeSearchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex flex-row gap-2 w-fit items-center">
          <div className="flex flex-row gap-2 flex-nowrap items-center">
            <Typography variant="subheading" tag="h3" className="text-nowrap">
              Min price:
            </Typography>
            <input
              type="number"
              placeholder="Min Price"
              className="w-full p-2 rounded-md border border-slate-300"
              value={realTimePriceFilter?.min || 0}
              onChange={(e) =>
                setDebouncedPriceFilter({
                  ...realTimePriceFilter,
                  min: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="flex flex-row gap-2 flex-nowrap items-center">
            <Typography variant="subheading" tag="h3" className="text-nowrap">
              Max price:
            </Typography>
            <input
              type="number"
              placeholder="Max Price"
              className="w-full p-2 rounded-md border border-slate-300"
              value={realTimePriceFilter?.max || 0}
              onChange={(e) =>
                setDebouncedPriceFilter({
                  ...realTimePriceFilter,
                  max: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListFilters;
