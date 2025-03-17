import Image from "next/image";
import { ProductProps } from "./Product.types";
import Typography from "../Typography/Typography";
import { cropText } from "@/utils/string";
import Button from "../Button/Button";
import {
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { productDetailsAnimationProps } from "./Product.constants";
import { useProductListStore } from "../StoreProviders/ProductListProvider/ProductListProvider.hooks";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const Product = ({ data, isCart, isLoading }: ProductProps) => {
  const tCatalogue = useTranslations("catalogue");
  const tCart = useTranslations("cart");

  const [showDetails, setShowDetails] = useState(false);
  const addProductToCart = useProductListStore(
    (state) => state.addProductToCart
  );

  const removeProductFromCart = useProductListStore(
    (state) => state.removeProductFromCart
  );

  if (isLoading || !data) {
    return (
      <div className="border border-slate-300 rounded-xl w-full h-full p-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2 h-full w-full">
          <LoadingSkeleton widthPercent={100} height={200} />
          <LoadingSkeleton widthPercent={100} height={40} />
          <LoadingSkeleton widthPercent={100} />
        </div>
        <div className="flex flex-col h-full w-full gap-3">
          <div className="flex flex-row flex-nowrap gap-1">
            <LoadingSkeleton widthPercent={30} />
            <LoadingSkeleton widthPercent={70} />
          </div>
          <div className="flex flex-row flex-nowrap gap-1">
            <LoadingSkeleton widthPercent={30} />
            <LoadingSkeleton widthPercent={70} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      title={tCatalogue("showDetailsCardTitle")}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowDetails(true);
      }}
      className="w-full relative text-left hover:scale-105 transition-all rounded-xl border border-slate-300 flex flex-col h-full hover:shadow-lg duration-300 cursor-pointer"
    >
      <div className="relative">
        <Image
          src={data.productImage}
          alt={data.productName}
          width={700}
          height={700}
          className="w-full h-full object-cover rounded-tl-xl rounded-tr-xl border-b border-slate-300 min-h-[300px]"
        />
        <AnimatePresence>
          {showDetails ? (
            <motion.div
              className="absolute inset-y-0 bg-white border-b border-slate-300 inset-x-0 rounded-t-xl z-20"
              {...productDetailsAnimationProps}
            >
              <Button
                title={tCatalogue("hideDetailsButtonTitle")}
                className="w-full rounded-t-xl rounded-b-none flex items-center justify-center p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(false);
                }}
              >
                <ChevronDownIcon className="w-7 h-7" />
              </Button>
              <div className="p-2 flex flex-col gap-2">
                <div>
                  <Typography variant="subheading" tag="h3">
                    {tCatalogue("productDescriptionHeader")}
                  </Typography>
                  <Typography variant="body">{data.description}</Typography>
                </div>
                <div>
                  <Typography variant="subheading" tag="h3">
                    {tCatalogue("productDimensionsHeader")}
                  </Typography>
                  <Typography variant="body">{data.dimensions}</Typography>
                </div>
                <div>
                  <Typography variant="subheading" tag="h3">
                    {tCatalogue("productWeightHeader")}
                  </Typography>
                  <Typography variant="body">{data.weight}</Typography>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="p-2 z-30 flex flex-col h-full flex-nowrap gap-8 bg-white rounded-b-xl">
        <div>
          <Typography className="font-semibold" variant="caption">
            {data.manufacturer}
          </Typography>
          <Typography tag="h1" variant="subheading">
            {cropText(data.productName, 24)}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography variant="caption">{data.price}</Typography>
          {isCart ? (
            <Button
              variant="error"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                removeProductFromCart(data._id);
              }}
              title={tCart("removeProductButtonTitle")}
            >
              <TrashIcon className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                addProductToCart(data._id);
              }}
              title={tCatalogue("addToCartButtonTitle")}
            >
              <PlusIcon className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
