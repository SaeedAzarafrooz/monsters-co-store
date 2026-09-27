import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

// Helper to construct query string with non-empty filters
const buildParams = (pageNumber, filters = {}) => {
  const params = new URLSearchParams({ page: pageNumber });
  Object.entries(filters).forEach(([key, value]) => {
    if (value && typeof value === "string" && value.trim() !== "") {
      params.append(key, value.trim());
    }
  });
  return params.toString();
};

export const useInfiniteScroll = (
  baseURLVar,
  initialPage = 1,
  scrollPageLimit = 3,
  filters = {}
) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPaginationActive, setIsPaginationActive] = useState(false);

  const isFetchingRef = useRef(false);
  const observerRef = useRef(null);

  // Keep a stable ref for filters to avoid unnecessary hook reruns
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  // Primary data fetching routine
  const fetchData = useCallback(
    async (targetPage, currentFilters, append = false) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const queryString = buildParams(targetPage, currentFilters);
        const response = await axios.get(`${baseURLVar}/character/?${queryString}`);
        const results = response.data?.results || [];
        const pages = response.data?.info?.pages || 0;

        setTotalPages(pages);
        setData((prev) => (append ? [...prev, ...results] : results));

        // Switch to pagination if targetPage reaches or exceeds scrollPageLimit
        if (targetPage >= scrollPageLimit || (pages > 0 && targetPage >= pages)) {
          setIsPaginationActive(true);
        }
      } catch (err) {
        if (!append) setData([]);
        setTotalPages(0);
        setError(err.response?.data?.error || "No characters found");
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    },
    [baseURLVar, scrollPageLimit]
  );

  // Reset and fetch fresh data whenever filters change
  const filterKey = JSON.stringify(filters);
  useEffect(() => {
    setPage(initialPage);
    setIsPaginationActive(false);
    fetchData(initialPage, filtersRef.current, false);
  }, [filterKey, initialPage, fetchData]);

  // Handle explicit page changes from Pagination component
  const handlePageChange = useCallback(
    (newPage) => {
      if (
        newPage < 1 ||
        (totalPages > 0 && newPage > totalPages) ||
        isFetchingRef.current
      ) {
        return;
      }
      setPage(newPage);
      fetchData(newPage, filtersRef.current, false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [fetchData, totalPages]
  );

  // Infinite scroll observer: active only before reaching scrollPageLimit
  useEffect(() => {
    if (isPaginationActive || isLoading || totalPages <= 1) return;

    const sentinel = observerRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current && !isLoading) {
          if (page < scrollPageLimit && page < totalPages) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchData(nextPage, filtersRef.current, true);
          } else {
            setIsPaginationActive(true);
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
      observer.disconnect();
    };
  }, [page, isPaginationActive, isLoading, totalPages, scrollPageLimit, fetchData]);

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
