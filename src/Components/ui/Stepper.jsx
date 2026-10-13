import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/utils";
import { Icon } from "./Icon";

const stepIndicatorVariants = cva(
  "flex items-center justify-center border-2 transition-all duration-200 select-none shrink-0",
  {
    variants: {
      shape: {
        rounded: "rounded-xl",
        circle: "rounded-full",
      },
      size: {
        sm: "w-8 h-8 text-xs",
        md: "w-9 h-9 text-xs font-bold",
        lg: "w-12 h-12 text-sm font-semibold",
      },
      status: {
        complete: "border-primary bg-primary text-primary-foreground shadow-sm",
        current: "border-primary bg-card text-primary shadow-sm shadow-primary/20",
        upcoming: "border-border bg-card text-muted-foreground",
      },
    },
    defaultVariants: {
      shape: "rounded",
      size: "lg",
      status: "upcoming",
    },
  }
);

export const Stepper = forwardRef(
  (
    {
      steps = [],
      currentStep = 0,
      orientation = "horizontal",
      shape = "rounded",
      size = "lg",
      showLabels = false,
      showTooltips = true,
      className,
      ...props
    },
    ref
  ) => {
    const totalSteps = steps.length;

    if (orientation === "vertical") {
      return (
        <ol ref={ref} className={cn("space-y-6 select-none", className)} {...props}>
          {steps.map((step, index) => {
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;
            const isLast = index === totalSteps - 1;
            const status = isComplete ? "complete" : isCurrent ? "current" : "upcoming";

            const label = typeof step === "string" ? step : step.title;
            const description = typeof step === "object" ? step.description : null;

            return (
              <li key={label || index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={cn(stepIndicatorVariants({ shape, size: "md", status }))}>
                    {isComplete ? (
                      <Icon name="check" size="sm" className="stroke-[2.5]" />
                    ) : typeof step === "object" && step.icon ? (
                      step.icon
                    ) : (
                      index + 1
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className={cn(
                        "mt-2 min-h-8 w-0.5 rounded-full transition-colors duration-200",
                        isComplete ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>

                <div className="pt-1.5 flex flex-col">
                  <span
                    className={cn(
                      "text-sm font-bold transition-colors",
                      isCurrent || isComplete ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                  {description && (
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {description}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      );
    }

    // Horizontal orientation (e.g., Checkout)
    const progressPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;
    const offsetPx = size === "lg" ? 48 : size === "md" ? 36 : 32;

    return (
      <div ref={ref} className={cn("relative px-6 select-none", className)} {...props}>
        {/* Base Track */}
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1.5 bg-background-secondary rounded-full" />

        {/* Progress Fill */}
        <div
          className="absolute top-1/2 left-6 -translate-y-1/2 h-1.5 bg-primary rounded-full transition-all duration-300 ease-out"
          style={{
            width:
              progressPercent === 0
                ? "0px"
                : `calc(${progressPercent}% - ${(progressPercent * offsetPx) / 100}px)`,
          }}
        />

        {/* Step Nodes */}
        <div className="relative flex justify-between items-center z-10">
          {steps.map((step, index) => {
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;
            const status = isComplete ? "complete" : isCurrent ? "current" : "upcoming";

            const label = typeof step === "string" ? step : step.title;

            return (
              <div key={label || index} className="relative group flex flex-col items-center">
                <div className={cn(stepIndicatorVariants({ shape, size, status }))}>
                  {isComplete ? (
                    <Icon name="check" size="sm" className="stroke-[2.5]" />
                  ) : typeof step === "object" && step.icon ? (
                    step.icon
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Optional persistent label below */}
                {showLabels && label && (
                  <span
                    className={cn(
                      "text-xs font-medium mt-2 transition-colors",
                      isCurrent || isComplete ? "text-foreground font-semibold" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                )}

                {/* Hover Tooltip (Default in Checkout) */}
                {showTooltips && label && (
                  <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-background-secondary text-foreground text-xs font-semibold px-2.5 py-1 rounded-md shadow-md border border-border">
                    {label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

Stepper.displayName = "Stepper";
