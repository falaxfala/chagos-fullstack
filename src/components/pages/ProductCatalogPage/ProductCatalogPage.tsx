import ProductCatalog from "@/components/ProductCatalog/ProductCatalog";
import { ProductListProvider } from "@/components/StoreProviders/ProductListProvider/ProductListProvider";

const ProductCatalogPage = () => {
  return (
    <ProductListProvider>
      <ProductCatalog />
    </ProductListProvider>
  );
};

export default ProductCatalogPage;
