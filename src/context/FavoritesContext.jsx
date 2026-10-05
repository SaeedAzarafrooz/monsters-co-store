import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { getUserSyncedData, saveUserSyncedData } from "../utils/firebase/firebase";
import { fetchCharactersByIds } from "../utils/api/rickAndMorty";

const FavoritesContext = createContext(null);
const FAVORITES_STORAGE_KEY = "monsters_favorites_items";

const sanitizeFavoriteId = (item) =>
  typeof item === "object" && item !== null ? Number(item.id) : Number(item);

const readLocalFavoriteIds = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed)
      ? Array.from(new Set(parsed.map(sanitizeFavoriteId).filter(Boolean)))
      : [];
  } catch (error) {
    console.error("Failed to parse favorites from storage:", error);
    return [];
  }
};

const mergeFavoriteIds = (localIds, cloudIds) => {
  const set = new Set();
  (cloudIds || []).forEach((id) => set.add(sanitizeFavoriteId(id)));
  (localIds || []).forEach((id) => set.add(sanitizeFavoriteId(id)));
  return Array.from(set).filter(Boolean);
};

export function FavoritesProvider({ children }) {
  const { currentUser, loading: authLoading } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(readLocalFavoriteIds);
  const [favorites, setFavorites] = useState([]);

  // Start with true if we already have IDs to hydrate to prevent UI flicker
  const [isHydrating, setIsHydrating] = useState(() => {
    const initial = readLocalFavoriteIds();
    return initial.length > 0;
  });

  const isSyncingWithCloud = useRef(false);
  const prevUserRef = useRef(null);
  const isInitialAuthChecked = useRef(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (error) {
      console.error("Failed to save favorites to storage:", error);
    }
  }, [favoriteIds]);

  // Auth & Cloud Sync Lifecycle
  useEffect(() => {
    if (authLoading) return;

    let isSubscribed = true;

    const handleAuth = async () => {
      if (currentUser) {
        isSyncingWithCloud.current = true;
        const cloudData = await getUserSyncedData(currentUser.uid);

        if (!isSubscribed) return;

        let finalIds;
        if (!isInitialAuthChecked.current && prevUserRef.current === null) {
          finalIds = (cloudData?.favorites || []).map(sanitizeFavoriteId).filter(Boolean);
        } else {
          const localIds = readLocalFavoriteIds();
          finalIds = mergeFavoriteIds(localIds, cloudData?.favorites || []);
        }

        setFavoriteIds(finalIds);
        await saveUserSyncedData(currentUser.uid, { favorites: finalIds });

        setTimeout(() => {
          isSyncingWithCloud.current = false;
        }, 150);
      } else if (prevUserRef.current && !currentUser) {
        isSyncingWithCloud.current = true;
        setFavoriteIds([]);
        setFavorites([]);
        localStorage.removeItem(FAVORITES_STORAGE_KEY);
        setTimeout(() => {
          isSyncingWithCloud.current = false;
        }, 150);
      }

      isInitialAuthChecked.current = true;
      prevUserRef.current = currentUser;
    };

    handleAuth();

    return () => {
      isSubscribed = false;
    };
  }, [currentUser, authLoading]);

  // Persist live modifications to Firestore
  useEffect(() => {
    if (!authLoading && currentUser && !isSyncingWithCloud.current && isInitialAuthChecked.current) {
      saveUserSyncedData(currentUser.uid, { favorites: favoriteIds });
    }
  }, [favoriteIds, currentUser, authLoading]);

  // Hydrate full character items with 300ms smooth delay
  useEffect(() => {
    let isSubscribed = true;

    if (favoriteIds.length === 0) {
      setFavorites([]);
      setIsHydrating(false);
      return;
    }

    const hydrateFavorites = async () => {
      setIsHydrating(true);

      const [characters] = await Promise.all([
        fetchCharactersByIds(favoriteIds),
        new Promise((resolve) => setTimeout(resolve, 300)),
      ]);

      if (!isSubscribed) return;

      setFavorites(characters);
      setIsHydrating(false);
    };

    hydrateFavorites();

    return () => {
      isSubscribed = false;
    };
  }, [favoriteIds]);

  const isFavorite = (id) => favoriteIds.includes(Number(id));

  const toggleFavorite = (product) => {
    const targetId = Number(product.id || product);
    setFavoriteIds((prev) => {
      if (prev.includes(targetId)) {
        return prev.filter((id) => id !== targetId);
      }
      return [...prev, targetId];
    });
  };

  const removeFavorite = (id) => {
    const targetId = Number(id);
    setFavoriteIds((prev) => prev.filter((id) => id !== targetId));
  };

  const clearFavorites = () => {
    setFavoriteIds([]);
    setFavorites([]);
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
  };

  const totalFavoritesCount = favoriteIds.length;

  const value = {
    favorites,
    favoriteIds,
    isHydrating,
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
