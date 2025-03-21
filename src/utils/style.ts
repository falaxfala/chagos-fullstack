import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cx = (...classNames: ClassValue[]) => twMerge(clsx(classNames));
