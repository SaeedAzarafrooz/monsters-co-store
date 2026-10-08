import { forwardRef } from "react";
import { cn } from "../../utils/utils";

const OptionCard = forwardRef(
  ({ checked, onChange, name, value, title, description, badge, className, ...props }, ref) => {
    return (
      <label
        className={cn(
          "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-150 select-none",
          checked
            ? "border-primary bg-primary/5 ring-1 ring-primary/30"
            : "border-border bg-card hover:bg-background-secondary",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <input
            ref={ref}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className="accent-primary w-4 h-4 cursor-pointer"
            {...props}
          />
          <div>
            <p className="font-bold text-sm text-foreground">{title}</p>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        </div>
        {badge && <div className="shrink-0">{badge}</div>}
      </label>
    );
  }
);
OptionCard.displayName = "OptionCard";


export { OptionCard };
export default OptionCard;