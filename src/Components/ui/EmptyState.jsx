import { cn } from "../../utils/utils";

export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center text-center p-6",
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 shrink-0">
          {icon}
        </div>
      )}
      {title && <h3 className="text-xl font-extrabold text-foreground mb-2">{title}</h3>}
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
