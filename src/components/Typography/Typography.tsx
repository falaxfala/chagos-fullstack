import { getTypographyClassName } from "./Typography.utils";
import type { TypographyProps } from "./Typography.types";
import { cx } from "@/utils/style";

const Typography = ({
  children,
  className,
  tag,
  variant = "body",
}: TypographyProps) => {
  const variantClassNames = getTypographyClassName({ variant });

  const Tag = tag ?? "p";

  return <Tag className={cx(variantClassNames, className)}>{children}</Tag>;
};

export default Typography;
