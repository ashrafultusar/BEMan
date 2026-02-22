'use client';

import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";



interface CartItem {
  id: string;
  name: string;
  price: number;
}

export default function page() {
  // Ekhane apnar cart state thakbe (e.g., Redux, Context, or API)
  const cartItems: CartItem[] = []; // Empty array for demonstration

  return (
    <main className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* 1. Visual Icon Section */}
      <div className="relative mb-6">
        <div className="bg-gray-100 p-8 rounded-full">
          {/* Real color of the icon: Slate Gray to represent empty state */}
          <ShoppingCart size={80} className="text-slate-400" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          0
        </div>
      </div>

      {/* 2. Text Content */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Your shopping bag is empty!
      </h2>
      <p className="text-gray-500 max-w-md mb-8">
        It looks like you haven&apos;t added any items to your cart yet. 
        Start exploring our amazing collections today.
      </p>

      {/* 3. Action Button (CTA) */}
      <Link 
        href="/shop/all" 
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
      >
        <ArrowLeft size={18} />
        Continue Shopping
      </Link>

     
    </div>
    </main>
  );
}