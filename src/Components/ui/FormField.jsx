import { cn } from "../../utils/utils";

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
        <label
          htmlFor={id}
          className="text-xs font-bold uppercase tracking-wider text-muted-foreground select-none"
        >
          {label}
        </label>
      )}

      {children}

      {hint && !error && (
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      )}

      {error && (
        <p className="text-xs font-semibold text-destructive animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
