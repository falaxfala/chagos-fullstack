import type { ReactNode } from "react";

export type TypographyTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div";

export type TypographyVariant = "caption" | "body" | "heading" | "subheading";

export type TypographyProps = {
  children: ReactNode;
  tag?: TypographyTag;
  className?: string;
  variant?: TypographyVariant;
};

export type GetTypographyClassNamesArgs = {
  variant: TypographyVariant;
};
