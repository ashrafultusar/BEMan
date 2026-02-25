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
  updateQuantity: (id: string, type: 'plus' | 'minus') => void; // এখানে ডিফাইন করা হয়েছে
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ১ম বার পেজ লোড হলে LocalStorage থেকে ডাটা নেওয়া
  useEffect(() => {
    const savedCart = localStorage.getItem('bemen_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // কার্ট পরিবর্তন হলে LocalStorage আপডেট করা
  useEffect(() => {
    localStorage.setItem('bemen_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === newItem._id);

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === newItem._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
  };

  // --- নতুন ফাংশন: Quantity কমানো বা বাড়ানোর জন্য ---
  const updateQuantity = (id: string, type: 'plus' | 'minus') => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === id) {
          const newQty = type === 'plus' ? item.quantity + 1 : item.quantity - 1;
          // নিশ্চিত করা হচ্ছে যেন quantity ১ এর নিচে না যায়
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    // এখানে অবশ্যই updateQuantity পাস করতে হবে
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