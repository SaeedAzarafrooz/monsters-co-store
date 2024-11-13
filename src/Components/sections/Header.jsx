import { useState } from "react";
import logo from "../../assets/Logo.png";
import guestProfile from "../../assets/guestProfile.png";
import menu from "../../assets/menu.png";
import cross from "../../assets/cross.png";

function Header() {
    const [toggle, setToggle] = useState(false)

    return (
        <div className="z-20 relative w-full min-h-24 flex justify-around items-center px-4  bg-slate-100 drop-shadow-lg md:justify-between lg:px-16 ">
            <a href="/">
                <div className="flex items-center gap-2 text-lg font-extrabold sm:text-2xl sm:gap-4 ">
                    <img className="h-12 sm:h-16" src={logo} alt="Logo-Image" />
                    Monsters Co.
                </div>
            </a>
            <div className="hidden justify-center items-center gap-2 text-base font-bold text-slate-400 md:flex lg:gap-4 lg:text-lg ">
                <div className=" border-b-4 px-2 border-slate-100 hover:border-slate-300 hover:text-slate-500 transition-all duration-200 ease-in-out cursor-pointer">Home</div>
                <div className="text-slate-700 border-b-4 px-2 border-[#b5dc11] cursor-pointer">Products</div>
                <div className=" border-b-4 px-2 border-slate-100 hover:border-slate-300 hover:text-slate-500 transition-all duration-200 ease-in-out cursor-pointer">About us</div>
                <div className=" border-b-4 px-2 border-slate-100 hover:border-slate-300 hover:text-slate-500 transition-all duration-200 ease-in-out cursor-pointer">Contact us</div>
            </div>
            <div>
                <div className="hidden items-center justify-center gap-2 lg:border lg:border-slate-300 rounded-2xl px-3 py-2 md:flex">
                    <img className="h-12 drop-shadow-md" src={guestProfile} alt="guestProfile-image" />
                    <p className="hidden lg:block"> guest</p>
                </div>
            </div>

            <div className="md:hidden">
                <img className=" h-9 cursor-pointer hover:drop-shadow-md hover:rotate-3 hover:scale-125 transition-all duration-200 ease-in-out" onClick={() => { setToggle(!toggle) }} src={menu} alt="menu-icon" />
                {toggle && <div className="absolute flex flex-col items-start justify-start pt-2 top-16 sm:right-20 right-12  bg-white rounded-lg w-56 h-60 drop-shadow-lg ">

                    <div className="flex items-center justify-start gap-2 mx-2 w-[92%] rounded-2xl px-3 py-1 border border-slate-300 ">
                        <img className="h-12 drop-shadow-md" src={guestProfile} alt="guestProfile-image" />
                        <p className=""> guest</p>
                    </div>

                    <div className="flex flex-col justify-center items-start gap-2 my-2 pl-2 text-base font-bold text-slate-400">
                        <div className="px-2 hover:border-slate-300 hover:text-slate-500 transition-all duration-200 ease-in-out cursor-pointer">Home</div>
                        <div className="text-[#b5dc11]  px-2 border-[#b5dc11] cursor-pointer">Products</div>
                        <div className="px-2 hover:border-slate-300 hover:text-slate-500 transition-all duration-200 ease-in-out cursor-pointer">About us</div>
                        <div className="px-2 hover:border-slate-300 hover:text-slate-500 transition-all duration-200 ease-in-out cursor-pointer">Contact us</div>
                    </div>
                    <div className="absolute flex justify-center items-center bottom-0 bg-orange-500 hover:bg-orange-600 w-full h-8 rounded-b-lg cursor-pointer transition-all duration-300 ease-in-out"
                        onClick={() => { setToggle(!toggle) }}>
                        <img className="h-8 drop-shadow-md" src={cross} alt="close-icon" /> </div>
                </div>}

            </div>
        </div>
    )
}

export default Header