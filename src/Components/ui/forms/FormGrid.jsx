import { forwardRef } from "react";
import { cn } from "../../utils/utils";

export const FormGrid = forwardRef(
  ({ children, columns = 2, className, ...props }, ref) => {
    const colClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    };

    return (
      <div
        ref={ref}
        className={cn("grid gap-4 w-full", colClasses[columns] || colClasses[2], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FormGrid.displayName = "FormGrid";

