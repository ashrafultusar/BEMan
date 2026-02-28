"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/main/ProductCard/ProductCard";
import { ArrowLeft, Plus, Minus, Zap, ShoppingBag, Phone } from "lucide-react";
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

  const originalPrice = Number(product.price);
  const salePrice = product.discountPrice ? Number(product.discountPrice) : null;
  const hasDiscount = salePrice !== null && salePrice > 0 && salePrice < originalPrice;
  const currentPrice = hasDiscount ? salePrice! : originalPrice;

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: currentPrice,
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

  // WhatsApp Message dynamic generation
  const whatsappMessage = `Hello BEMEN! I want to order this item:
Product: ${product.name}
Price: ৳${currentPrice.toLocaleString()}
Link: ${typeof window !== "undefined" ? window.location.href : ""}`;

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      <Toaster />
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* LEFT: IMAGE SECTION */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-3 overflow-x-auto no-scrollbar shrink-0">
              {product.images?.map((img: string, index: number) => (
                <div 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-20 md:w-20 md:h-24 cursor-pointer border-2 transition-all rounded-md overflow-hidden shrink-0 ${
                    activeImage === img ? "border-black" : "border-gray-100 opacity-60"
                  }`}
                >
                  <Image src={img} alt={product.name} fill sizes="100px" className="object-cover" />
                </div>
              ))}
            </div>

            <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden flex-1 border border-gray-100 shadow-inner">
              <Image 
                src={activeImage} 
                alt={product.name} 
                fill 
                priority 
                className="object-contain p-2 md:p-6" 
                sizes="(max-width: 768px) 100vw, 800px" 
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1.5 text-[10px] font-black rounded-full shadow-xl animate-bounce">
                   {Math.round(((originalPrice - salePrice!) / originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-6">
                <p className="text-amber-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{product.category}</p>
                <h1 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter text-gray-900 leading-tight">{product.name}</h1>
                <div className="flex items-baseline gap-4">
                   {hasDiscount ? (
                     <>
                       <span className="text-4xl font-black text-red-600">৳{salePrice?.toLocaleString()}</span>
                       <span className="text-gray-400 line-through text-xl">৳{originalPrice.toLocaleString()}</span>
                     </>
                   ) : (
                     <span className="text-4xl font-black text-gray-900">৳{originalPrice.toLocaleString()}</span>
                   )}
                </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col gap-3 mb-8">
              <button 
                onClick={handleOrderNow}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-5 rounded-xl transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl active:scale-95"
              >
                <Zap size={18} fill="#fbbf24" className="text-amber-400" />
                Buy It Now
              </button>
              
              <button 
                onClick={handleAddToCart}
                className="w-full border-2 border-black hover:bg-black hover:text-white text-black font-bold py-5 rounded-xl transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingBag size={18} />
                Add to Bag
              </button>
            </div>

            {/* --- WhatsApp & Call Section (Colorful) --- */}
            <div >
              
                <a 
                  href={`https://wa.me/8801644044539?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white text-center py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1da851] transition-all shadow-md active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 7.11 3.017a9.825 9.825 0 013.012 7.103c-.001 5.45-4.435 9.884-9.886 9.884m0-21.867C6.335.003.593 5.746.591 12.879c0 2.28.596 4.505 1.73 6.469L0 24l4.773-1.252a12.637 12.637 0 006.117 1.577h.005c7.032 0 12.75-5.718 12.752-12.75.001-3.407-1.326-6.61-3.737-9.023A12.68 12.68 0 0012.051.006z" />
                  </svg>
                  Call Now
                </a>

              
            </div>

            {/* Shipping Rates Table */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Shipping Rates</h3>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600 tracking-tight">Inside Dhaka</span>
                <span className="text-sm font-black text-gray-900">৳{shippingRates.insideDhaka}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 tracking-tight">Outside Dhaka (Courier)</span>
                <span className="text-sm font-black text-gray-900">৳{shippingRates.outsideDhaka}</span>
              </div>
            </div>

            {/* Description Accordion */}
            <div className="mt-10">
              <AccordionItem title="Description & Care" isOpen={openSection === "details"} onClick={() => setOpenSection(openSection === "details" ? null : "details")}>
                <div className="text-sm text-gray-600 leading-[1.8] whitespace-pre-line font-medium">
                  {product.description}
                </div>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-24 border-t border-gray-100 pt-16">
          <div className="flex flex-col items-center mb-12">
               <h2 className="text-2xl font-black tracking-tighter uppercase italic">You May Also Like</h2>
               <div className="h-1 w-16 bg-amber-500 mt-3 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
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
  <div className="border-t border-gray-100">
    <button onClick={onClick} className="w-full py-6 flex justify-between items-center text-[11px] font-black uppercase tracking-[0.3em] text-gray-900">
      {title}
      <div className="transition-transform duration-300">
          {isOpen ? <Minus size={16} className="text-amber-600" /> : <Plus size={16} />}
      </div>
    </button>
    <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"}`}>
      <div className="min-h-0">{children}</div>
    </div>
  </div>
);