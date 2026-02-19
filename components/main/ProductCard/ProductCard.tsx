"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
    alt: string;
    isNew?: boolean;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  // কমন লিঙ্ক পাথ যাতে ভুল না হয়
  const productPath = `/productDetails/${product.id}`;

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
          src={product.image}
          alt={product.alt || product.name}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* উইশলিস্ট বাটন */}
        <button 
          onClick={(e) => {
            e.preventDefault(); // মেইন লিঙ্ক ক্লিক হওয়া আটকাবে
            e.stopPropagation(); // ইভেন্ট বাবলিং আটকাবে
            console.log("Added to wishlist:", product.id);
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
          {product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;