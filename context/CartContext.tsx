"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  _id: string;
  productId: string; 
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  size: string; 
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, size: string, type: 'plus' | 'minus') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('bemen_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Cart parsing error", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bemen_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      // ID এবং Size উভয়ই চেক করা হচ্ছে
      const existingItem = prevCart.find(
        (item) => item._id === newItem._id && item.size === newItem.size
      );

      if (existingItem) {
        return prevCart.map((item) =>
          (item._id === newItem._id && item.size === newItem.size)
            ? { ...item, quantity: item.quantity + newItem.quantity } 
            : item
        );
      }
      return [...prevCart, newItem];
    });
  };

  const updateQuantity = (id: string, size: string, type: 'plus' | 'minus') => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === id && item.size === size) {
          const newQty = type === 'plus' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item._id === id && item.size === size)));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};