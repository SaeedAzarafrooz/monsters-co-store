import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/utils";
import { Button, Icon } from "../index";
import crossIcon from "../../../assets/cross.png";

const quantityStepperVariants = cva(
  "relative overflow-hidden transition-all select-none",
  {
    variants: {
      size: {
        default: "w-[82px] h-8 rounded-xl text-xs",
        sm: "w-[76px] h-7 rounded-lg text-xs",
        lg: "w-24 h-9 rounded-xl text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const QuantityStepper = forwardRef(
  (
    {
      quantity = 0,
      onIncrease,
      onDecrease,
      addLabel = "Add",
      removeIconSrc = crossIcon,
      size = "default",
      className,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const isAdded = quantity > 0;

    const handleAddClick = (e) => {
      e.stopPropagation();
      if (!disabled && onIncrease) {
        onIncrease(e);
      }
    };

    const handleDecreaseClick = (e) => {
      e.stopPropagation();
      if (!disabled && onDecrease) {
        onDecrease(e);
      }
    };

    const handleIncreaseClick = (e) => {
      e.stopPropagation();
      if (!disabled && onIncrease) {
        onIncrease(e);
      }
    };

    return (
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className={cn(quantityStepperVariants({ size }), className)}
        {...props}
      >
        {/* Layer 1: Add Button */}
        <Button
          type="button"
          size="sm"
          disabled={disabled}
          onClick={handleAddClick}
          className={cn(
            "absolute inset-0 w-full h-full rounded-xl gap-1.5 font-semibold shadow-sm p-0 justify-center transition-all duration-300 ease-out",
            isAdded
              ? "translate-x-full opacity-0 pointer-events-none"
              : "translate-x-0 opacity-100 pointer-events-auto",
          )}
          title="Add to cart"
        >
          <Icon name="cart" size="md" />
          <span>{addLabel}</span>
        </Button>

        {/* Layer 2: Quantity Controls */}
        <div
          className={cn(
            "absolute inset-0 flex items-center h-full w-full bg-muted/60 border border-border rounded-xl shadow-inner transition-all duration-300 ease-out",
            isAdded
              ? "translate-x-0 opacity-100 pointer-events-auto"
              : "-translate-x-full opacity-0 pointer-events-none",
          )}
        >
          {/* Decrease / Remove Button */}
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            onClick={handleDecreaseClick}
            className="group/dec h-full w-7 p-0 flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/15 rounded-l-xl rounded-r-none transition-colors shrink-0"
            title={quantity === 1 ? "Remove" : "Decrease"}
          >
            {quantity === 1 ? (
              removeIconSrc ? (
                <img
                  src={removeIconSrc}
                  alt="Remove"
                  className="w-3 h-3 object-contain opacity-70 group-hover/dec:opacity-100 transition-opacity"
                />
              ) : (
                <Icon name="close" size="xs" />
              )
            ) : (
              <Icon name="minus" size="xs" />
            )}
          </Button>

          {/* Count Display */}
          <span className="text-xs font-bold font-mono text-foreground px-1 select-none min-w-[24px] text-center leading-none">
            {quantity}
          </span>

          {/* Increase Button */}
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            onClick={handleIncreaseClick}
            className="group/inc h-full w-7 p-0 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/15 rounded-r-xl rounded-l-none transition-colors shrink-0"
            title="Increase"
          >
            <Icon name="plus" size="xs" />
          </Button>
        </div>
      </div>
    );
  },
);

QuantityStepper.displayName = "QuantityStepper";
