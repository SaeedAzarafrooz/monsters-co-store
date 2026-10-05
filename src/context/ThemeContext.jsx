import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { getUserSyncedData, saveUserSyncedData } from "../utils/firebase/firebase";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { currentUser, loading: authLoading } = useAuth();
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("app_theme");
    return saved || "system";
  });

  const isSyncingWithCloud = useRef(false);

  // Apply theme class to document element and persist to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  // Sync theme with Firestore upon login
  useEffect(() => {
    if (authLoading) return;

    let isSubscribed = true;

    const syncTheme = async () => {
      if (currentUser) {
        isSyncingWithCloud.current = true;
        const cloudData = await getUserSyncedData(currentUser.uid);

        if (!isSubscribed) return;

        if (cloudData?.theme) {
          setTheme(cloudData.theme);
        } else {
          // If no cloud theme exists yet, save current local theme
          await saveUserSyncedData(currentUser.uid, { theme });
        }

        setTimeout(() => {
          isSyncingWithCloud.current = false;
        }, 100);
      }
    };

    syncTheme();

    return () => {
      isSubscribed = false;
    };
  }, [currentUser, authLoading]);

  // Persist live theme change to cloud if user is logged in
  useEffect(() => {
    if (!authLoading && currentUser && !isSyncingWithCloud.current) {
      saveUserSyncedData(currentUser.uid, { theme });
    }
  }, [theme, currentUser, authLoading]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
