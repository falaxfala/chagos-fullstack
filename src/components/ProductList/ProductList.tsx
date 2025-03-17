import { useTranslations } from "next-intl";
import Product from "../Product/Product";
import Typography from "../Typography/Typography";
import type {
  ProductListProps,
  ProductListSectionContainerProps,
} from "./ProductList.types";
import { makeNumberArray } from "@/utils/array";
import { cx } from "@/utils/style";

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

  if (isLoading) {
    return (
      <SectionContainer>
        {makeNumberArray(8).map((i) => (
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

  return (
    <SectionContainer>
      {products.map((product) =>
        !isCart && product.inCart ? null : (
          <Product key={product._id} data={product} isCart={isCart} />
        )
      )}
    </SectionContainer>
  );
};

export default ProductList;
