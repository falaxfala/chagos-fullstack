import type { UseTypographyClassNameArgs } from "./Typography.types";

export const useTypographyClassName = ({
  variant,
}: UseTypographyClassNameArgs) => {
  switch (variant) {
    case "body":
      return "text-base";
    case "caption":
      return "text-base text-gray-500";
    case "heading":
      return "text-2xl font-semibold";
    case "subheading":
      return "text-lg font-semibold";
    default:
      return "text-base";
  }
};
