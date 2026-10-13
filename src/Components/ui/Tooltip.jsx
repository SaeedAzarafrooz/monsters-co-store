import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/utils";

const tooltipBubbleVariants = cva(
  "pointer-events-none absolute z-30 opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 rounded bg-popover text-popover-foreground border border-border px-1.5 py-0.5 text-[10px] font-medium shadow-md whitespace-nowrap",
  {
    variants: {
      side: {
        right: "left-full ml-1.5 top-1/2 -translate-y-1/2",
        left: "right-full mr-1.5 top-1/2 -translate-y-1/2",
        top: "bottom-full mb-1.5 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-1.5 left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export const Tooltip = forwardRef(
  ({ content, children, side = "right", className, triggerClassName, ...props }, ref) => {
    if (!content) return children;

    return (
      <div
        ref={ref}
        className={cn("group/tip relative inline-flex items-center", triggerClassName)}
        {...props}
      >
        {children}
        <span role="tooltip" className={cn(tooltipBubbleVariants({ side }), className)}>
          {content}
        </span>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
