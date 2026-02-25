"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/main/ProductCard/ProductCard";
import { ArrowLeft, Plus, Minus } from "lucide-react";
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

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
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

            <div className="relative w-full aspect-[4/5] bg-[#f9f9f9] rounded-sm overflow-hidden flex-1">
              <Image src={activeImage} alt={product.name} fill priority className="object-contain p-4" sizes="(max-width: 768px) 100vw, 800px" />
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO (Based on your Uploaded Image) */}
          <div className="lg:col-span-5 flex flex-col">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-6">
               <span className="text-3xl font-bold">Price: <span className="text-red-600">৳ {Number(product.price).toLocaleString()}</span></span>
               {product.oldPrice && (
                 <span className="text-gray-400 line-through text-xl">৳ {product.oldPrice}</span>
               )}
            </div>

            {/* Buttons Group */}
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#ffb400] hover:bg-[#e6a200] text-black font-bold py-4 rounded-md transition-all text-sm uppercase"
              >
                Add to cart
              </button>
              <button 
                onClick={handleOrderNow}
                className="flex-1 bg-[#ff8000] hover:bg-[#e67300] text-white font-bold py-4 rounded-md transition-all text-sm uppercase"
              >
                অর্ডার করুন
              </button>
            </div>

            {/* Call Section */}
            <div className="bg-[#e2eeff] text-black text-center py-3 rounded-md font-bold mb-6 text-sm border border-blue-100">
              কল করতে ক্লিক করুন: 01795072200
            </div>

            {/* Product Meta */}
            <div className="space-y-3 mb-8">
              <p className="text-sm font-bold">Code : <span className="font-normal">N/A</span></p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold">Category:</p>
                <span className="bg-[#cbd5e1] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Shipping Table (Image Style) */}
            <div className="border-t-[1.5px] border-black">
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="text-sm">ঢাকায় ডেলিভারি খরচ</span>
                <span className="text-sm font-bold text-right italic">৳ {shippingRates.insideDhaka}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="text-sm">ঢাকার বাইরে কুরিয়ার খরচ</span>
                <span className="text-sm font-bold text-right italic">৳ {shippingRates.outsideDhaka}</span>
              </div>
            </div>

            {/* Description Accordion */}
            <div className="mt-8 border-b">
              <AccordionItem title="Description" isOpen={openSection === "details"} onClick={() => setOpenSection(openSection === "details" ? null : "details")}>
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20 border-t pt-16">
          <h2 className="text-center text-[10px] font-bold tracking-[0.4em] uppercase mb-12">Related Items</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((item: any) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const AccordionItem = ({ title, children, isOpen, onClick }: any) => (
  <div className="py-4 border-t">
    <button onClick={onClick} className="w-full flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
      {title}
      <div>{isOpen ? <Minus size={14} /> : <Plus size={14} />}</div>
    </button>
    <div className={`grid transition-all duration-300 overflow-hidden ${isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"}`}>
      <div className="min-h-0">{children}</div>
    </div>
  </div>
);