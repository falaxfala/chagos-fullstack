import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import type { TooltipProps } from "./Tooltip.types";
import { useTooltipArrowDirectionClassName } from "./Tooltip.hooks";
import { cx } from "@/utils/style";

const Tooltip = ({ children, trigger, anchor = "bottom" }: TooltipProps) => {
  const directionClassName = useTooltipArrowDirectionClassName(anchor);

  return (
    <div className="relative">
      <Popover>
        <PopoverButton>{trigger}</PopoverButton>
        <PopoverPanel
          anchor={anchor}
          transition
          className="bg-white shadow-2xl border border-slate-300 p-2 rounded-lg flex origin-top flex-col transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {children}
        </PopoverPanel>
      </Popover>
      <div
        className={cx(
          "h-4 w-4 rounded-sm bg-red-300 absolute rotate-45",
          directionClassName
        )}
      />
    </div>
  );
};

export default Tooltip;
