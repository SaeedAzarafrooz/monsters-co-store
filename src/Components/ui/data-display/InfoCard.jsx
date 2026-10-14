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
  "object-contain opacity-90 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)] shrink-0",
  {
    variants: {
      iconSize: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
    },
    defaultVariants: {
      iconSize: "md", // دیفالت روی 20 پیکسل (سایز مناسب و خوانا)
    },
  }
);

export const InfoCard = forwardRef(function InfoCard(
  {
    className,
    label,
    value,
    iconSrc,
    iconAlt,
    iconSize = "md",
    iconClassName,
    padding,
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
      className={cn("flex items-center gap-2", infoCardVariants({ padding }), className)}
      {...props}
    >
      {iconSrc && (
        <img
          src={iconSrc}
          alt={iconAlt || String(label || "Info")}
          className={cn(infoCardIconVariants({ iconSize }), iconClassName)}
        />
      )}

      {children ? (
        children
      ) : (
        <Stack gap="none" className="min-w-0">
          {label != null && (
            <Text
              as="p"
              size="micro"
              variant="muted"
              className={cn("uppercase font-mono", labelProps?.className)}
              {...labelProps}
            >
              {label}
            </Text>
          )}

          {value != null && (
            <Text
              as="p"
              size="sm"
              weight="semibold"
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

InfoCard.displayName = "InfoCard";

export default InfoCard;
