import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function DesktopNavbar({ navItems }) {
  const location = useLocation();
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

  return (
    <nav className="relative hidden md:flex items-center justify-center md:gap-2 lg:gap-5 xl:gap-8 md:text-sm lg:text-base xl:text-lg font-bold py-2 shrink-0">
      {navItems.map((item) => (
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
  );
}
