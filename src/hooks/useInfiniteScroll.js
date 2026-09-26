import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

export const useInfiniteScroll = (url, initialPage = 1, scrollPageLimit = 3, delayMs = 500) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPaginationActive, setIsPaginationActive] = useState(false);

  // Guard against concurrent or overlapping fetch operations
  const isFetchingRef = useRef(false);
  const observerRef = useRef(null);

  // Fetch character records with built-in artificial delay for smoother visual feedback
  const fetchData = useCallback(
    async (targetPage, append = false) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      setIsLoading(true);
      setError(null);

      try {
        if (delayMs > 0) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }

        const response = await axios.get(`${url}/character/?page=${targetPage}`);
        const newItems = response.data?.results || [];
        const pagesCount = response.data?.info?.pages || 0;

        setTotalPages(pagesCount);
        setData((prev) => (append ? [...prev, ...newItems] : newItems));
      } catch (err) {
        // Only set error if it wasn't triggered by reaching the boundary
        setError(err.response?.data?.error || "Failed to fetch character data");
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    },
    [url, delayMs]
  );

  // Initial fetch on mount
  useEffect(() => {
    fetchData(1, false);
  }, [fetchData]);

  // Handle page changes when pagination controls are used
  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage < 1 || (totalPages && newPage > totalPages) || isFetchingRef.current) return;
      setPage(newPage);
      fetchData(newPage, false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [fetchData, totalPages]
  );

  // Observe scroll position and trigger next page fetch
  useEffect(() => {
    if (isPaginationActive) return;

    const currentSentinel = observerRef.current;
    if (!currentSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isFetchingRef.current && !isLoading) {
          if (page < scrollPageLimit) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchData(nextPage, true);
          } else {
            // Reached limit cleanly: enable pagination and clear any stale error state
            setError(null);
            setIsPaginationActive(true);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
      observer.disconnect();
    };
  }, [page, isPaginationActive, isLoading, scrollPageLimit, fetchData]);

  return {
    data,
    page,
    totalPages,
    isLoading,
    error,
    isPaginationActive,
    observerRef,
    handlePageChange,
  };
};