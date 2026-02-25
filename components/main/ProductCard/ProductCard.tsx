"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, ArrowRight, Zap } from 'lucide-react';

interface ProductProps {
  product: {
    _id: string;
    name: string;
    price: number | string;
    images: string[];
    category: string;
    isNew?: boolean;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const imageSrc = product.images?.[0] || "/placeholder-image.jpg";
  const productPath = `/productDetails/${product._id}`;

  return (
    <div className="group relative w-full bg-white transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden border border-gray-100">
      
   
      <div className="relative aspect-[4/5] overflow-hidden bg-[#fbfbfb] p-2">
        
        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter shadow-sm">
              NEW
            </span>
          </div>
        )}

        {/* Product Image */}
        <Link href={productPath} className="relative block w-full h-full rounded-lg overflow-hidden border border-gray-50">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          
          {/* Inner Shadow Overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Fancy Quick Add (Hover-on) */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <button 
            onClick={(e) => { e.preventDefault(); console.log("Cart:", product._id); }}
            className="w-full bg-white/95 backdrop-blur-sm text-black py-2.5 rounded-lg font-bold text-[11px] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl border border-white/20"
          >
            <ShoppingCart size={15} className="text-[#2563EB]" /> {/* Real blue color */}
            QUICK ADD
          </button>
        </div>
      </div>

      {/* --- Details Section --- */}
      <div className="p-4 pt-2">
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              {product.category}
            </p>
          </div>
          <Link href={productPath}>
            <h3 className="text-[14px] font-bold text-gray-800 group-hover:text-black transition-colors line-clamp-1 leading-tight tracking-tight">
              {product.name}
            </h3>
          </Link>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-black text-gray-900 tracking-tight">
              ৳ {Number(product.price).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Main Action Button */}
        <button 
          onClick={(e) => { e.preventDefault(); console.log("Order Now:", product._id); }}
          className="w-full cursor-pointer relative group/btn h-11 overflow-hidden bg-gray-950 text-white rounded-lg flex items-center justify-center transition-all active:scale-95 shadow-md"
        >
        
          <div className="absolute inset-0 w-0 bg-gradient-to-r from-blue-700 to-blue-500 transition-all duration-500 ease-out group-hover/btn:w-full" />
          
          <div className="relative z-10 flex items-center justify-center gap-2 font-bold text-[12px] tracking-wider uppercase">
            <Zap size={14} fill="#FFD700" className="text-[#FFD700]" /> {/* Real gold color */}
            Order Now
            <ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;