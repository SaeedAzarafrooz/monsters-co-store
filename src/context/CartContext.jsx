import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { getUserSyncedData, saveUserSyncedData } from "../utils/firebase/firebase";
import { fetchCharactersByIds } from "../utils/api/rickAndMorty";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "monsters_cart_items";

const sanitizeCartRef = (item) => ({
  id: Number(item.id),
  quantity: Number(item.quantity) || 1,
});

const readLocalCartRefs = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.map(sanitizeCartRef) : [];
  } catch (error) {
    console.error("Failed to parse cart items from storage:", error);
    return [];
  }
};

const mergeCartRefs = (localItems, cloudItems) => {
  const mergedMap = new Map();

  (cloudItems || []).forEach((item) => {
    const sanitized = sanitizeCartRef(item);
    mergedMap.set(sanitized.id, sanitized);
  });

  (localItems || []).forEach((item) => {
    const sanitized = sanitizeCartRef(item);
    if (mergedMap.has(sanitized.id)) {
      const existing = mergedMap.get(sanitized.id);
      existing.quantity += sanitized.quantity;
    } else {
      mergedMap.set(sanitized.id, sanitized);
    }
  });

  return Array.from(mergedMap.values());
};

export function CartProvider({ children }) {
  const { currentUser, loading: authLoading } = useAuth();
  const [cartRefs, setCartRefs] = useState(readLocalCartRefs);
  const [cartItems, setCartItems] = useState([]);
  // Start as true on refresh if cart items already exist locally
  const [isHydrating, setIsHydrating] = useState(() => {
    const initial = readLocalCartRefs();
    return initial.length > 0;
  });

  const isSyncingWithCloud = useRef(false);
  const prevUserRef = useRef(null);
  const isInitialAuthChecked = useRef(false);

  // Sync lightweight refs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartRefs));
    } catch (error) {
      console.error("Failed to save cart items to storage:", error);
    }
  }, [cartRefs]);

  // Auth & Cloud Sync Lifecycle
  useEffect(() => {
    if (authLoading) return;

    let isSubscribed = true;

    const handleAuth = async () => {
      // User is logged in
      if (currentUser) {
        isSyncingWithCloud.current = true;
        const cloudData = await getUserSyncedData(currentUser.uid);

        if (!isSubscribed) return;

        let finalRefs;
        // If this is a fresh page refresh where user was already logged in, use cloud directly
        if (!isInitialAuthChecked.current && prevUserRef.current === null) {
          finalRefs = (cloudData?.cartItems || []).map(sanitizeCartRef);
        } else {
          // Actual login transition from guest to logged-in: merge guest items with cloud
          const localRefs = readLocalCartRefs();
          finalRefs = mergeCartRefs(localRefs, cloudData?.cartItems || []);
        }

        setCartRefs(finalRefs);
        await saveUserSyncedData(currentUser.uid, { cartItems: finalRefs });

        setTimeout(() => {
          isSyncingWithCloud.current = false;
        }, 150);
      } 
      // User logged out
      else if (prevUserRef.current && !currentUser) {
        isSyncingWithCloud.current = true;
        setCartRefs([]);
        setCartItems([]);
        localStorage.removeItem(CART_STORAGE_KEY);
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
      saveUserSyncedData(currentUser.uid, { cartItems: cartRefs });
    }
  }, [cartRefs, currentUser, authLoading]);

  // Hydrate character details from API with a 300ms smooth delay
  useEffect(() => {
    let isSubscribed = true;

    if (cartRefs.length === 0) {
      setCartItems([]);
      setIsHydrating(false);
      return;
    }

    const hydrateCart = async () => {
      setIsHydrating(true);
      const ids = cartRefs.map((item) => item.id);

      // Fetch characters and enforce 300ms minimum delay for smooth visual transition
      const [characters] = await Promise.all([
        fetchCharactersByIds(ids),
        new Promise((resolve) => setTimeout(resolve, 300)),
      ]);

      if (!isSubscribed) return;

      const charMap = new Map(characters.map((char) => [char.id, char]));

      const hydrated = cartRefs
        .map((ref) => {
          const char = charMap.get(ref.id);
          if (!char) return null;
          const unitPrice = Number(((char.episode?.length || 1) * 0.4 || 1).toFixed(1));
          return {
            id: char.id,
            name: char.name,
            image: char.image,
            price: unitPrice,
            quantity: ref.quantity,
            episode: char.episode,
            species: char.species,
            gender: char.gender,
            status: char.status,
          };
        })
        .filter(Boolean);

      setCartItems(hydrated);
      setIsHydrating(false);
    };

    hydrateCart();

    return () => {
      isSubscribed = false;
    };
  }, [cartRefs]);

  const addToCart = (product) => {
    const targetId = Number(product.id);
    setCartRefs((prevRefs) => {
      const existing = prevRefs.find((item) => item.id === targetId);
      if (existing) {
        return prevRefs.map((item) =>
          item.id === targetId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevRefs, { id: targetId, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id) => {
    const targetId = Number(id);
    setCartRefs((prevRefs) =>
      prevRefs
        .map((item) =>
          item.id === targetId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    const targetId = Number(id);
    setCartRefs((prevRefs) => prevRefs.filter((item) => item.id !== targetId));
  };

  const clearCart = () => {
    setCartRefs([]);
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const totalItemsCount = cartRefs.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  );

  const value = {
    cartItems,
    cartRefs,
    isHydrating,
    totalItemsCount,
    totalPrice,
    addToCart,
    decreaseQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
