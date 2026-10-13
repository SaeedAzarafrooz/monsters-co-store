import { cn } from "../../../utils/utils";
import { Text } from "../typography";

const colSpanMap = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  6: "col-span-6",
  12: "col-span-12",
  full: "col-span-full",
};

export function FormField({
  label,
  id,
  error,
  hint,
  colSpan,
  className,
  children,
}) {
  const spanClass = colSpan
    ? colSpanMap[colSpan] || `col-span-${colSpan}`
    : "w-full";

  return (
    <div className={cn("flex flex-col space-y-1.5", spanClass, className)}>
      {label && (
        <Text
          as="label"
          htmlFor={id}
          size="xs"
          weight="bold"
          className="uppercase tracking-wider text-muted-foreground select-none"
        >
          {label}
        </Text>
      )}
      {children}
      {hint && !error && (
        <Text as="p" size="tiny" variant="muted">
          {hint}
        </Text>
      )}
      {error && (
        <Text
          as="p"
          size="xs"
          weight="semibold"
          variant="destructive"
          className="animate-fadeIn"
        >
          {error}
        </Text>
      )}
    </div>
  );
}

export default FormField;
