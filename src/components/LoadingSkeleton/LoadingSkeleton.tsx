import { cx } from "@/utils/style";
import { LoadingSkeletonProps } from "./LoadingSkeleton.types";
import { useMemo } from "react";

const LoadingSkeleton = ({
  widthPercent = 100,
  height,
  className,
}: LoadingSkeletonProps) => {
  const finalWidthPercent = useMemo(() => {
    if (widthPercent < 0) {
      return 0;
    }
    if (widthPercent > 100) {
      return 100;
    }

    return widthPercent;
  }, [widthPercent]);

  return (
    <div
      style={{ width: `${finalWidthPercent}%`, height }}
      className={cx("animate-pulse bg-slate-200 rounded-md h-5", className)}
    />
  );
};

export default LoadingSkeleton;
