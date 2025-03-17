import { apiRoute } from "@/constants/apiRoute";
import { FetchCustomConfig } from "./fetch.types";
import { parseQuery } from "@/utils/query";

const f = async <T>(
  url: keyof typeof apiRoute,
  options: RequestInit & FetchCustomConfig = {}
): Promise<T> => {
  const res = await fetch(`/api/${apiRoute[url]}${parseQuery(options.query)}`, {
    method: options.method ?? "GET",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json() as Promise<T>;
};

export default f;
