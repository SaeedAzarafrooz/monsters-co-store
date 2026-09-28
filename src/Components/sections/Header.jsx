import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/Logo.png";
import guestProfile from "../../assets/guestProfile.png";
import menu from "../../assets/menu.png";
import cross from "../../assets/cross.png";

const NAV_ITEMS = [
    {
        label: "Home",
        path: "/",
        icon: (
            <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
    },
    {
        label: "Products",
        path: "/products",
        icon: (
            <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
    },
    {
        label: "About us",
        path: "/about",
        icon: (
            <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        label: "Contact us",
        path: "/contact",
        icon: (
            <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
];

function Header() {
    const [toggle, setToggle] = useState(false);
    const location = useLocation();
    const menuContainerRef = useRef(null);

    // Refs for sliding indicator
    const navRefs = useRef({});
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

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

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuContainerRef.current && !menuContainerRef.current.contains(e.target)) {
                setToggle(false);
            }
        };
        if (toggle) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [toggle]);

    return (
        <header className="relative z-40 w-full min-h-20 md:min-h-24 flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            {/* 1. Logo Section */}
            <NavLink to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
                <img
                    className="h-10 sm:h-12 md:h-11 lg:h-13 xl:h-14 transition-transform duration-300 group-hover:scale-105"
                    src={logo}
                    alt="Logo"
                />
                <span className="text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-black tracking-wide text-slate-100 group-hover:text-[#b5dc11] transition-colors whitespace-nowrap">
                    Monsters Co.
                </span>
            </NavLink>

            {/* 2. Desktop Navigation with Dynamic Spacing & Scaling */}
            <nav className="relative hidden md:flex items-center justify-center md:gap-2 lg:gap-5 xl:gap-8 md:text-sm lg:text-base xl:text-lg font-bold py-2 shrink-0">
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        ref={(el) => (navRefs.current[item.path] = el)}
                        className={({ isActive }) =>
                            `px-2.5 lg:px-3.5 py-1.5 transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                                isActive
                                    ? "text-[#b5dc11] font-bold"
                                    : "text-slate-300 hover:text-slate-100"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}

                {/* Sliding Active Indicator */}
                <span
                    className="absolute bottom-0 h-[3px] bg-[#b5dc11] rounded-full transition-all duration-300 ease-out pointer-events-none"
                    style={{
                        left: `${indicatorStyle.left}px`,
                        width: `${indicatorStyle.width}px`,
                        opacity: indicatorStyle.opacity,
                    }}
                />
            </nav>

            {/* 3. Account / Menu Section */}
            <div className="relative shrink-0" ref={menuContainerRef}>
                {/* Desktop Profile Pill Trigger */}
                <button
                    type="button"
                    onClick={() => setToggle((prev) => !prev)}
                    className="hidden md:flex items-center gap-2 lg:gap-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl px-2.5 lg:px-3.5 py-1.5 lg:py-2 transition-all cursor-pointer shadow-md group"
                    aria-label="User Account Menu"
                >
                    <div className="relative">
                        <img
                            className="h-8 w-8 lg:h-9 lg:w-9 rounded-full object-cover border border-slate-700 group-hover:border-[#b5dc11] transition-colors"
                            src={guestProfile}
                            alt="Guest"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                    </div>
                    <div className="hidden lg:flex flex-col text-left">
                        <span className="text-xs font-bold text-slate-200 group-hover:text-white">Guest User</span>
                        <span className="text-[10px] text-emerald-400 font-mono">Online</span>
                    </div>
                    <svg
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            toggle ? "rotate-180 text-[#b5dc11]" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Mobile Hamburger Trigger */}
                <button
                    type="button"
                    onClick={() => setToggle((prev) => !prev)}
                    className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <img className="h-6 w-6" src={menu} alt="menu" />
                </button>

                {/* Dropdown Menu */}
                {toggle && (
                    <div className="absolute right-0 top-14 sm:top-14 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 divide-y divide-slate-800">
                        {/* 1. Header Information */}
                        <div className="p-4 flex items-center gap-3 bg-slate-950">
                            <div className="relative shrink-0">
                                <img
                                    className="h-11 w-11 rounded-full object-cover border border-slate-700 shadow-sm"
                                    src={guestProfile}
                                    alt="Guest Profile"
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full" />
                            </div>
                            <div className="flex flex-col truncate">
                                <span className="text-sm font-bold text-white truncate">Guest User</span>
                                <span className="text-xs text-slate-400 truncate">@guest_portal</span>
                                <span className="text-[11px] text-[#b5dc11] hover:underline cursor-pointer mt-0.5">
                                    Manage profile
                                </span>
                            </div>
                        </div>

                        {/* 2. Navigation items (Essential for mobile, handy for desktop) */}
                        <div className="py-2" onClick={() => setToggle(false)}>
                            {NAV_ITEMS.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                                            isActive
                                                ? "bg-[#b5dc11]/10 text-[#b5dc11] border-r-2 border-[#b5dc11]"
                                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        }`
                                    }
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>

                        {/* 3. Settings / Preferences Section */}
                        <div className="py-2 text-sm text-slate-300">
                            {/* Appearance */}
                            <button
                                type="button"
                                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                            >
                                <div className="flex items-center gap-3.5">
                                    <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                    <span className="text-sm">Appearance</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                    <span>Dark</span>
                                    <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>

                            {/* Location */}
                            <button
                                type="button"
                                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                            >
                                <div className="flex items-center gap-3.5">
                                    <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm">Location</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-slate-400">
                                    <span>Dimension C-137</span>
                                    <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {/* 4. Close Action */}
                        <div className="p-2">
                            <button
                                type="button"
                                onClick={() => setToggle(false)}
                                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
                            >
                                <img src={cross} alt="close" className="w-3.5 h-3.5 invert opacity-80" />
                                <span>Close</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
