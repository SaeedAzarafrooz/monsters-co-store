import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/Logo.png";
import guestProfile from "../../assets/guestProfile.png";
import menu from "../../assets/menu.png";
import cross from "../../assets/cross.png";

const NAV_ITEMS = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About us", path: "/about" },
    { label: "Contact us", path: "/contact" },
];

function Header() {
    const [toggle, setToggle] = useState(false);
    const location = useLocation();

    // Refs for tracking navigation item positions
    const navRefs = useRef({});
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    // Update sliding indicator position on route change or resize
    useEffect(() => {
        const updateIndicator = () => {
            const activeElement = navRefs.current[location.pathname];
            if (activeElement) {
                setIndicatorStyle({
                    left: activeElement.offsetLeft,
                    width: activeElement.offsetWidth,
                    opacity: 1,
                });
            } else {
                setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
            }
        };

        updateIndicator();
        window.addEventListener("resize", updateIndicator);
        return () => window.removeEventListener("resize", updateIndicator);
    }, [location.pathname]);

    return (
        <header className="z-20 relative w-full min-h-24 flex justify-around items-center px-4 border-b border-slate-700 drop-shadow-lg md:justify-between lg:px-16">
            <NavLink to="/">
                <div className="flex items-center gap-2 text-lg font-extrabold sm:text-2xl sm:gap-4 text-slate-50">
                    <img className="h-12 sm:h-16" src={logo} alt="Logo-Image" />
                    Monsters Co.
                </div>
            </NavLink>
            
            {/* Desktop Navigation with Sliding Underline Indicator */}
            <nav className="relative hidden justify-center items-center gap-4 text-base font-bold md:flex lg:gap-6 lg:text-lg py-2">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        ref={(el) => (navRefs.current[item.path] = el)}
                        className={({ isActive }) =>
                            `px-3 py-1 transition-colors duration-200 cursor-pointer ${
                                isActive
                                    ? "text-[#b5dc11] font-bold"
                                    : "text-slate-300 hover:text-slate-100"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}

                {/* Animated Moving Underline */}
                <span
                    className="absolute bottom-0 h-[3px] bg-[#b5dc11] rounded-full transition-all duration-300 ease-out pointer-events-none"
                    style={{
                        left: `${indicatorStyle.left}px`,
                        width: `${indicatorStyle.width}px`,
                        opacity: indicatorStyle.opacity,
                    }}
                />
            </nav>

            {/* Profile Section */}
            <div className="hidden bg-slate-700 items-center justify-center gap-2 lg:border lg:border-slate-600 rounded-2xl px-3 py-2 md:flex">
                <img className="h-12 drop-shadow-md" src={guestProfile} alt="guestProfile-image" />
                <p className="hidden lg:block text-slate-50 font-medium">guest</p>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
                <img 
                    className="h-9 cursor-pointer" 
                    onClick={() => setToggle(!toggle)} 
                    src={menu} 
                    alt="menu-icon" 
                />
                
                {toggle && (
                    <div className="absolute flex flex-col items-start justify-start pt-2 top-20 right-4 bg-slate-900 border border-slate-700 rounded-lg w-56 drop-shadow-2xl overflow-hidden z-50">
                        <div className="flex items-center justify-start gap-2 bg-slate-800 mx-2 w-[92%] rounded-xl px-3 py-2 border border-slate-700">
                            <img className="h-10 drop-shadow-md" src={guestProfile} alt="guestProfile" />
                            <p className="text-slate-50 text-sm">guest</p>
                        </div>

                        <div 
                            className="flex flex-col justify-center items-start gap-2 my-3 px-4 text-base font-medium w-full"
                            onClick={() => setToggle(false)}
                        >
                            {NAV_ITEMS.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `w-full py-1 transition-colors duration-200 cursor-pointer ${
                                            isActive
                                                ? "text-[#b5dc11] font-bold"
                                                : "text-slate-300 hover:text-slate-100"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                        
                        <button 
                            type="button"
                            className="flex justify-center items-center bg-orange-600 hover:bg-orange-700 w-full h-9 cursor-pointer transition-colors"
                            onClick={() => setToggle(false)}
                        >
                            <img className="h-6 drop-shadow-md" src={cross} alt="close-icon" />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
