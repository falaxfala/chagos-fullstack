import type { ButtonVariant } from "./Button.types";

export const useButtonClassName = (variant?: ButtonVariant) => {
  let className = "p-3 rounded-md transition-all duration-200 cursor-pointer ";
  const primaryClassNames = "bg-slate-400 hover:bg-slate-500 text-white";

  switch (variant) {
    case "primary":
      className += primaryClassNames;
      break;
    case "inline":
      className += "text-slate-600 hover:text-slate-900 hover:underline";
      break;
    case "error":
      className += "bg-red-500 hover:bg-red-600 text-white";
      break;
    default:
      className += primaryClassNames;
      break;
  }
  return className;
};
