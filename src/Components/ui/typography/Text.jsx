import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/utils";

const textVariants = cva("transition-colors", {
  variants: {
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive",
      success: "text-success",
      warning: "text-warning",
      inherit: "text-inherit",
    },
    size: {
      lg: "text-base sm:text-lg leading-relaxed",
      base: "text-sm sm:text-base leading-relaxed",
      sm: "text-xs sm:text-sm leading-normal",
      xs: "text-xs leading-normal",
      tiny: "text-[11px] leading-tight",
      micro: "text-[10px] leading-tight",
      inherit: "text-inherit",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "normal",
  },
});

const Text = forwardRef(
  ({ as: Component = "p", variant, size, weight, className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(textVariants({ variant, size, weight, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export { Text, textVariants };
export default Text;
