import { useProductListStore } from "@/components/StoreProviders/ProductListProvider/ProductListProvider.hooks";
import { useCallback, useEffect } from "react";
import type { ProductListCategoriesFilterProps } from "./ProductListCategoriesFilter.types";
import Button from "@/components/Button/Button";
import { cx } from "@/utils/style";

const ProductListCategoriesFilter = ({
  setFilters,
  categoryFilter,
  className,
}: ProductListCategoriesFilterProps) => {
  const getCategories = useProductListStore((state) => state.getCategories);
  const categories = useProductListStore((state) => state.categories);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setFilters((prevFilters) => {
        if (prevFilters?.category === category) {
          return {
            ...prevFilters,
            category: undefined,
          };
        }

        return {
          ...prevFilters,
          category,
        };
      });
    },
    [setFilters]
  );

  return (
    <div
      className={cx(
        "p-2 rounded-md bg-slate-300 flex gap-4 flex-row flex-wrap",
        className
      )}
    >
      {categories?.map((cat) => (
        <Button
          key={cat}
          variant="inline"
          onClick={() => handleCategoryChange(cat)}
          className={cx({
            "outline outline-slate-500 bg-slate-100":
              categoryFilter && categoryFilter === cat,
          })}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
};

export default ProductListCategoriesFilter;
