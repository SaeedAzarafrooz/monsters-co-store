import { Link, NavLink } from "react-router-dom";
import menu from "../../../assets/menu.png";
import cross from "../../../assets/cross.png";
import { Icon, Button } from "../../ui";

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
  onOpenAuthModal,
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

        <Icon
          name="chevron-down"
          size="xs"
          className={`text-muted-foreground transition-transform duration-200 ${
            toggle ? "rotate-180 text-accent" : ""
          }`}
        />
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
                  <Icon name="arrow-left" size="sm" />
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
                      <Icon
                        name="check"
                        size="sm"
                        className="text-app-accent"
                      />
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
                  <Button
                    type="button"
                    onClick={() => {
                      if (onOpenAuthModal) onOpenAuthModal();
                      setToggle(false);
                    }}
                    className="w-full py-2.5 text-xs font-bold cursor-pointer"
                  >
                    Sign In / Register
                  </Button>
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
                    <Icon name="moon" size="sm" className="opacity-80" />
                    <span className="text-sm">Appearance</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-app-muted">
                    <span>{getThemeLabel()}</span>
                    <Icon
                      name="chevron-right"
                      size="xs"
                      className="opacity-60"
                    />
                  </div>
                </button>

                {/* Location */}
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-app-hover transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <Icon name="pin" size="sm" className="opacity-80" />
                    <span className="text-sm">Location</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-app-muted">
                    <span>Dimension C-137</span>
                    <Icon
                      name="chevron-right"
                      size="xs"
                      className="opacity-60"
                    />
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
                    <Icon name="logout" size="sm" />
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
