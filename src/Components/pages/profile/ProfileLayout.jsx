import { Outlet, NavLink } from "react-router-dom";
import { Container, H2, Paragraph } from "../../ui";

export default function ProfileLayout() {
  const navItems = [
    { name: "Overview", path: "/profile" },
    { name: "Orders", path: "/profile/orders" },
    { name: "Favorites", path: "/profile/favorites" },
    { name: "Settings", path: "/profile/settings" },
  ];

  return (
    <Container size="full" className="flex flex-col md:flex-row gap-6 p-4 md:p-8 min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 md:shrink-0 bg-card border border-border rounded-2xl p-4 h-fit">
        <Paragraph className="text-foreground font-bold mb-4 px-2 text-sm">Account</Paragraph>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/profile"}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0 bg-card border border-border rounded-2xl p-6 md:p-8">
        <Outlet />
      </main>
    </Container>
  );
}
