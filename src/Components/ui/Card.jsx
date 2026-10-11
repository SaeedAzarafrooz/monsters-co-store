import { cva } from "class-variance-authority";
import { cn } from "../../utils/utils";
import { forwardRef } from "react";
import { Heading } from "./typography";

const cardVariants = cva(
  "rounded-xl border border-border bg-card text-card-foreground shadow-card flex flex-col shrink-0",
  {
    variants: {
      fixedLayout: {
        none: "",
        mainPane: "w-full lg:w-[700px] h-[600px] overflow-hidden",
        sidebar: "w-full lg:w-[360px] h-[600px] justify-between",
      },
      padding: {
        none: "p-0",
        default: "p-6",
        lg: "p-6 sm:p-8",
      },
    },
    defaultVariants: {
      fixedLayout: "none",
      padding: "default",
    },
  }
);

export const Card = forwardRef(
  ({ className, fixedLayout, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ fixedLayout, padding, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-0 pb-4 mb-4 border-b border-border", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <Heading
    as="h3"
    size="lg"
    ref={ref}
    className={cn("tracking-tight", className)}
    {...props}
  >
    {children}
  </Heading>
));
CardTitle.displayName = "CardTitle";

export const CardBody = forwardRef(
  ({ className, scrollable = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-full flex-1 min-h-0",
        scrollable && "overflow-y-auto pr-2 space-y-6",
        className
      )}
      {...props}
    />
  )
);
CardBody.displayName = "CardBody";

export const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pt-4 mt-auto border-t border-border", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
