"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowRight, Zap } from 'lucide-react';
import { useCart, CartItem } from '@/context/CartContext'; 
import toast from 'react-hot-toast'; 

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
  const { addToCart } = useCart();
  const router = useRouter();

  const imageSrc = product.images?.[0] || "/placeholder-image.jpg";
  const productPath = `/product/${product._id}`;

  const formatProductForCart = (): CartItem => ({
    _id: product._id,
    name: product.name,
    price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
    image: imageSrc,
    category: product.category || "General",
    quantity: 1 
  });

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // ১. প্রথমে ডাটা ফরম্যাট করুন
    const item = formatProductForCart();
    
    // ২. কার্টে অ্যাড করুন
    addToCart(item);
    
    // ৩. টোস্ট দেখান (সরাসরি এবং কোনো কন্ডিশন ছাড়া)
    toast.success(`${product.name} added to bag!`, {
        duration: 2000,
        style: {
            minWidth: '250px',
        }
    });
  };

  const handleOrderNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(formatProductForCart());
    router.push('/checkout'); 
  };

  return (
    <div className="group relative w-full bg-white transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden border border-gray-100">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#fbfbfb] p-2">
        <Link href={productPath} className="relative block w-full h-full rounded-lg overflow-hidden">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </Link>

        {/* QUICK ADD Button */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <button 
            type="button" // type="button" দেওয়া জরুরি
            onClick={handleQuickAdd}
            className="w-full cursor-pointer bg-white/95 backdrop-blur-sm text-black py-2.5 rounded-lg font-bold text-[11px] flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all shadow-xl border border-white/20"
          >
            <ShoppingCart size={15} className="text-[#2563EB]" />
            QUICK ADD
          </button>
        </div>
      </div>

      <div className="p-4 pt-2">
        <Link href={productPath}>
          <h3 className="text-[14px] font-bold text-gray-800 line-clamp-1">{product.name}</h3>
        </Link>
        <div className="mt-2 mb-3">
          <span className="text-xl font-black text-gray-900">৳ {Number(product.price).toLocaleString()}</span>
        </div>

        <button 
          onClick={handleOrderNow}
          className="w-full cursor-pointer relative group/btn h-11 overflow-hidden bg-black text-white rounded-lg flex items-center justify-center transition-all active:scale-95"
        >
          <div className="relative z-10 flex items-center gap-2 font-bold text-[12px] uppercase tracking-wider">
            <Zap size={14} fill="#FFD700" className="text-[#FFD700]" />
            Order Now
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;