import { cx } from "@/utils/style";
import { useButtonClassName } from "./Button.hooks";
import type { ButtonProps } from "./Button.types";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/16/solid";

const Button = ({
  children,
  variant,
  className,
  isLoading,
  ...props
}: ButtonProps) => {
  const variantClassNames = useButtonClassName(variant);

  return (
    <button
      {...props}
      className={cx(
        variantClassNames,
        {
          "opacity-80 cursor-not-allowed animate-pulse": isLoading,
        },
        className
      )}
    >
      {isLoading ? (
        <EllipsisHorizontalCircleIcon className="w-5 h-5 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
