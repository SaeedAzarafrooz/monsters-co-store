import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card, { CardSkeleton } from "../Card";
import Pagination from "../sections/Pagination";
import ProductFilter from "../sections/ProductFilter";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import loadingGif from "../../assets/LoadingGif.svg";
import BackToTop from "../BackToTop";

const BASE_URL = "https://rickandmortyapi.com/api";
const SKELETON_COUNT = 8;

// English comment: Map URL bundle query params to corresponding filter criteria
const BUNDLE_MAP = {
  rick: { name: "Rick", status: "", species: "", gender: "" },
  morty: { name: "Morty", status: "", species: "", gender: "" },
  alien: { name: "", status: "", species: "Alien", gender: "" },
  human: { name: "", status: "Alive", species: "Human", gender: "" },
};

export default function Main() {
  const [searchParams] = useSearchParams();
  const initialBundle = searchParams.get("bundle")?.toLowerCase();

  const [filters, setFilters] = useState(
    initialBundle && BUNDLE_MAP[initialBundle]
      ? BUNDLE_MAP[initialBundle]
      : {
          name: "",
          status: "",
          species: "",
          gender: "",
        }
  );

  // English comment: Update filters if bundle query parameter in URL changes
  useEffect(() => {
    const bundle = searchParams.get("bundle")?.toLowerCase();
    if (bundle && BUNDLE_MAP[bundle]) {
      setFilters(BUNDLE_MAP[bundle]);
    }
  }, [searchParams]);

  const {
    data,
    page,
    totalPages,
    isLoading,
    error,
    isPaginationActive,
    observerRef,
    handlePageChange,
  } = useInfiniteScroll(BASE_URL, 1, 3, filters);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({ name: "", status: "", species: "", gender: "" });
  };

  return (
    <main className="w-full min-h-screen bg-slate-900 py-6 px-3 sm:px-6">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start gap-6">
        
        {/* Sticky Sidebar Filter */}
        <ProductFilter
          activeFilters={filters}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
        />

        {/* Product Cards Area */}
        <div className="flex-1 w-full flex flex-col items-center">
          <div className="w-full flex justify-center items-stretch flex-wrap gap-4">
            
            {/* Full grid skeleton for pagination page changes */}
            {isPaginationActive && isLoading && (
              Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <CardSkeleton key={`page-skel-${index}`} />
              ))
            )}

            {/* Actual character cards */}
            {(!isPaginationActive || !isLoading) && data && data.length > 0 && (
              data.map((character) => (
                <Card key={character.id} props={character} />
              ))
            )}

            {/* Bottom skeletons during infinite scroll appending */}
            {!isPaginationActive && isLoading && (
              Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={`infinite-skel-${index}`} />
              ))
            )}

            {/* Empty results state */}
            {!isLoading && (!data || data.length === 0) && (
              <div className="w-full text-center py-20 text-slate-400 space-y-3">
                <span className="text-5xl block">🛸</span>
                <p className="text-base font-semibold text-slate-300">
                  {error || "No sticker characters match these filters!"}
                </p>
                <p className="text-xs text-slate-500">
                  Try clearing some criteria or selecting a different bundle.
                </p>
              </div>
            )}
          </div>

          {/* Infinite scroll loading spinner */}
          {!isPaginationActive && isLoading && (
            <div className="w-full flex justify-center items-center py-6">
              <img className="h-12 w-12" src={loadingGif} alt="Loading..." />
            </div>
          )}

          {/* Sentinel trigger element for IntersectionObserver */}
          {!isPaginationActive && totalPages > 1 && (
            <div ref={observerRef} className="w-full h-10" aria-hidden="true" />
          )}

          {/* Pagination controls when scroll limit is reached or page is switched */}
          {isPaginationActive && totalPages > 1 && (
            <div className="w-full flex justify-center py-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

      </div>
      <BackToTop threshold={500} />
    </main>
  );
}
