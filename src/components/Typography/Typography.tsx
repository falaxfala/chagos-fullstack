import { useMemo } from "react";
import { useTypographyClassName } from "./Typography.hooks";
import type { TypographyProps } from "./Typography.types";
import { cx } from "@/utils/style";

const Typography = ({
  children,
  className,
  tag,
  variant = "body",
}: TypographyProps) => {
  const variantClassNames = useTypographyClassName({ variant });

  const Tag = useMemo(() => {
    return tag || "p";
  }, [tag]);

  return <Tag className={cx(variantClassNames, className)}>{children}</Tag>;
};

export default Typography;
