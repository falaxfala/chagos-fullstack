import { cx } from "@/utils/style";
import type { ButtonVariant } from "./Button.types";

export const getButtonClassName = (variant?: ButtonVariant) => {
  const className =
    "p-3 rounded-md transition-all duration-200 cursor-pointer ";
  const primaryClassNames = "bg-slate-400 hover:bg-slate-500 text-white";

  switch (variant) {
    case "primary":
      return cx(className, primaryClassNames);
    case "inline":
      return cx(
        className,
        "text-slate-600 hover:text-slate-900 hover:underline"
      );
    case "error":
      return cx(className, "bg-red-500 hover:bg-red-600 text-white");
    default:
      return cx(className, primaryClassNames);
  }
};
