import { forwardRef, useState, useRef, useEffect } from "react";
import { cn } from "../../utils/utils";
import { Icon } from "./Icon";
import { Span } from "./typography";

const Select = forwardRef(
  (
    {
      className,
      error,
      value,
      onChange,
      name,
      id,
      placeholder = "Select an option",
      options = [],
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const parsedOptions =
      options.length > 0
        ? options
        : (Array.isArray(children) ? children : [children])
            .filter(Boolean)
            .map((child) => ({
              value: child.props?.value ?? "",
              label: child.props?.children || child.props?.value || "",
            }));

    const selectedOption = parsedOptions.find(
      (opt) => String(opt.value) === String(value)
    );

    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
      }

      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }, [isOpen]);

    const handleSelect = (val) => {
      if (disabled) return;

      setIsOpen(false);

      if (onChange) {
        onChange({
          target: {
            name: name || id,
            value: val,
          },
        });
      }
    };

    return (
      <div ref={containerRef} className="relative w-full">
        {/* Trigger Button */}
        <button
          ref={ref}
          type="button"
          id={id}
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-invalid={!!error}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2 text-sm text-foreground transition-all duration-200 cursor-pointer shadow-sm",
            "hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            isOpen && "border-ring ring-2 ring-ring/30",
            error && "border-destructive focus-visible:ring-destructive/40",
            className
          )}
          {...props}
        >
          <Span
            size="sm"
            variant={!selectedOption?.label ? "muted" : "default"}
            className="truncate"
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Span>

          <Icon
            name="chevron-down"
            size="sm"
            className={cn(
              "w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200",
              isOpen && "rotate-180 text-primary"
            )}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 left-0 right-0 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-border bg-card/95 backdrop-blur-md p-1 shadow-xl animate-in fade-in-0 zoom-in-95">
            {parsedOptions.map((opt) => {
              const isSelected = String(opt.value) === String(value);

              return (
                <div
                  key={String(opt.value)}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "relative flex items-center justify-between w-full px-3 py-2 text-xs font-medium rounded-lg cursor-pointer transition-colors duration-150 select-none",
                    isSelected
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  <Span size="xs" weight={isSelected ? "bold" : "medium"} className="truncate text-inherit">
                    {opt.label}
                  </Span>

                  {isSelected && (
                    <Icon
                      name="check"
                      size="sm"
                      className="shrink-0"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
export default Select;
