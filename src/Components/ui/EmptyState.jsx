import { cn } from "../../utils/utils";
import { Heading, Text } from "./typography";

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
      {title && (
        <Heading as="h3" size="xl" className="mb-2">
          {title}
        </Heading>
      )}
      {description && (
        <Text variant="muted" size="base" className="max-w-sm mb-6 leading-relaxed">
          {description}
        </Text>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

export default EmptyState;
