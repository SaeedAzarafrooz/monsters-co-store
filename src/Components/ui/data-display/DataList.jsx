import { cn } from "../../../utils/utils";
import { Span } from "../typography";

const SPAN_MAP = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const ALIGN_MAP = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end",
};

export function DataList({ children, className }) {
  return (
    <div className={cn("w-full h-full flex flex-col min-h-0", className)}>
      {children}
    </div>
  );
}

export function DataListContent({ children, className }) {
  return (
    <div className={cn("flex-1 overflow-y-auto pr-2 pt-3 space-y-3", className)}>
      {children}
    </div>
  );
}

export function DataListHeader({ columns = [], className }) {
  return (
    <div
      className={cn(
        "hidden sm:grid grid-cols-12 gap-4 px-4 pb-3 border-b border-border uppercase tracking-wider shrink-0",
        className
      )}
    >
      {columns.map((col, index) => {
        const spanClass = SPAN_MAP[col.span] || "col-span-1";
        const alignClass = ALIGN_MAP[col.align || "left"];

        return (
          <Span
            key={index}
            size="xs"
            weight="bold"
            variant="muted"
            className={cn(spanClass, alignClass)}
          >
            {col.label}
          </Span>
        );
      })}
    </div>
  );
}

export function DataListRow({ children, className }) {
  return (
    <div
      className={cn(
        "flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center bg-background-secondary/60 hover:bg-background-secondary p-4 rounded-xl border border-border transition-colors",
        className
      )}
    >
      {children}
    </div>
  );
}

export function DataListCell({
  children,
  span = 1,
  align = "left",
  className,
}) {
  const spanClass = SPAN_MAP[span] || "col-span-1";
  const alignClass = ALIGN_MAP[align];

  return (
    <div
      className={cn(
        spanClass,
        "flex items-center w-full",
        alignClass,
        className
      )}
    >
      {children}
    </div>
  );
}
