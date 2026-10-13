import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/utils";

const layoutVariants = cva("flex", {
  variants: {
    direction: {
      col: "flex-col",
      row: "flex-row",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-1.5",
      md: "gap-2.5",
      lg: "gap-4",
      xl: "gap-6",
      "2xl": "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    gap: "md",
    wrap: false,
  },
});

/**
 * Stack: Vertical layout primitive (flex-col by default)
 */
export const Stack = forwardRef(
  (
    {
      className,
      gap = "md",
      align = "stretch",
      justify = "start",
      wrap = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          layoutVariants({
            direction: "col",
            gap,
            align,
            justify,
            wrap,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

Stack.displayName = "Stack";

/**
 * Group: Horizontal layout primitive (flex-row by default, items-center)
 */
export const Group = forwardRef(
  (
    {
      className,
      gap = "sm",
      align = "center",
      justify = "start",
      wrap = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          layoutVariants({
            direction: "row",
            gap,
            align,
            justify,
            wrap,
            className,
          })
        )}
        {...props}
      />
    );
  }
);

Group.displayName = "Group";
