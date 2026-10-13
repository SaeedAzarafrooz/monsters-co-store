import { useEffect, forwardRef } from "react";
import { createPortal } from "react-dom";
import { cva } from "class-variance-authority";
import { cn } from "../../../utils/utils";
import { Icon } from "../data-display/Icon";
import { Button } from "./Button";

const modalOverlayVariants = cva(
  "fixed inset-0 z-50 flex p-3 sm:p-4 transition-all duration-300",
  {
    variants: {
      position: {
        center: "items-center justify-center",
        top: "items-start justify-center pt-16 sm:items-center sm:pt-0",
      },
      backdrop: {
        blur: "bg-black/70 backdrop-blur-md",
        subtle: "bg-background/80 backdrop-blur-sm",
        dark: "bg-black/60",
      },
    },
    defaultVariants: {
      position: "center",
      backdrop: "blur",
    },
  }
);

const modalContentVariants = cva(
  "relative w-full flex flex-col bg-card border border-border shadow-2xl text-foreground overflow-hidden transition-all duration-200 animate-in fade-in zoom-in-95",
  {
    variants: {
      size: {
        sm: "max-w-sm rounded-2xl",
        md: "max-w-md rounded-2xl",
        lg: "max-w-lg rounded-2xl",
        xl: "max-w-2xl rounded-2xl",
        "4xl": "max-w-4xl rounded-3xl",
        full: "max-w-full h-full rounded-none",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const Modal = ({
  isOpen = true,
  onClose,
  children,
  position = "center",
  backdrop = "blur",
  closeOnEsc = true,
  closeOnOverlayClick = true,
  className,
  containerClassName,
  ...props
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (closeOnEsc && event.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal") || document.body;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick && onClose) {
      onClose();
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
      className={cn(modalOverlayVariants({ position, backdrop }), containerClassName)}
      {...props}
    >
      {children}
    </div>,
    modalRoot
  );
};

export const ModalContent = forwardRef(
  ({ className, size, children, onClick, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
        className={cn(modalContentVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ModalContent.displayName = "ModalContent";

export const ModalHeader = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between px-6 py-4 border-b border-border/40 bg-card/70 backdrop-blur-md",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
ModalHeader.displayName = "ModalHeader";

export const ModalTitle = forwardRef(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg md:text-xl font-bold truncate text-foreground", className)}
    {...props}
  >
    {children}
  </h2>
));
ModalTitle.displayName = "ModalTitle";

export const ModalBody = forwardRef(
  ({ className, scrollable = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-5 sm:p-6",
        scrollable && "overflow-y-auto max-h-[calc(90vh-140px)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ModalBody.displayName = "ModalBody";

export const ModalFooter = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-end gap-3 px-6 py-4 border-t border-border/40 bg-card/50",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
ModalFooter.displayName = "ModalFooter";

export const ModalCloseButton = forwardRef(
  ({ className, onClick, ...props }, ref) => (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn("h-8 w-8 rounded-full text-muted-foreground hover:text-foreground", className)}
      aria-label="Close modal"
      {...props}
    >
      <Icon name="close" className="h-4 w-4" />
    </Button>
  )
);
ModalCloseButton.displayName = "ModalCloseButton";
