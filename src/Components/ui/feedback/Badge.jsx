import { cva } from "class-variance-authority";
import { cn } from "../../../utils/utils";
import { Span } from "../typography";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-background-secondary text-foreground hover:bg-background-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        success: "border-transparent bg-success/15 text-success border-success/30",
        warning: "border-transparent bg-warning/15 text-warning border-warning/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, children, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <Span size="xs" weight="semibold">
        {children}
      </Span>
    </div>
  );
}

export { Badge, badgeVariants };
export default Badge;
