import type { TooltipAnchor } from "./Tooltip.types";

export const useTooltipArrowDirectionClassName = (anchor: TooltipAnchor) => {
  const mainDirection = anchor.split(" ")[0];

  switch (mainDirection) {
    case "top":
      return "top-0";
    case "bottom":
      return "bottom-0";
    case "left":
      return "-right-2";
    case "right":
      return "right-0";
    default:
      return "top-0";
  }
};
