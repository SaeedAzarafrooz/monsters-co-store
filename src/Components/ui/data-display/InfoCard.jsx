import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/utils";
import { Stack } from "../layout/Stack";
import { Text } from "../typography/Text";

const infoCardVariants = cva("rounded-xl border border-border/60 bg-muted/40", {
  variants: {
    padding: {
      sm: "px-3 py-2",
      md: "p-3",
    },
  },
  defaultVariants: {
    padding: "sm",
  },
});

const infoCardIconVariants = cva(
  "w-4 h-4 object-contain opacity-90 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]"
);

export const InfoCard = forwardRef(function InfoCard(
  {
    className,
    label,
    value,
    iconSrc,
    iconAlt,
    padding,
    labelProps,
    valueProps,
    children,
    ...props
  },
  ref
) {
  return (
    <div ref={ref} className={cn("flex items-center gap-2", infoCardVariants({ padding }), className)} {...props}>
      {iconSrc ? <img src={iconSrc} alt={iconAlt || String(label || "Info")} className={infoCardIconVariants()} /> : null}

      {children ? (
        children
      ) : (
        <Stack gap="none" className="min-w-0">
          {label != null ? (
            <Text
              as="p"
              size="micro"
              variant="muted"
              className={cn("uppercase font-mono", labelProps?.className)}
              {...labelProps}
            >
              {label}
            </Text>
          ) : null}

          {value != null ? (
            <Text
              as="p"
              size="sm"
              weight="semibold"
              className={cn("truncate", valueProps?.className)}
              {...valueProps}
            >
              {value}
            </Text>
          ) : null}
        </Stack>
      )}
    </div>
  );
});

export default InfoCard;
