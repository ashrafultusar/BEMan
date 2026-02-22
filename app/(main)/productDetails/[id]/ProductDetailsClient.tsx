"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/main/ProductCard/ProductCard";
import { ArrowLeft, Plus, Minus } from "lucide-react";

interface Props {
  product: any;
  relatedProducts: any[];
}

export default function ProductDetailsClient({ product, relatedProducts }: Props) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState<string>(product.images?.[0] || "/placeholder-image.jpg");
  const [selectedSize, setSelectedSize] = useState("");
  const [openSection, setOpenSection] = useState<string | null>("details");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors text-[11px] font-bold tracking-widest uppercase"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-16">
          
          {/* LEFT: IMAGE SECTION */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:max-h-[600px] shrink-0">
              {product.images?.map((img: string, index: number) => (
                <div 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-20 md:w-20 md:h-24 cursor-pointer border transition-all duration-200 rounded-sm overflow-hidden shrink-0 ${
                    activeImage === img ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={product.name} fill  priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px" className="object-cover" />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] max-h-[500px] md:max-h-[700px] bg-[#f9f9f9] rounded-sm overflow-hidden flex-1">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-contain p-4 md:p-8 transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-6 border-b pb-6">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-tight mb-1">{product.name}</h1>
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">{product.category}</p>
              <p className="text-xl md:text-2xl font-medium text-gray-900">৳ {Number(product.price).toLocaleString()}</p>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h4 className="text-[11px] font-bold uppercase tracking-widest mb-4">Select Size</h4>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 md:w-12 md:h-12 text-[10px] md:text-[11px] font-bold border transition-all ${
                      selectedSize === size ? "border-black bg-black text-white" : "border-gray-200 text-gray-900 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-black text-white h-12 md:h-14 font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all">
              ADD TO BAG
            </button>

            {/* Accordions */}
            <div className="mt-8 border-t border-b divide-y divide-gray-100">
              <AccordionItem title="Description" isOpen={openSection === "details"} onClick={() => toggleSection("details")}>
                <p className="text-[12px] text-gray-600 pb-2">{product.description}</p>
              </AccordionItem>
            </div>
          </div>
        </div>

        {/* Related Items */}
        <section className="mt-20 border-t pt-16">
          <h2 className="text-center text-xs font-bold tracking-[0.4em] uppercase mb-12">Related Items</h2>
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
  <div className="py-4">
    <button onClick={onClick} className="w-full flex justify-between items-center text-[11px] font-bold uppercase tracking-widest py-1 hover:text-gray-500 transition-colors">
      {title}
      <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>{isOpen ? <Minus size={14} /> : <Plus size={14} />}</div>
    </button>
    <div className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}>
      <div className="min-h-0"><div className="pb-2">{children}</div></div>
    </div>
  </div>
);