import { forwardRef } from "react";
import { cn } from "../../../utils/utils";
import { Icon } from "../data-display/Icon";

export const Pagination = forwardRef(
  ({ currentPage = 1, totalPages = 1, onPageChange, className, ...props }, ref) => {
    const getPageNumbers = () => {
      const pages = [];
      const delta = 1;
      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        pages.push(i);
      }
      return pages;
    };

    const visiblePages = getPageNumbers();

    return (
      <nav
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-1 sm:gap-2 text-primary font-semibold select-none",
          className
        )}
        aria-label="Pagination Navigation"
        {...props}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1 rounded-xl border border-transparent hover:border-primary hover:bg-primary/10 disabled:opacity-30 disabled:hover:border-transparent disabled:hover:bg-transparent transition-all duration-150 cursor-pointer disabled:cursor-not-allowed flex items-center gap-1"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden flex items-center justify-center">
            <Icon name="arrowLeft" size="sm" />
          </span>
        </button>

        {/* First Page Button */}
        <button
          type="button"
          onClick={() => onPageChange?.(1)}
          className={cn(
            "w-8 h-8 rounded-full border border-transparent hover:border-primary hover:bg-primary/10 transition-all duration-150 cursor-pointer flex items-center justify-center",
            currentPage === 1 && "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20"
          )}
        >
          1
        </button>

        {/* Start Ellipsis */}
        {currentPage > 3 && <span className="px-1 text-muted-foreground">...</span>}

        {/* Middle Visible Pages */}
        {visiblePages.map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange?.(pageNum)}
            className={cn(
              "w-8 h-8 rounded-full border border-transparent hover:border-primary hover:bg-primary/10 transition-all duration-150 cursor-pointer flex items-center justify-center",
              currentPage === pageNum &&
                "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20"
            )}
          >
            {pageNum}
          </button>
        ))}

        {/* End Ellipsis */}
        {currentPage < totalPages - 2 && (
          <span className="px-1 text-muted-foreground">...</span>
        )}

        {/* Last Page Button */}
        {totalPages > 1 && (
          <button
            type="button"
            onClick={() => onPageChange?.(totalPages)}
            className={cn(
              "w-8 h-8 rounded-full border border-transparent hover:border-primary hover:bg-primary/10 transition-all duration-150 cursor-pointer flex items-center justify-center",
              currentPage === totalPages &&
                "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20"
            )}
          >
            {totalPages}
          </button>
        )}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1 rounded-xl border border-transparent hover:border-primary hover:bg-primary/10 disabled:opacity-30 disabled:hover:border-transparent disabled:hover:bg-transparent transition-all duration-150 cursor-pointer disabled:cursor-not-allowed flex items-center gap-1"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden flex items-center justify-center">
            <Icon name="arrowRight" size="sm" />
          </span>
        </button>
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";
export default Pagination;
