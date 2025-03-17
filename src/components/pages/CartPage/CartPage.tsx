import Cart from "@/components/Cart/Cart";
import { ProductListProvider } from "@/components/StoreProviders/ProductListProvider/ProductListProvider";

const CartPage = () => {
  return (
    <ProductListProvider>
      <Cart />
    </ProductListProvider>
  );
};

export default CartPage;
