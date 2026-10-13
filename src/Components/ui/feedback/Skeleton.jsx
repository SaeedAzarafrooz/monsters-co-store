import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/utils";

const skeletonVariants = cva("relative overflow-hidden bg-foreground/10", {
  variants: {
    variant: {
      default: "rounded-md",
      circle: "rounded-full",
      card: "rounded-2xl",
    },
    animation: {
      shimmer: "",
      pulse: "animate-pulse",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    animation: "shimmer",
  },
});

export const Skeleton = forwardRef(
  ({ className, variant, animation, children, ...props }, ref) => {
    const isShimmer = animation === "shimmer" || (!animation && skeletonVariants.defaultVariants.animation === "shimmer");

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, animation, className }))}
        {...props}
      >
        {isShimmer && (
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        )}
        {children}
      </div>
    );
  }
);

Skeleton.displayName = "Skeleton";
