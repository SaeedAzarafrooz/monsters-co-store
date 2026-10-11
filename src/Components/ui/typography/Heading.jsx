import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/utils";

const headingVariants = cva(
  "text-foreground tracking-tight transition-colors select-none",
  {
    variants: {
      size: {
        display: "text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight",
        "3xl": "text-3xl sm:text-4xl md:text-5xl font-black",
        "2xl": "text-2xl sm:text-3xl font-extrabold",
        xl: "text-xl sm:text-2xl font-bold",
        lg: "text-lg md:text-xl font-bold",
        base: "text-base font-bold",
        sm: "text-sm font-semibold",
      },
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        gradient: "bg-gradient-to-r from-primary via-purple-400 to-pink-500 bg-clip-text text-transparent",
      },
    },
    defaultVariants: {
      size: "xl",
      variant: "default",
    },
  }
);


const Heading = forwardRef(
  ({ as: Component = "h2", size, variant, className, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, variant, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

export { Heading, headingVariants };
export default Heading;
