import { forwardRef } from "react";
import { cn } from "../../../utils/utils";

const Separator = forwardRef(({ className, orientation = "horizontal", ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full my-3" : "h-full w-[1px] mx-3",
      className
    )}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };
export default Separator;
