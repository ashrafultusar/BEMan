"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/main/ProductCard/ProductCard";
import { ArrowLeft, Plus, Minus, Zap, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  product: any;
  relatedProducts: any[];
  shippingRates: { insideDhaka: number; outsideDhaka: number };
}

export default function ProductDetailsClient({ product, relatedProducts, shippingRates }: Props) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState<string>(product.images?.[0] || "/placeholder.jpg");
  const [openSection, setOpenSection] = useState<string | null>("details");

  // --- Logic for Discount & Price ---
  const originalPrice = Number(product.price);
  const salePrice = product.discountPrice ? Number(product.discountPrice) : null;
  const hasDiscount = salePrice !== null && salePrice > 0 && salePrice < originalPrice;

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      // ডিসকাউন্ট থাকলে ডিসকাউন্ট প্রাইস যাবে, নাহলে রেগুলার প্রাইস
      price: hasDiscount ? salePrice! : originalPrice,
      image: product.images[0],
      category: product.category,
      quantity: 1,
    });
    toast.success("Added to Bag!", { position: "top-center" });
  };

  const handleOrderNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      <Toaster />
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors text-xs font-bold uppercase"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* LEFT: IMAGE SECTION */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-3 overflow-x-auto no-scrollbar shrink-0">
              {product.images?.map((img: string, index: number) => (
                <div 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-20 md:w-20 md:h-24 cursor-pointer border transition-all rounded-sm overflow-hidden shrink-0 ${
                    activeImage === img ? "border-black" : "border-transparent opacity-60"
                  }`}
                >
                  <Image src={img} alt={product.name} fill sizes="80px" className="object-cover" />
                </div>
              ))}
            </div>

            <div className="relative w-full aspect-[4/5] bg-[#f9f9f9] rounded-sm overflow-hidden flex-1 border border-gray-50">
              <Image src={activeImage} alt={product.name} fill priority className="object-contain p-4" sizes="(max-width: 768px) 100vw, 800px" />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-[#c5a47e] text-white px-3 py-1 text-xs font-bold rounded-sm shadow-lg">
                   {Math.round(((originalPrice - salePrice!) / originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-5 flex flex-col">
            <p className="text-[#c5a47e] text-xs font-bold uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold mb-4 tracking-tight">{product.name}</h1>
            
            <div className="flex items-baseline gap-3 mb-8">
               {hasDiscount ? (
                 <>
                   <span className="text-4xl font-black text-red-600">৳ {salePrice?.toLocaleString()}</span>
                   <span className="text-gray-400 line-through text-xl">৳ {originalPrice.toLocaleString()}</span>
                 </>
               ) : (
                 <span className="text-4xl font-black text-gray-900">৳ {originalPrice.toLocaleString()}</span>
               )}
            </div>

            {/* Buttons Group */}
            <div className="flex flex-col gap-3 mb-6">
              <button 
                onClick={handleOrderNow}
                className="w-full bg-black hover:bg-gray-900 text-white font-bold py-5 rounded-lg transition-all text-[13px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-xl"
              >
                <Zap size={18} fill="#c5a47e" className="text-[#c5a47e]" />
                অর্ডার করুন
              </button>
              
              <button 
                onClick={handleAddToCart}
                className="w-full border-2 border-black hover:bg-black hover:text-white text-black font-bold py-5 rounded-lg transition-all text-[13px] uppercase tracking-[0.2em] flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                Add to Bag
              </button>
            </div>

            {/* Call Section */}
            <a 
              href="tel:01795072200" 
              className="bg-[#e2eeff] text-[#004dc0] text-center py-4 rounded-lg font-bold mb-8 text-sm border border-blue-100 flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
            >
              কল করতে ক্লিক করুন: 01795072200
            </a>

            {/* Shipping Rates Table */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Shipping Information</h3>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-sm font-medium">ঢাকায় ডেলিভারি</span>
                <span className="text-sm font-bold italic">৳ {shippingRates.insideDhaka}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">ঢাকার বাইরে কুরিয়ার</span>
                <span className="text-sm font-bold italic">৳ {shippingRates.outsideDhaka}</span>
              </div>
            </div>

            {/* Description Accordion */}
            <div className="mt-8">
              <AccordionItem title="Details & Care" isOpen={openSection === "details"} onClick={() => setOpenSection(openSection === "details" ? null : "details")}>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20 border-t pt-16">
          <div className="flex justify-between items-end mb-10">
            <div>
               <h2 className="text-2xl font-bold tracking-tight">You May Also Like</h2>
               <div className="h-1 w-12 bg-[#c5a47e] mt-2"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {relatedProducts.slice(0, 5).map((item: any) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const AccordionItem = ({ title, children, isOpen, onClick }: any) => (
  <div className="border-t border-gray-200">
    <button onClick={onClick} className="w-full py-5 flex justify-between items-center text-[12px] font-bold uppercase tracking-[0.2em]">
      {title}
      <div>{isOpen ? <Minus size={16} /> : <Plus size={16} />}</div>
    </button>
    <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
      <div className="min-h-0 text-sm text-gray-500">{children}</div>
    </div>
  </div>
);