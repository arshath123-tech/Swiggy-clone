import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    rating4: false,
    offers: false,
    range300to600: false,
    lessThan300: false,
    pureVeg: false,
    nonVeg: false,
    foodIn10Min: false,
  });

  const addToCart = (item, restaurantName) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1, restaurantName }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === itemId);
      if (existingItem.quantity === 1) {
        return prevItems.filter((cartItem) => cartItem.id !== itemId);
      }
      return prevItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleFilter = (filterName) => {
    setActiveFilters((prev) => {
      // Mutual exclusion for price filters
      if (filterName === 'range300to600' && !prev[filterName]) {
        return { ...prev, range300to600: true, lessThan300: false };
      }
      if (filterName === 'lessThan300' && !prev[filterName]) {
        return { ...prev, lessThan300: true, range300to600: false };
      }
      // Mutual exclusion for veg/non-veg
      if (filterName === 'pureVeg' && !prev[filterName]) {
        return { ...prev, pureVeg: true, nonVeg: false };
      }
      if (filterName === 'nonVeg' && !prev[filterName]) {
        return { ...prev, nonVeg: true, pureVeg: false };
      }
      return { ...prev, [filterName]: !prev[filterName] };
    });
  };

  const resetFilters = () => {
    setActiveFilters({
      rating4: false,
      offers: false,
      range300to600: false,
      lessThan300: false,
      pureVeg: false,
      nonVeg: false,
      foodIn10Min: false,
    });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        searchQuery,
        setSearchQuery,
        activeFilters,
        toggleFilter,
        resetFilters,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
