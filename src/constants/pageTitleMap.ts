import { appRoute } from "./appRoute";

export const pageTitleMap = {
  [appRoute.home]: "catalogue",
  [appRoute.cart]: "cart",
} as const;
