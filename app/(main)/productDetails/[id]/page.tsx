"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products } from "@/data/products";
import ProductCard from "@/components/main/ProductCard/ProductCard"; // নিশ্চিত করুন পাথ ঠিক আছে
import { 
  Heart, ShoppingBag, ArrowLeft, Star, Truck, 
  RotateCcw, Plus, Minus, ChevronDown, ChevronUp 
} from 'lucide-react';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>('details');

  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4 font-sans">
        <h2 className="text-xl font-bold uppercase tracking-widest">Product Not Found</h2>
        <button onClick={() => router.back()} className="text-sm underline font-bold uppercase">Go Back</button>
      </div>
    );
  }

  // রিলেটেড প্রোডাক্ট ফিল্টার (একই ক্যাটাগরির অন্য প্রোডাক্ট)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors text-[11px] font-bold tracking-widest uppercase"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* Left: Product Images */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] bg-[#f9f9f9] overflow-hidden">
              {product.isNew && (
                <span className="absolute top-6 left-6 z-10 bg-black text-white text-[10px] font-bold px-4 py-1.5 uppercase tracking-[0.2em]">
                  New Arrival
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="mb-8 border-b pb-6 flex justify-between items-start">
              <div>
                <h1 className="text-xl font-bold text-gray-900 uppercase tracking-tight mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                  {product.category}
                </p>
              </div>
              <p className="text-xl font-bold text-gray-900">{product.price}</p>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[11px] font-bold uppercase tracking-widest">Sizes</h4>
                <button className="text-[10px] underline text-gray-400 font-bold hover:text-black uppercase">Size Chart</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-[11px] font-bold border transition-all duration-300 ${
                      selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-200 text-gray-900 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-500 mt-4 uppercase tracking-tighter italic">Free 1-2 day delivery on 5k+ pincodes</p>
            </div>

            {/* Actions */}
            <div className="space-y-4 mb-10">
              <button className="w-full bg-black text-white h-14 font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-3">
                ADD TO BAG
              </button>
            </div>

            {/* Accordion Sections */}
            <div className="border-t border-b divide-y divide-gray-100 mb-10">
              <AccordionItem 
                title="Details" 
                isOpen={openSection === 'details'} 
                onClick={() => toggleSection('details')}
              >
                <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-tight">
                  100% Premium Cotton. Regular fit. Breathable fabric. Made for everyday comfort.
                </p>
              </AccordionItem>
              <AccordionItem 
                title="Delivery" 
                isOpen={openSection === 'delivery'} 
                onClick={() => toggleSection('delivery')}
              >
                <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-tight">
                  Dispatch within 24 hours. Delivery across Bangladesh in 2-4 business days.
                </p>
              </AccordionItem>
              <AccordionItem 
                title="Returns" 
                isOpen={openSection === 'returns'} 
                onClick={() => toggleSection('returns')}
              >
                <p className="text-xs text-gray-600 leading-relaxed uppercase tracking-tight">
                  7 days easy return policy. Contact support for hassle-free exchanges.
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
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Accordion Component
const AccordionItem = ({ title, children, isOpen, onClick }: any) => (
  <div className="py-4">
    <button 
      onClick={onClick}
      className="w-full flex justify-between items-center text-[11px] font-bold uppercase tracking-widest py-1"
    >
      {title}
      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
    </button>
    {isOpen && (
      <div className="mt-4 pb-2">
        {children}
      </div>
    )}
  </div>
);