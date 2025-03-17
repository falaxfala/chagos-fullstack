import { useTranslations } from "next-intl";
import Product from "../Product/Product";
import Typography from "../Typography/Typography";
import type {
  ProductListProps,
  ProductListSectionContainerProps,
} from "./ProductList.types";
import { cx } from "@/utils/style";
import range from "lodash/range";
import { useProductListStore } from "../StoreProviders/ProductListProvider/ProductListProvider.hooks";

const SectionContainer = ({
  children,
  className,
}: ProductListSectionContainerProps) => (
  <section
    className={cx(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 py-6 px-12",
      className
    )}
  >
    {children}
  </section>
);

const ProductList = ({ products, isCart, isLoading }: ProductListProps) => {
  const t = useTranslations("catalogue");
  const categories = useProductListStore((state) => state.categories);

  if (isLoading) {
    return (
      <SectionContainer>
        {range(0, 8, 1).map((i) => (
          <Product key={i} isLoading />
        ))}
      </SectionContainer>
    );
  }

  if (!products.length) {
    return (
      <SectionContainer className="grid-cols-1 md:grid-cols-1 lg:grid-cols-1 text-center">
        <Typography variant="subheading">{t("noProductsMessage")}</Typography>
      </SectionContainer>
    );
  }

  return categories?.map((category) => {
    const categoryProducts = products.filter(
      (product) => product.category === category
    );

    if (!categoryProducts.length) {
      return null;
    }

    return (
      <div key={category}>
        <div className="sticky top-2 mt-1 w-full bg-slate-300 z-40 py-2 px-4 mx-4 rounded-md category-header">
          <Typography variant="heading" tag="h2">
            {category}
          </Typography>
        </div>
        <SectionContainer>
          {categoryProducts.map((product) =>
            !isCart && product.inCart ? null : (
              <Product key={product._id} data={product} isCart={isCart} />
            )
          )}
        </SectionContainer>
      </div>
    );
  });
};

export default ProductList;
