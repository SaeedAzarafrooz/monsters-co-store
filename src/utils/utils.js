import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely without style collisions.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
