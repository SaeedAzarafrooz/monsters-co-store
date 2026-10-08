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
import { Icon } from "../../ui";

const NAV_ITEMS = [
  {
    label: "Home",
    path: "/",
    icon: <Icon name="home" size="md" />,
  },
  {
    label: "Products",
    path: "/products",
    icon: <Icon name="bag" size="md" />,
  },
  {
    label: "About us",
    path: "/about",
    icon: <Icon name="info" size="md" />,
  },
  {
    label: "Contact us",
    path: "/contact",
    icon: <Icon name="mail" size="md" />,
  },
];

const ACCOUNT_ITEMS = [
  {
    label: "Dashboard",
    path: "/profile",
    icon: <Icon name="grid" size="md" />,
  },
  {
    label: "My Orders",
    path: "/profile/orders",
    icon: <Icon name="orders" size="md" />,
  },
  {
    label: "Favorites",
    path: "/profile/favorites",
    icon: <Icon name="heart" size="md" />,
  },
];

function Header() {
  const [toggle, setToggle] = useState(false);
  const [appearanceSubmenu, setAppearanceSubmenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { cartItems, totalItemsCount, totalPrice, isHydrating  } = useCart();

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
    logout();
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
          isHydrating={isHydrating}
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
