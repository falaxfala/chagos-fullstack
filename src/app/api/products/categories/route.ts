import { ERROR_MESSAGE_NO_DATA } from "@/constants/error";
import type { Product } from "@/types/Product.types";
import uniqBy from "lodash/uniqBy";

export const GET = async () => {
  const dataRequest = await fetch(
    `${process.env.NEXT_PUBLIC_DATA_SOURCE_URL}/data.json`
  );

  if (!dataRequest.ok) {
    return new Response(ERROR_MESSAGE_NO_DATA, {
      status: 500,
    });
  }

  const data = (await dataRequest.json()) as Product[];

  if (!data || data.length === 0) {
    return new Response(ERROR_MESSAGE_NO_DATA, {
      status: 500,
    });
  }

  const categories = uniqBy(data, "category").map(({ category }) => category);

  return new Response(JSON.stringify(categories), {
    headers: { "Content-Type": "application/json" },
  });
};
