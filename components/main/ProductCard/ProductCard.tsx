"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

// Database logic-er sathe mil rekhe Interface update
interface ProductProps {
  product: {
    _id: string; // MongoDB-te _id thake
    name: string;
    price: number | string;
    images: string[]; // Amra images array use korchi
    category: string;
    isNew?: boolean;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  // ১. Image Fallback Logic: Jodi images array khali thake
  const imageSrc = product.images && product.images.length > 0 
    ? product.images[0] 
    : "/placeholder-image.jpg"; // Public folder-e ekti default image rakhun

  // ২. Link Path: MongoDB-r _id use kora hoyeche
  const productPath = `/productDetails/${product._id}`;

  return (
    <div className="group cursor-pointer w-full">
      {/* ইমেজ সেকশন */}
      <Link href={productPath} className="relative block aspect-[3/4] overflow-hidden bg-[#f9f9f9] mb-3">
        {/* New Badge */}
        {product.isNew && (
          <span className="absolute top-2 left-2 z-10 bg-black text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-tighter">
            New
          </span>
        )}

        <Image
          src={imageSrc}
          alt={product.name || "BEMEN Product"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 20vw"
          priority={false}
        />
        
        {/* উইশলিস্ট বাটন */}
        <button 
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation(); 
            console.log("Added to wishlist:", product._id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-md z-20"
        >
          <Heart 
            size={16} 
            className="text-gray-400 hover:text-[#FF0000] hover:fill-[#FF0000] transition-colors" 
          />
        </button>
      </Link>

      {/* টেক্সট ডিটেইলস */}
      <div className="text-left space-y-1">
        <Link href={productPath}>
          <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight line-clamp-1 hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] font-bold text-gray-800">
          ৳ {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;