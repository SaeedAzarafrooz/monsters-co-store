import loadingGif from "../../assets/LoadingGif.svg";
import Card from "../Card";
import Pagination from "./Pagination";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

function Main() {

  const baseURLVar = "https://rickandmortyapi.com/api";
  const { items, loading, lastPage, addPagination, observerRef, handlePages } = useInfiniteScroll(baseURLVar);

  return (
      <div className="w-full h-full flex justify-center items-start flex-wrap gap-4 bg-slate-600 p-1 sm:p-4 max-w-[1440px] mx-12 lg:mx-24 xl:mx-36 2xl:mx-48">  
        <div className="w-full h-full flex justify-center items-start flex-wrap gap-4 p-1 sm:p-8">
          {items.map((card) => (
            <Card key={card.id} props={card} />
          ))}
        </div>


        {loading && (
          <div className="w-full flex justify-center items-start">
            <img className="h-24" src={loadingGif} alt="loading-image" />
          </div>
        )}

        {!addPagination && <div className="w-full" ref={observerRef} style={{ height: "100px" }}></div>}
        {addPagination && <Pagination handleClickedPage={handlePages} end={lastPage} />}
      </div>
  );
}

export default Main;