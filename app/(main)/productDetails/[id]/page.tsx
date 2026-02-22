"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { products } from "@/data/products";
import ProductCard from "@/components/main/ProductCard/ProductCard";
import { ArrowLeft, Plus, Minus } from "lucide-react";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const [openSection, setOpenSection] = useState<string | null>("details");

  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4 font-sans">
        <h2 className="text-xl font-bold uppercase tracking-widest">
          Product Not Found
        </h2>
        <button
          onClick={() => router.back()}
          className="text-sm underline font-bold uppercase"
        >
          Go Back
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Navigation */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors text-[11px] font-bold tracking-widest uppercase"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left: Product Image (Full Image View) */}
          <div className="lg:col-span-6 xl:col-span-7 flex items-start justify-center bg-[#f9f9f9] rounded-sm overflow-hidden">
            <div className="relative w-full h-[500px] md:h-[700px]">
              {product.isNew && (
                <span className="absolute top-4 left-4 z-10 bg-black text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
                  New Arrival
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
            <div className="mb-6 border-b pb-6">
              <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight mb-1">
                {product.name}
              </h1>
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                {product.category}
              </p>
              <p className="text-2xl font-medium text-gray-900">
                {product.price}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[11px] font-bold uppercase tracking-widest">
                  Select Size
                </h4>
                <button className="text-[10px] underline text-gray-400 font-bold hover:text-black uppercase">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-[11px] font-bold border transition-all duration-200 ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-900 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mb-8">
              <button className="w-full bg-black text-white h-14 font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all active:scale-[0.98]">
                ADD TO BAG
              </button>
              <p className="text-[10px] text-gray-400 mt-4 text-center uppercase tracking-widest">
                Free shipping on orders over ৳5000
              </p>
            </div>

            {/* Accordion Sections with Tailwind Animation */}
            <div className="border-t border-b divide-y divide-gray-100">
              <AccordionItem
                title="Product Details"
                isOpen={openSection === "details"}
                onClick={() => toggleSection("details")}
              >
                <div className="text-[12px] text-gray-600 leading-relaxed space-y-2 pb-2">
                  <p>• 100% Premium Cotton for maximum breathability.</p>
                  <p>• Reinforced stitching for long-lasting durability.</p>
                  <p>• Relaxed fit designed for everyday style.</p>
                </div>
              </AccordionItem>

              <AccordionItem
                title="Delivery Info"
                isOpen={openSection === "delivery"}
                onClick={() => toggleSection("delivery")}
              >
                <p className="text-[12px] text-gray-600 leading-relaxed pb-2">
                  Dispatch within 24 hours. Delivery across Bangladesh in 2-4
                  business days.
                </p>
              </AccordionItem>

              <AccordionItem
                title="Return Policy"
                isOpen={openSection === "returns"}
                onClick={() => toggleSection("returns")}
              >
                <p className="text-[12px] text-gray-600 leading-relaxed pb-2">
                  7 days easy return policy. Ensure tags are intact for a
                  hassle-free exchange.
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <section className="mt-20 border-t pt-16">
          <h2 className="text-center text-xs font-bold tracking-[0.4em] uppercase mb-12">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((item) => (
              <ProductCard 
              key={item.id} 
              product={{
                ...item,
                _id: item.id.toString(), 
                images: [item.image],   
              }} 
            />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * Accordion Component with Tailwind Grid Animation
 */
const AccordionItem = ({ title, children, isOpen, onClick }: any) => (
  <div className="py-4">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-[11px] font-bold uppercase tracking-widest py-1 hover:text-gray-500 transition-colors"
    >
      {title}
      <div
        className={`transition-transform duration-300 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      >
        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
      </div>
    </button>

    <div
      className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen
          ? "grid-rows-[1fr] opacity-100 mt-4"
          : "grid-rows-[0fr] opacity-0 mt-0"
      }`}
    >
      <div className="min-h-0">
        <div className="pb-2">{children}</div>
      </div>
    </div>
  </div>
);
