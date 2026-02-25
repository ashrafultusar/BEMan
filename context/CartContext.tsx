"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // ১. State initialize korar somoy localStorage check kora hochhe
  const [cart, setCart] = useState<CartItem[]>([]);

  // Client-side e initial data load kora
  useEffect(() => {
    const savedCart = localStorage.getItem('bemen_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ২. Cart change hoilei localStorage update hobe
  useEffect(() => {
    localStorage.setItem('bemen_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === newItem._id);

      if (existingItem) {
        // Quantity update - eta shathe shathe re-render korbe
        const updatedCart = prevCart.map((item) =>
          item._id === newItem._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        return updatedCart;
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};