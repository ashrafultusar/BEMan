"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowRight, Zap } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext'; 

interface ProductProps {
  product: {
    _id: string;
    name: string;
    price: number | string;
    discountPrice?: number | string; // Discount Price add kora hoyeche
    images: string[];
    category: string;
    isNew?: boolean;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const imageSrc = product.images?.[0] || "/placeholder-image.jpg";
  const productPath = `/productDetails/${product._id}`;

  // Discount logic and calculation
  const originalPrice = Number(product.price);
  const salePrice = product.discountPrice ? Number(product.discountPrice) : null;
  const hasDiscount = salePrice !== null && salePrice < originalPrice;
  
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - salePrice!) / originalPrice) * 100) 
    : 0;

  const formatProductForCart = (): CartItem => ({
    _id: product._id,
    name: product.name,
    // Cart-e discounted price thakle oitai jabe
    price: salePrice || originalPrice,
    image: imageSrc,
    category: product.category || "General",
    quantity: 1 
  });

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(formatProductForCart());
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(formatProductForCart());
    router.push('/checkout'); 
  };

  return (
    <div className="group relative w-full bg-white transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden border border-gray-100">
      
      {/* ইমেজ সেকশন */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#fbfbfb] p-2">
        {/* Badges Container */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter shadow-sm w-fit">
              NEW
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[#c5a47e] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter shadow-sm w-fit">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        <Link href={productPath} className="relative block w-full h-full rounded-lg overflow-hidden border border-gray-50">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Quick Add Button */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <button 
            onClick={handleQuickAdd}
            className="w-full cursor-pointer bg-white/95 backdrop-blur-sm text-black py-2.5 rounded-lg font-bold text-[11px] flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all shadow-xl border border-white/20"
          >
            <ShoppingCart size={15} className="text-[#c5a47e]" /> {/* Real Gold Color Icon */}
            QUICK ADD
          </button>
        </div>
      </div>

      {/* টেক্সট ডিটেইলস */}
      <div className="p-4 pt-2">
        <div className="mb-3">
          <p className="text-[10px] font-bold text-[#c5a47e] uppercase tracking-widest mb-1">
            {product.category}
          </p>
          <Link href={productPath}>
            <h3 className="text-[14px] font-bold text-gray-800 group-hover:text-black transition-colors line-clamp-1 leading-tight tracking-tight">
              {product.name}
            </h3>
          </Link>
          
          {/* Price Section with Discount */}
          <div className="mt-2 flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-xl font-black text-gray-900 tracking-tight">
                  ৳ {salePrice?.toLocaleString()}
                </span>
                <span className="text-[12px] font-medium text-gray-400 line-through">
                  ৳ {originalPrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-xl font-black text-gray-900 tracking-tight">
                ৳ {originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Order Now Button */}
        <button 
          onClick={handleOrderNow}
          className="w-full cursor-pointer relative group/btn h-11 overflow-hidden bg-gray-950 text-white rounded-lg flex items-center justify-center transition-all active:scale-95 shadow-md"
        >
          {/* Gradient background changes to gold on hover instead of blue to match your theme */}
          <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#c5a47e] to-[#e2c29d] transition-all duration-500 ease-out group-hover/btn:w-full" />
          
          <div className="relative z-10 flex items-center justify-center gap-2 font-bold text-[12px] tracking-wider uppercase">
            <Zap size={14} fill="#FFD700" className="text-[#FFD700]" />
            Order Now
            <ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;