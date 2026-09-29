import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // 'dark' | 'light' | 'system'
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("app_theme") || "system";
    });

    useEffect(() => {
        const root = document.documentElement;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
            const isDark =
                theme === "dark" ||
                (theme === "system" && mediaQuery.matches);

            if (isDark) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        };

        applyTheme();
        localStorage.setItem("app_theme", theme);

        const handleSystemChange = () => {
            if (theme === "system") {
                applyTheme();
            }
        };

        mediaQuery.addEventListener("change", handleSystemChange);
        return () => mediaQuery.removeEventListener("change", handleSystemChange);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
