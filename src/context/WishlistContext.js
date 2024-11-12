// src/context/WishlistContext.jsx
import React, { createContext, useState } from "react";

// Crează contextul
export const WishlistContext = createContext();

// Creează providerul
export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Funcție pentru adăugarea unui item în wishlist
  const addToWishlist = (item) => {
    setWishlistItems((prevItems) => [...prevItems, item]);
  };

  // Funcție pentru eliminarea unui item din wishlist
  const removeFromWishlist = (itemId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
