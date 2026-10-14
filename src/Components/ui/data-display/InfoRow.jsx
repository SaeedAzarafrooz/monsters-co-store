import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/utils";
import { Stack } from "../layout/Stack";
import { Text } from "../typography/Text";

const infoRowVariants = cva("rounded-xl border", {
  variants: {
    variant: {
      default: "bg-muted/30 border-border",
      subtle: "bg-muted/20 border-border/50",
      ghost: "bg-transparent border-border/40",
    },
    padding: {
      none: "p-0",
      sm: "p-2.5",
      default: "p-3",
      lg: "p-4",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
  },
});

export const InfoRow = forwardRef(function InfoRow(
  {
    className,
    variant,
    padding,
    label,
    value,
    labelProps,
    valueProps,
    children,
    ...props
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(infoRowVariants({ variant, padding }), className)}
      {...props}
    >
      {children ? (
        children
      ) : (
        <Stack gap="none" className="min-w-0">
          {label != null && (
            <Text
              as="span"
              size="tiny"
              variant="muted"
              className={cn("font-mono block mb-0.5", labelProps?.className)}
              {...labelProps}
            >
              {label}
            </Text>
          )}

          {value != null && (
            <Text
              as="p"
              size="sm"
              weight="medium"
              className={cn("truncate", valueProps?.className)}
              {...valueProps}
            >
              {value}
            </Text>
          )}
        </Stack>
      )}
    </div>
  );
});

InfoRow.displayName = "InfoRow";

export default InfoRow;
