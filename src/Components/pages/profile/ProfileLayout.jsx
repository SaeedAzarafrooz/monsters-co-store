import { Outlet, NavLink } from "react-router-dom";

export default function ProfileLayout() {
  const navItems = [
    { name: "Overview", path: "/profile" },
    { name: "Orders", path: "/profile/orders" },
    { name: "Settings", path: "/profile/settings" },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-8 min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 md:shrink-0 bg-app-card border border-app-border rounded-2xl p-4 h-fit">
        <h2 className="text-app-text font-bold mb-4 px-2">Account</h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/profile"}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                    : "text-app-muted hover:bg-app-hover hover:text-app-text"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 w-full min-w-0 bg-app-card border border-app-border rounded-2xl p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
