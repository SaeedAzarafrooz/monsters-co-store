import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { getUserSyncedData, saveUserSyncedData } from "../utils/firebase/firebase";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Theme state can be: "light" | "dark" | "system"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app_theme") || "system";
  });

  const isSyncingWithCloud = useRef(false);

  // Helper to get system preference
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // 1. Handle HTML class & System theme listener
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (targetTheme) => {
      const effectiveTheme = targetTheme === "system" ? getSystemTheme() : targetTheme;
      
      if (effectiveTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme(theme);
    localStorage.setItem("app_theme", theme);

    // If theme is system, listen to OS changes in real-time
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // 2. Fetch theme from Firestore on user login
  useEffect(() => {
    if (!user) return;

    const fetchUserTheme = async () => {
      try {
        isSyncingWithCloud.current = true;
        const syncedData = await getUserSyncedData(user.uid);
        
        if (syncedData?.theme) {
          setTheme(syncedData.theme);
        } else {
          // If no cloud theme, persist current local theme to cloud
          await saveUserSyncedData(user.uid, { theme });
        }
      } catch (error) {
        console.error("Failed to sync theme with cloud:", error);
      } finally {
        isSyncingWithCloud.current = false;
      }
    };

    fetchUserTheme();
  }, [user]);

  // 3. Save theme changes to Firestore
  useEffect(() => {
    if (!user || isSyncingWithCloud.current) return;

    const saveThemeToCloud = async () => {
      try {
        await saveUserSyncedData(user.uid, { theme });
      } catch (error) {
        console.error("Failed to save theme to cloud:", error);
      }
    };

    saveThemeToCloud();
  }, [theme, user]);

  // Toggle utility (rotates between dark and light)
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // UI helper for labels
  const getThemeLabel = () => {
    if (theme === "system") return "Device theme";
    return theme === "dark" ? "Dark theme" : "Light theme";
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, getThemeLabel }}>
      {children}
    </ThemeContext.Provider>
  );
};
