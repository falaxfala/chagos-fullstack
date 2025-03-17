import { type MotionProps } from "framer-motion";

export const productDetailsAnimationProps: MotionProps = {
  initial: { y: 200, scaleY: 0.1 },
  animate: { y: 0, scaleY: 1 },
  exit: { y: 200, scaleY: 0.1 },
  transition: { type: "spring", bounce: 0, duration: 0.3 },
};
