import { forwardRef } from "react";
import { cn } from "../../utils/utils";

const Container = forwardRef(({ className, size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "max-w-3xl",
    default: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div
      ref={ref}
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}
      {...props}
    />
  );
});

Container.displayName = "Container";

export { Container };
