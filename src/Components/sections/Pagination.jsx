
function Pagination({ currentPage, totalPages, onPageChange }) {
  // Helper to calculate visible page numbers around current page
  const getPageNumbers = () => {
    const pages = [];
    const delta = 1; // Number of pages to show before and after current

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
      className="flex items-center justify-center gap-1 sm:gap-2 text-[#b5dc11] font-semibold select-none"
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1 rounded-xl border border-transparent hover:border-[#b5dc11] disabled:opacity-30 disabled:hover:border-transparent transition-all duration-150"
      >
        <span className="hidden sm:inline">Previous</span>
        <span className="inline sm:hidden text-xl">&#10140;</span>
      </button>

      {/* First Page */}
      <button
        onClick={() => onPageChange(1)}
        className={`w-8 h-8 rounded-full border border-transparent hover:border-[#b5dc11] transition-all duration-150 ${
          currentPage === 1 ? "bg-[#b5dc11] text-black" : ""
        }`}
      >
        1
      </button>

      {/* Start Ellipsis */}
      {currentPage > 3 && <span className="px-1 text-slate-400">...</span>}

      {/* Dynamic Mid Pages */}
      {visiblePages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`w-8 h-8 rounded-full border border-transparent hover:border-[#b5dc11] transition-all duration-150 ${
            currentPage === pageNum ? "bg-[#b5dc11] text-black" : ""
          }`}
        >
          {pageNum}
        </button>
      ))}

      {/* End Ellipsis */}
      {currentPage < totalPages - 2 && (
        <span className="px-1 text-slate-400">...</span>
      )}

      {/* Last Page */}
      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={`w-8 h-8 rounded-full border border-transparent hover:border-[#b5dc11] transition-all duration-150 ${
            currentPage === totalPages ? "bg-[#b5dc11] text-black" : ""
          }`}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 rounded-xl border border-transparent hover:border-[#b5dc11] disabled:opacity-30 disabled:hover:border-transparent transition-all duration-150"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="inline sm:hidden text-xl">&#10140;</span>
      </button>
    </nav>
  );
}

export default Pagination;
