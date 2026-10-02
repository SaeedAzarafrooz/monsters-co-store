import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/Logo.png";
import guestProfile from "../../assets/guestProfile.png";
import menu from "../../assets/menu.png";
import cross from "../../assets/cross.png";
import shoppingBagIcon from "../../assets/shopping-bag.svg";

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
];

function Header() {
  const [toggle, setToggle] = useState(false);
  const [appearanceSubmenu, setAppearanceSubmenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { cartItems, totalItemsCount, totalPrice } = useCart();

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

  const handleCheckoutClick = () => {
    setCartOpen(false);
    navigate("/checkout");
  };

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
      <nav className="relative hidden md:flex items-center justify-center md:gap-2 lg:gap-5 xl:gap-8 md:text-sm lg:text-base xl:text-lg font-bold py-2 shrink-0">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            ref={(el) => (navRefs.current[item.path] = el)}
            className={({ isActive }) =>
              `px-2.5 lg:px-3.5 py-1.5 transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "text-app-accent font-bold"
                  : "text-app-muted hover:text-app-text"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

        {/* Sliding Active Indicator */}
        <span
          className="absolute bottom-0 h-[3px] bg-app-accent rounded-full transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.opacity,
          }}
        />
      </nav>

      {/* 3. Actions / Account Section */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
        {/* Shopping Cart Trigger & Dropdown */}
        <div className="relative shrink-0" ref={cartContainerRef}>
          <button
            type="button"
            onClick={() => {
              setCartOpen((prev) => !prev);
              setToggle(false);
            }}
            className="relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-2xl bg-app-bg hover:bg-app-hover border border-app-border transition-all cursor-pointer shadow-sm group"
            aria-label="Shopping Cart"
          >
            <img
              src={shoppingBagIcon}
              alt="Cart"
              className="w-5 h-5 lg:w-6 lg:h-6 object-contain group-hover:scale-110 transition-transform duration-200 dark:invert"
            />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-app-accent text-app-bg text-[11px] font-black font-mono rounded-full flex items-center justify-center shadow-md animate-in zoom-in-75 duration-200">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Cart Dropdown Modal */}
          {cartOpen && (
            <div className="absolute right-0 top-12 sm:top-14 w-80 sm:w-88 bg-app-card border border-app-border rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/80 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col">
              {/* Dropdown Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-app-border bg-app-bg/50">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-app-text">
                    Cart Summary
                  </span>
                  <span className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-app-accent/10 text-app-accent font-semibold border border-app-accent/20">
                    {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="p-1 rounded-lg text-app-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Close Cart"
                >
                  <img
                    src={cross}
                    alt="close"
                    className="w-3.5 h-3.5 opacity-70 dark:invert"
                  />
                </button>
              </div>

              {/* Items List */}
              <div className="max-h-72 overflow-y-auto divide-y divide-app-border p-2 space-y-1">
                {cartItems.length === 0 ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center px-4">
                    <img
                      src={shoppingBagIcon}
                      alt="Empty Cart"
                      className="w-12 h-12 opacity-30 mb-2 dark:invert"
                    />
                    <p className="text-sm font-semibold text-app-text">
                      Your cart is empty
                    </p>
                    <p className="text-xs text-app-muted mt-0.5">
                      Explore our portal stickers & add them here!
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const unitPrice = Number(item.price || 0).toFixed(1);
                    const lineTotal = (
                      Number(item.price || 0) * item.quantity
                    ).toFixed(1);
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-app-hover transition-colors"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-app-border shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4
                            className="text-xs font-bold text-app-text truncate"
                            title={item.name}
                          >
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-app-muted">
                            <span className="font-mono text-app-accent font-bold">
                              ${unitPrice}
                            </span>
                            <span>×</span>
                            <span className="font-mono font-semibold text-app-text">
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-app-text">
                            ${lineTotal}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Dropdown Footer & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-3 border-t border-app-border bg-app-bg/60 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between px-1 text-sm font-semibold">
                    <span className="text-app-muted">Estimated Total:</span>
                    <span className="font-mono font-black text-base text-app-accent">
                      ${totalPrice.toFixed(1)}
                    </span>
                  </div>
                  <Link
                    type="button"
                    to="/checkout"
                    onClick={handleCheckoutClick}
                    className="w-full py-2.5 px-4 bg-app-accent hover:opacity-90 text-app-bg font-bold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 4. Account / Menu Section */}
        <div className="relative shrink-0" ref={menuContainerRef}>
          {/* Desktop Profile Pill Trigger */}
          <button
            type="button"
            onClick={() => {
              setToggle((prev) => !prev);
              setAppearanceSubmenu(false);
              setCartOpen(false);
            }}
            className="hidden md:flex items-center gap-2 lg:gap-2.5 bg-app-bg hover:bg-app-hover border border-app-border rounded-2xl px-2.5 lg:px-3.5 py-1.5 lg:py-2 transition-all cursor-pointer shadow-md group"
            aria-label="User Account Menu"
          >
            <div className="relative">
              <img
                className="h-8 w-8 lg:h-9 lg:w-9 rounded-full object-cover border border-app-border group-hover:border-app-accent transition-colors"
                src={guestProfile}
                alt="Guest"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-app-accent border-2 border-app-card rounded-full" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-app-text">
                Guest User
              </span>
              <span className="text-[10px] text-app-accent font-mono">
                Online
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-app-muted transition-transform duration-200 ${
                toggle ? "rotate-180 text-app-accent" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => {
              setToggle((prev) => !prev);
              setAppearanceSubmenu(false);
              setCartOpen(false);
            }}
            className="md:hidden p-2 rounded-xl bg-app-bg border border-app-border text-app-text transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <img className="h-6 w-6 dark:invert-0" src={menu} alt="menu" />
          </button>

          {/* Dropdown Menu */}
          {toggle && (
            <div className="absolute right-0 top-13 sm:top-14 w-72 bg-app-card border border-app-border rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/80 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 divide-y divide-app-border">
              {/* Submenu: Appearance selection view */}
              {appearanceSubmenu ? (
                <div className="py-2">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-app-border">
                    <button
                      type="button"
                      onClick={() => setAppearanceSubmenu(false)}
                      className="p-1 rounded-lg hover:bg-app-hover text-app-muted cursor-pointer"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <span className="text-sm font-semibold text-app-text">
                      Appearance
                    </span>
                  </div>

                  <div className="p-2 space-y-1 text-sm">
                    <p className="text-[11px] text-app-muted px-3 py-1">
                      Setting applies to this browser only
                    </p>
                    {[
                      { id: "system", label: "Use device theme" },
                      { id: "dark", label: "Dark theme" },
                      { id: "light", label: "Light theme" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTheme(opt.id)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-app-text hover:bg-app-hover transition-colors cursor-pointer"
                      >
                        <span>{opt.label}</span>
                        {theme === opt.id && (
                          <svg
                            className="w-4 h-4 text-app-accent"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* 1. Header Information */}
                  <div className="p-4 flex items-center gap-3 bg-app-bg">
                    <div className="relative shrink-0">
                      <img
                        className="h-11 w-11 rounded-full object-cover border border-app-border shadow-sm"
                        src={guestProfile}
                        alt="Guest Profile"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-app-accent border-2 border-app-bg rounded-full" />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-sm font-bold text-app-text truncate">
                        Guest User
                      </span>
                      <span className="text-xs text-app-muted truncate">
                        @guest_portal
                      </span>
                      <Link
                        to="/profile"
                        onClick={() => setToggle(false)}
                        className="text-[11px] text-app-accent hover:underline cursor-pointer mt-0.5"
                      >
                        Manage Profile
                      </Link>
                    </div>
                  </div>

                  {/* 2. Account Links (Dashboard & Orders) */}
                  <div className="py-2">
                    <div className="px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-app-muted">
                      Account
                    </div>
                    {ACCOUNT_ITEMS.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/profile"}
                        onClick={() => setToggle(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-app-accent/15 text-app-accent border-r-2 border-app-accent font-semibold"
                              : "text-app-text hover:bg-app-hover"
                          }`
                        }
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>

                  {/* 3. Navigation items (Mobile Only, or General Navigation) */}
                  <div className="py-2 md:hidden">
                    <div className="px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-app-muted">
                      Navigation
                    </div>
                    {NAV_ITEMS.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setToggle(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-app-accent/15 text-app-accent border-r-2 border-app-accent font-semibold"
                              : "text-app-text hover:bg-app-hover"
                          }`
                        }
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </NavLink>
                    ))}
                  </div>

                  {/* 4. Settings / Preferences Section */}
                  <div className="py-2 text-sm text-app-text">
                    {/* Appearance toggle button */}
                    <button
                      type="button"
                      onClick={() => setAppearanceSubmenu(true)}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-app-hover transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
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
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                        <span className="text-sm">Appearance</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-app-muted">
                        <span>{getThemeLabel()}</span>
                        <svg
                          className="w-4 h-4 opacity-60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Location */}
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-app-hover transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
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
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm">Location</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-app-muted">
                        <span>Dimension C-137</span>
                        <svg
                          className="w-4 h-4 opacity-60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>

                  {/* 5. Close Action */}
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={() => setToggle(false)}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
                    >
                      <img
                        src={cross}
                        alt="close"
                        className="w-3.5 h-3.5 opacity-80 dark:invert"
                      />
                      <span>Close</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
