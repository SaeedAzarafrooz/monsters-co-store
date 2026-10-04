import { Link, NavLink } from "react-router-dom";
import menu from "../../../assets/menu.png";
import cross from "../../../assets/cross.png";

export default function AccountDropdown({
  menuContainerRef,
  toggle,
  setToggle,
  appearanceSubmenu,
  setAppearanceSubmenu,
  setCartOpen,
  userPhoto,
  displayName,
  currentUser,
  theme,
  setTheme,
  getThemeLabel,
  handleLogout,
  NAV_ITEMS,
  ACCOUNT_ITEMS,
}) {
  return (
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
            src={userPhoto}
            alt={displayName}
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-app-accent border-2 border-app-card rounded-full" />
        </div>
        <div className="hidden lg:flex flex-col text-left">
          <span className="text-xs font-bold text-app-text max-w-[110px] truncate">
            {displayName}
          </span>
          <span className="text-[10px] text-app-accent font-mono">
            {currentUser ? "Signed In" : "Online"}
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
                        src={userPhoto}
                        alt={displayName}
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-app-accent border-2 border-app-bg rounded-full" />
                    </div>
                    <div className="flex flex-col truncate flex-1 min-w-0">
                      <span className="text-sm font-bold text-app-text truncate">
                        {displayName}
                      </span>
                      <span className="text-xs text-app-muted truncate">
                        {currentUser?.email || "@guest_portal"}
                      </span>
                      {currentUser && (
                        <Link
                          to="/profile"
                          onClick={() => setToggle(false)}
                          className="text-[11px] text-app-accent hover:underline cursor-pointer mt-0.5"
                        >
                          Manage Profile
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* 2. Account Links OR Guest Sign In */}
                  {!currentUser ? (
                    <div className="p-3 bg-app-card">
                      <Link
                        to="/auth"
                        onClick={() => setToggle(false)}
                        className="w-full flex items-center justify-center py-2 px-3 rounded-xl bg-app-accent text-app-bg font-extrabold text-xs transition-opacity hover:opacity-90 shadow-sm"
                      >
                        Sign In / Register
                      </Link>
                    </div>
                  ) : (
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
                  )}

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

                  {/* 5. Close / Sign Out Action */}
                  <div className="p-2 space-y-1.5">
                    {currentUser && (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    )}

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
  );
}
