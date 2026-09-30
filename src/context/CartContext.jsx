import { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context with null as initial value for fail-fast safety
const CartContext = createContext(null);

const CART_STORAGE_KEY = "monsters_cart_items";

export function CartProvider({ children }) {
  // Initialize state directly from localStorage if present
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse cart items from storage:", error);
      return [];
    }
  });

  // Sync cart changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart items to storage:", error);
    }
  }, [cartItems]);

  // Add item to cart or increment quantity if already exists
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      // Calculate numeric unit price to avoid string concatenation issues
      const unitPrice = Number((product.episode?.length * 0.4 || 1).toFixed(1));

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: unitPrice,
          quantity: 1,
        },
      ];
    });
  };

  // Decrease quantity by 1; remove completely if quantity drops to 0
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Remove item row entirely from cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear all cart contents
  const clearCart = () => {
    setCartItems([]);
      localStorage.removeItem(CART_STORAGE_KEY);
  };

  // Derived state: total count of all individual items
  const totalItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Derived state: grand total price of all items
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0,
  );

  const value = {
    cartItems,
    totalItemsCount,
    totalPrice,
    addToCart,
    decreaseQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 2. Custom hook with fail-fast defensive guard
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
