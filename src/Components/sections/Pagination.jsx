import { useState } from "react"
import arrow from '../../assets/ArrowUp.png'

function Pagination({ handleClickedPage, end }) {
    const [currentPage, setCurrentPage] = useState(10)
    const [showBtn, setShowBtn] = useState([9, 10, 11])

    const handleActivePage = (e, param) => {
        console.log("handleActivePage param:", param);

        let current
        if (param === "previous" ) {
            if (currentPage != 1) {
                    setCurrentPage(currentPage - 1)
                current = currentPage - 1 
            }else{
                current = 1 
            }
            

           
            

        } else if (param === "next") {
           if (currentPage != end) {
console.log("currentPage:",currentPage);
console.log("end:",end);
console.log("current:",current);

           
                setCurrentPage(parseInt( currentPage) + 1)
                current = parseInt(currentPage) + 1
        }else{
            current = end 
        }

        } else {
            setCurrentPage(e.target.innerText)
            current = parseInt(e.target.innerText)

        }
        console.log("current:", current);
        console.log("e.target.innerText:", e.target.innerText);

        if (current == 2) {
            setShowBtn([current, current + 1, current + 2])
        } else if (current == 1) {
            setShowBtn([current + 1, current + 2, current + 3])
        } else if (current == end) {
            setShowBtn([current - 3, current - 2, current - 1])
        } else if (current == end - 1) {
            setShowBtn([current - 2, current - 1, current])
        } else {
            setShowBtn([current - 1, current, current + 1])
        }



    }


    return (
        <div className="w-1/5 flex justify-evenly items-center gap-1 text-[#b5dc11] font-semibold sm:w-3/5 sm:gap-4 bg-orange-5">


            <div
                className="justify-center items-center  w-20 h-7 transition-all duration-150 ease-in-out bg-purple-5"
                onClick={(e) => handleActivePage(e, "previous")}>
                <button className="border-2 border-[#FFFFFF00] rounded-xl hover:border-[#b5dc11] transition-all duration-150 ease-in-out px-1 sm:pb-1"
                    onClick={(e) => handleClickedPage(e, "previous")}><p className="hidden sm:block">Previous</p><p className="flex sm:hidden rotate-180 text-3xl">&#10140;</p></button>
            </div>
            {/* <img src={arrow} alt="nextPage-icon" className="flex sm:hidden h-6 cursor-pointer -rotate-90"/> */}





            <div className="flex justify-between items-center gap-4 ">

                <div
                    className="justify-center items-center  w-7 h-7 transition-all duration-150 ease-in-out"
                    onClick={(e) => handleActivePage(e)}>
                    <button className="absolute w-8 h-8  rounded-full border-2 border-[#FFFFFF00] pb-1 hover:border-[#b5dc11]"
                        style={{ backgroundColor: `${currentPage == 1 ? "#b5dc11" : ""}`, color: `${currentPage == 1 ? "black" : ""}` }}
                        onClick={(e) => handleClickedPage(e)}>1</button>
                </div>
                {showBtn.filter((fpage) => (fpage < 4)).length < 2 ? <p className="hidden sm:flex">...</p> : ""}

                {showBtn.map((pageNum, index) => (
                    <div key={index}
                        className="hidden justify-center items-center w-7 h-7 sm:px-[11px] transition-all duration-150 ease-in-out  sm:flex"
                        onClick={(e) => handleActivePage(e)}>
                        <button className="absolute w-8 h-8  rounded-full border-2 border-[#FFFFFF00] pb-1 hover:border-[#b5dc11]"
                            style={{ backgroundColor: `${currentPage == pageNum ? "#b5dc11" : ""}`, color: `${currentPage == pageNum ? "black" : ""}` }}
                            onClick={(e) => handleClickedPage(e)}>{pageNum}</button>
                    </div>
                ))}

                <div className="flex justify-center items-center w-7 h-7 sm:px-[11px] mt-1 transition-all duration-150 ease-in-out sm:hidden"
                    onClick={(e) => handleActivePage(e)}>
                    <button className="absolute w-8 h-8  rounded-full border-2 border-[#FFFFFF00] pb-1 hover:border-[#b5dc11] bg-[#b5dc11] text-black"
                        onClick={(e) => handleClickedPage(e)}>{currentPage}</button>
                </div>

                {showBtn.filter((fpage) => (fpage > end - 3)).length < 2 ? <p className="hidden sm:flex">...</p> : ""}
                <div
                    className="relative justify-center items-center w-7 h-7 transition-all duration-150 ease-in-out "
                    onClick={(e) => handleActivePage(e)}>
                    <button className="absolute w-8 h-8  rounded-full border-2 border-[#FFFFFF00] pb-1 hover:border-[#b5dc11]"
                        style={{ backgroundColor: `${currentPage == end ? "#b5dc11" : ""}`, color: `${currentPage == end ? "black" : ""}` }}
                        onClick={(e) => handleClickedPage(e)}>{end}</button>
                </div>
            </div>


            <div
                className="justify-center items-center  w-7 h-7 transition-all duration-150 ease-in-out"
                onClick={(e) => handleActivePage(e, "next")}>
                <button className="border-2 border-[#FFFFFF00] rounded-xl hover:border-[#b5dc11] transition-all duration-150 ease-in-out px-1 sm:pb-1"
                    onClick={(e) => handleClickedPage(e, "next")}><p className="hidden sm:block">Next</p><p className="flex sm:hidden pb-1 text-3xl">&#10140;</p></button>
            </div>
        </div>
    )
}

export default Pagination