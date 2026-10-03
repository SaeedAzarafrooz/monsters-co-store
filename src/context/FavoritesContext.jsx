import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext(null);

const FAVORITES_STORAGE_KEY = "monsters_favorites_items";

export function FavoritesProvider({ children }) {
  // Initialize state directly from localStorage if present
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse favorites from storage:", error);
      return [];
    }
  });

  // Sync favorites changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to storage:", error);
    }
  }, [favorites]);

  // Check if item is already favorited
  const isFavorite = (id) => favorites.some((item) => item.id === id);

  // Toggle favorite status
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          species: product.species,
          gender: product.gender,
          status: product.status,
          episode: product.episode,
        },
      ];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
  };

  const totalFavoritesCount = favorites.length;

  const value = {
    favorites,
    totalFavoritesCount,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
