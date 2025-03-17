import type { LinkProps } from "next/link";
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "inline" | "error";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
};

export type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
};
