import { ERROR_MESSAGE_NO_DATA } from "@/constants/error";
import type { Product } from "@/types/Product.types";
import { extractProductPrice } from "@/utils/product";
import type { NextRequest } from "next/server";

/**
 * Given data was corrupted in case of image URLs.
 * Instead of URL to the image, it contains URL to the product page with HTML extension.
 * Here's my fix/workaround for that.
 */
const imageRewrites = {
  Windows:
    "https://www.baustoffshop.de/media/catalog/product/cache/f06299e7d0d108118744e911a06ab174/m/e/meeth_1x1_white_closed.jpg",
  Plaster:
    "https://www.baustoffshop.de/media/catalog/product/cache/f06299e7d0d108118744e911a06ab174/c/l/claytec_10.113_lehm-oberputz-fei-06_sack.jpg",
  Insulation:
    "https://www.baustoffshop.de/media/catalog/product/cache/f06299e7d0d108118744e911a06ab174/s/t/steico_steico_flex_036_rgb.jpg",
  Tiles:
    "https://www.baustoffshop.de/media/catalog/product/cache/f06299e7d0d108118744e911a06ab174/v/u/vundb_3171ut02.jpg",
  Flooring:
    "https://www.baustoffshop.de/media/catalog/product/cache/f06299e7d0d108118744e911a06ab174/p/r/prima-neu_4876997_prima_parkett_grandiosa_oak_nature_oiled_ver.jpg",
} as const;

export const GET = async (req: NextRequest) => {
  const dataRequest = await fetch(
    `${process.env.NEXT_PUBLIC_DATA_SOURCE_URL}/data.json`
  );

  if (!dataRequest.ok) {
    return new Response(ERROR_MESSAGE_NO_DATA, {
      status: 500,
    });
  }

  const data = (await dataRequest.json()) as Product[];
  const searchParams = req.nextUrl.searchParams;

  const result: Product[] = [];

  for (const product of data) {
    if (searchParams.has("search")) {
      const search = searchParams.get("search") as string;
      if (!product.productName.toLowerCase().includes(search.toLowerCase())) {
        continue;
      }
    }

    if (searchParams.has("category")) {
      const category = searchParams.get("category") as string;
      if (product.category !== category) {
        continue;
      }
    }

    if (searchParams.has("priceRange")) {
      const priceRange = searchParams.get("priceRange") as string;
      const [min, max] = priceRange.split("-").map(Number);
      const parsedPrice = extractProductPrice(product.price);

      if (parsedPrice < min || parsedPrice > max) {
        continue;
      }
    }

    result.push({
      ...product,
      productImage:
        imageRewrites[product.category as keyof typeof imageRewrites],
    });
  }

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
};
