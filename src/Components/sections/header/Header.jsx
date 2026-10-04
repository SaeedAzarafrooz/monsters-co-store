import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import logo from "../../../assets/Logo.png";
import guestProfile from "../../../assets/guestProfile.png";
import CartDropdown from "./CartDropdown";
import AccountDropdown from "./AccountDropdown";
import DesktopNavbar from "./DesktopNavbar";

const NAV_ITEMS = [
  {
    label: "Home",
    path: "/",
    icon: (
      <svg
        className="w-5 h-5 opacity-80"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    label: "Products",
    path: "/products",
    icon: (
      <svg
        className="w-5 h-5 opacity-80"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
  {
    label: "About us",
    path: "/about",
    icon: (
      <svg
        className="w-5 h-5 opacity-80"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Contact us",
    path: "/contact",
    icon: (
      <svg
        className="w-5 h-5 opacity-80"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

const ACCOUNT_ITEMS = [
  {
    label: "Dashboard",
    path: "/profile",
    icon: (
      <svg
        className="w-5 h-5 opacity-80"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    label: "My Orders",
    path: "/profile/orders",
    icon: (
      <svg
        className="w-5 h-5 opacity-80"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    label: "Favorites",
    path: "/profile/favorites",
    icon: (
      <svg
        className="w-5 h-5 opacity-80"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
];

function Header() {
  const [toggle, setToggle] = useState(false);
  const [appearanceSubmenu, setAppearanceSubmenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { cartItems, totalItemsCount, totalPrice } = useCart();
  const { currentUser, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const menuContainerRef = useRef(null);
  const cartContainerRef = useRef(null);

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

  // Close on click outside and reset appearance submenu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(e.target)
      ) {
        setToggle(false);
        setAppearanceSubmenu(false);
      }
      if (
        cartContainerRef.current &&
        !cartContainerRef.current.contains(e.target)
      ) {
        setCartOpen(false);
      }
    };
    if (toggle || cartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggle, cartOpen]);

  const getThemeLabel = () => {
    if (theme === "dark") return "Dark";
    if (theme === "light") return "Light";
    return "Device theme";
  };

  const handleLogout = async () => {
    await logout();
    setToggle(false);
    navigate("/");
  };

  const displayName =
    currentUser?.displayName ||
    (currentUser?.email ? currentUser.email.split("@")[0] : "Guest User");
  const userPhoto = currentUser?.photoURL || guestProfile;

  return (
    <header className="relative z-40 w-full min-h-20 md:min-h-24 flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-app-border bg-app-card transition-colors duration-200">
      {/* 1. Logo Section */}
      <NavLink
        to="/"
        className="flex items-center gap-2 sm:gap-3 group shrink-0"
      >
        <img
          className="h-10 sm:h-12 md:h-11 lg:h-13 xl:h-14 transition-transform duration-300 group-hover:scale-105"
          src={logo}
          alt="Logo"
        />
        <span className="text-lg sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-black tracking-wide text-app-text group-hover:text-app-accent transition-colors whitespace-nowrap">
          Monsters Co.
        </span>
      </NavLink>

      {/* 2. Desktop Navigation */}
      <DesktopNavbar navItems={NAV_ITEMS} />

      {/* 3. Actions / Account Section */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
        <CartDropdown
          cartContainerRef={cartContainerRef}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          setToggle={setToggle}
          totalItemsCount={totalItemsCount}
          cartItems={cartItems}
          totalPrice={totalPrice}
        />

        {/* 4. Account / Menu Section */}
        <AccountDropdown
          menuContainerRef={menuContainerRef}
          toggle={toggle}
          setToggle={setToggle}
          appearanceSubmenu={appearanceSubmenu}
          setAppearanceSubmenu={setAppearanceSubmenu}
          setCartOpen={setCartOpen}
          userPhoto={userPhoto}
          displayName={displayName}
          currentUser={currentUser}
          theme={theme}
          setTheme={setTheme}
          getThemeLabel={getThemeLabel}
          handleLogout={handleLogout}
          NAV_ITEMS={NAV_ITEMS}
          ACCOUNT_ITEMS={ACCOUNT_ITEMS}
        />
      </div>
    </header>
  );
}

export default Header;
