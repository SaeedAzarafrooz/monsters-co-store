import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const useInfiniteScroll = (baseURLVar, initialPage = 1, scrollPageLimit = 10) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(initialPage);
    const [lastPage, setLastPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addPagination, setAddPagination] = useState(false);
    const observerRef = useRef(null);


    useEffect(() => {
        const fetchProducts = () => {
            setLoading(true);
            setTimeout(() => {
                axios.get(`/character/?page=${page}`, { baseURL: baseURLVar })
                    .then((response) => {
                        const data = response.data.results;
                        setLastPage(response.data.info.pages);
                        setItems((prevData) => (page === 1 || addPagination ? data : [...prevData, ...data]));
                    })
                    .catch((error) => console.error(error))
                    .finally(() => setLoading(false));
            }, 500);
        };

        fetchProducts();
    }, [page, baseURLVar, addPagination]);


    const handlePages = (event, direction = null) => {
        let targetPage = page;

        if (direction === "next" && page < lastPage) {
            targetPage = page + 1;
        } else if (direction === "previous" && page > 1) {
            targetPage = page - 1;
        } else if (!direction && event) {
            targetPage = parseInt(event.target.innerText, 10);
        }

        setPage(targetPage);
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && page < scrollPageLimit) {
                    setPage((prevPage) => prevPage + 1);
                } else if (page >= scrollPageLimit) {
                    setAddPagination(true);
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loading, page, scrollPageLimit]);

    return { items, loading, page, lastPage, addPagination, observerRef, handlePages };
};
