import { forwardRef } from "react";
import { cn } from "../../../utils/utils";

const Input = forwardRef(({ className, type = "text", as, error, ...props }, ref) => {
  const Component = as === "textarea" ? "textarea" : "input";

  return (
    <Component
      type={as === "textarea" ? undefined : type}
      ref={ref}
      aria-invalid={!!error}
      className={cn(
        // Base styling & layout
        "flex w-full rounded-xl border border-border bg-card px-3.5 text-sm text-foreground",
        as === "textarea" ? "py-2.5 resize-none" : "h-10 py-2",
        "placeholder:text-muted-foreground/60",
        
        // Fix Caret: Ensure caret cursor is always vibrant and visible (never black/hidden)
        "caret-foreground selection:bg-primary/30 selection:text-foreground",
        
        // Transitions (only on border, ring and opacity to prevent background flashing)
        "transition-[border-color,box-shadow,opacity] duration-200",
        
        // Hover & focus states
        "hover:border-primary/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
        
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        
        // Aggressive Chromium autofill & autocomplete flash fix
        "[&:-webkit-autofill]:[transition:background-color_9999999s_ease-in-out_0s,color_9999999s_ease-in-out_0s]",
        "[&:-webkit-autofill]:[-webkit-text-fill-color:hsl(var(--foreground))]",
        "[&:-webkit-autofill]:[box-shadow:0_0_0_1000px_hsl(var(--card))_inset_!important]",
        "[&:-webkit-autofill:hover]:[box-shadow:0_0_0_1000px_hsl(var(--card))_inset_!important]",
        "[&:-webkit-autofill:focus]:[box-shadow:0_0_0_1000px_hsl(var(--card))_inset_!important]",
        "[&:-webkit-autofill:active]:[box-shadow:0_0_0_1000px_hsl(var(--card))_inset_!important]",
        "[&:-webkit-autofill]:caret-foreground",
        
        // Error state
        error && "border-destructive focus-visible:ring-destructive/40 focus-visible:border-destructive",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
export default Input;
