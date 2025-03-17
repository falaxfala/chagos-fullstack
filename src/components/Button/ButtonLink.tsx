import Link from "next/link";
import type { ButtonLinkProps } from "./Button.types";
import { useButtonClassName } from "./Button.hooks";
import { cx } from "@/utils/style";

const ButtonLink = ({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonLinkProps) => {
  const variantClassNames = useButtonClassName(variant);

  return (
    <Link
      {...props}
      className={cx(
        "flex items-center justify-center",
        variantClassNames,
        className
      )}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
