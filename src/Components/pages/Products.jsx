import loadingGif from "../../assets/LoadingGif.svg";
import Card, { CardSkeleton } from "../Card";
import Pagination from "../sections/Pagination";
import BackToTop from "../BackToTop";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useState } from "react";
import CharacterModal from "../CharacterModal";

const BASE_URL = "https://rickandmortyapi.com/api";
const SKELETON_COUNT = 20;

function Products() {
  const {
    data,
    page,
    totalPages,
    isLoading,
    error,
    isPaginationActive,
    observerRef,
    handlePageChange,
  } = useInfiniteScroll(BASE_URL);

    const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <main className="w-full flex flex-col items-center min-h-screen bg-slate-600 p-2 sm:p-6">
      {/* Cards Grid */}
      <div className="w-full max-w-[1440px] flex justify-center items-stretch flex-wrap gap-4 p-2 sm:p-6">
        {/* If pagination is active and fetching, show only skeletons to replace page content */}
        {isPaginationActive && isLoading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <CardSkeleton key={`page-skeleton-${index}`} />
          ))
        ) : (
          <>
            {/* Render loaded cards */}
            {data.map((character) => (
              <Card key={character.id} props={character} onClick={() => setSelectedCharacter(character)}/>
            ))}

            {/* In infinite scroll mode, append skeletons at the bottom */}
            {!isPaginationActive &&
              isLoading &&
              Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <CardSkeleton key={`infinite-skeleton-${index}`} />
              ))}
          </>
        )}
      </div>

      {/* Error Feedback */}
      {error && (
        <div className="w-full my-4 text-center text-red-300 bg-red-900/40 p-3 rounded-lg max-w-md">
          {error}
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="w-full flex justify-center items-center py-6">
          <img className="h-16 w-16" src={loadingGif} alt="Loading indicators" />
        </div>
      )}
      
      {/* Render Character Modal */}
      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}

      {/* Infinite Scroll Sentinel element */}
      {!isPaginationActive && (
        <div ref={observerRef} className="w-full h-10" aria-hidden="true" />
      )}

      {/* Pagination Controls */}
      {isPaginationActive && (
        <div className="w-full flex justify-center py-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <BackToTop threshold={500} />
    </main>
  );
}

export default Products;
