import axios from "axios";
import { useEffect, useRef, useState } from "react";
import loadingGif from "../../assets/LoadingGif.svg"
import Card from "../Card"
import Pagination from "./Pagination";


function Main() {

  const [addPagination, setAddPagination] = useState(false);
  const [baseURLVar, setBaseURLVar] = useState("https://rickandmortyapi.com/api")
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(20);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null)


  const handlePages = (param,param2) => {
    setLoading(true);
    console.log("param.target.innerText:",param.target.innerText);
    console.log("param2:",param2);
    if (param2 === "next") {
      if (page != lastPage) {
        setPage(parseInt(page)+1)
      }
      else{
        setPage(lastPage)
      }
    }else if (param2  === "previous") {
      if (page != 1) {
        
        setPage(page-1)
      }
      else{
        setPage(1)
      }
    }else{
    setPage(param.target.innerText)
  }
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setLoading(false);
  }


  const fetchProducts = (page) => {   
    setLoading(true);

    setTimeout(() => {
      axios.get(`/character/?page=${page}`, { baseURL: `${baseURLVar}` },)
        .then(async function (response) {
          const data = await response.data.results
          setLastPage(response.data.info.pages)
          // || page == 10
          if (addPagination ) {
            setItems(data)
            setLoading(false)
          } else {
            setItems((prevData) => ([...prevData, ...data]))
            setLoading(false)
          }
        })
        .catch(function (error) { console.log(error); })
    }, 100);
  }


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          if (page + 1 <= 10) {
            setPage((prevPage) => prevPage + 1);
          } else {
            setAddPagination(true)
          }
        }
      }, { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
 
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading]);


  useEffect(() => {
    fetchProducts(page);
  }, [page]);


  return (
    <div className="relative flex flex-col w-full h-full justify-center items-center max-w-[2200px] mx-12 lg:mx-24 xl:mx-36 2xl:mx-48 ">

      <div className="w-full h-full flex justify-center items-start flex-wrap gap-4  bg-slate-600 p-1 sm:p-4">

        <div className="w-full h-full flex justify-center items-start flex-wrap gap-4  p-1 sm:p-8">
          {items.map((card) => (
            <Card key={card.id} props={card} />
          ))}
        </div>

        {loading &&
          <div className="w-full flex justify-center items-start">
            <img className="h-24" src={loadingGif} alt="loading-image" />
          </div>}

        {!addPagination && <div className="w-full" ref={observerRef} style={{ height: '100px' }}></div>}
        {addPagination && <Pagination handleClickedPage={handlePages} end={lastPage} />}
      </div>
      
    </div>
  )
}

export default Main