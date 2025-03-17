import { type ReactNode } from "react";

export type TooltipAnchor =
  | "bottom"
  | "bottom end"
  | "bottom start"
  | "left"
  | "left end"
  | "left start"
  | "right"
  | "right end"
  | "right start"
  | "top"
  | "top end"
  | "top start";

export type TooltipProps = {
  trigger: ReactNode;
  children: ReactNode;
  anchor?: TooltipAnchor;
};
