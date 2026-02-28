"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/main/ProductCard/ProductCard";
import {
  ArrowLeft,
  Plus,
  Minus,
  Zap,
  ShoppingBag,
  Box,
  Droplets,
  Hash,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  product: any;
  relatedProducts: any[];
  shippingRates: { insideDhaka: number; outsideDhaka: number };
}

export default function ProductDetailsClient({
  product,
  relatedProducts,
  shippingRates,
}: Props) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState<string>(
    product.images?.[0] || "/placeholder.jpg"
  );
  const [openSection, setOpenSection] = useState<string | null>("details");
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] || ""
  );

  const originalPrice = Number(product.price);
  const salePrice = product.discountPrice
    ? Number(product.discountPrice)
    : null;
  const hasDiscount =
    salePrice !== null && salePrice > 0 && salePrice < originalPrice;
  const currentPrice = hasDiscount ? salePrice! : originalPrice;

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size first!");
      return;
    }

    addToCart({
      _id: product._id,
      productId: product.productId || "N/A", // প্রোডাক্ট কোড যোগ করা হলো
      name: product.name,
      price: currentPrice,
      image: product.images[0],
      category: product.category,
      size: selectedSize,
      quantity: 1,
    });
    toast.success(`${product.name} (${selectedSize}) added!`, {
      position: "top-center",
    });
  };

  const handleOrderNow = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size first!");
      return;
    }
    handleAddToCart();
    router.push("/checkout");
  };

  const whatsappMessage = `Hello BEMEN! I want to order this item:
Code: ${product.productId}
Product: ${product.name}
Size: ${selectedSize}
Price: ৳${currentPrice.toLocaleString()}
Link: ${typeof window !== "undefined" ? window.location.href : ""}`;

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      <Toaster />
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-3 overflow-x-auto no-scrollbar shrink-0">
              {product.images?.map((img: string, index: number) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-20 md:w-20 md:h-24 cursor-pointer border-2 transition-all rounded-md overflow-hidden shrink-0 ${
                    activeImage === img
                      ? "border-black"
                      : "border-gray-100 opacity-60"
                  }`}
                >
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
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
                  {Math.round(
                    ((originalPrice - salePrice!) / originalPrice) * 100
                  )}
                  % OFF
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-6">
              <p className="text-amber-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tighter text-gray-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-[11px] font-bold text-gray-400 mb-4 flex items-center gap-1">
                <Hash size={12} /> ID: {product.productId}
              </p>
              <div className="flex items-baseline gap-4">
                {hasDiscount ? (
                  <>
                    <span className="text-4xl font-black text-red-600">
                      ৳{salePrice?.toLocaleString()}
                    </span>
                    <span className="text-gray-400 line-through text-xl">
                      ৳{originalPrice.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-black text-gray-900">
                    ৳{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                    Select Size
                  </h3>
                  <span className="text-[10px] text-gray-400 font-bold underline cursor-pointer">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 w-16 flex items-center justify-center rounded-lg border-2 font-bold transition-all text-sm ${
                        selectedSize === size
                          ? "border-black bg-black text-white shadow-lg scale-105"
                          : "border-gray-100 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleOrderNow}
                className="w-full bg-black hover:bg-gray-800 text-white font-bold py-5 rounded-xl transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl active:scale-95"
              >
                <Zap size={18} fill="#fbbf24" className="text-amber-400" /> Buy
                It Now
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full border-2 border-black hover:bg-black hover:text-white text-black font-bold py-5 rounded-xl transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>
            </div>

            <div className="mb-8">
              <a
                href={`https://wa.me/8801644044539?text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white text-center py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1da851] transition-all shadow-md active:scale-95"
              >
                Order via WhatsApp
              </a>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4 shadow-sm mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                Specifications
              </h3>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="flex items-center gap-2 text-sm font-medium text-gray-600 tracking-tight">
                  <Box size={14} /> Material
                </span>
                <span className="text-sm font-black text-gray-900">
                  {product.material || "Quality Fabric"}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-600 tracking-tight">
                  Availability
                </span>
                <span
                  className={`text-sm font-black ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Sold Out"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 tracking-tight">
                  Inside Dhaka Delivery
                </span>
                <span className="text-sm font-black text-gray-900">
                  ৳{shippingRates.insideDhaka}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <AccordionItem
                title="Description"
                isOpen={openSection === "details"}
                onClick={() =>
                  setOpenSection(openSection === "details" ? null : "details")
                }
              >
                <div className="text-sm text-gray-600 leading-[1.8] whitespace-pre-line font-medium">
                  {product.description}
                </div>
              </AccordionItem>
              {product.care && (
                <AccordionItem
                  title="Care Instructions"
                  isOpen={openSection === "care"}
                  onClick={() =>
                    setOpenSection(openSection === "care" ? null : "care")
                  }
                >
                  <div className="flex gap-3 text-sm text-gray-600 leading-[1.8] font-medium">
                    <Droplets size={18} className="shrink-0 text-blue-500" />
                    <p>{product.care}</p>
                  </div>
                </AccordionItem>
              )}
            </div>
          </div>
        </div>

        <section className="mt-24 border-t border-gray-100 pt-16">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic">
              You May Also Like
            </h2>
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
    <button
      onClick={onClick}
      className="w-full py-6 flex justify-between items-center text-[11px] font-black uppercase tracking-[0.3em] text-gray-900"
    >
      {title}
      <div className="transition-transform duration-300">
        {isOpen ? (
          <Minus size={16} className="text-amber-600" />
        ) : (
          <Plus size={16} />
        )}
      </div>
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]"
      }`}
    >
      <div className="min-h-0">{children}</div>
    </div>
  </div>
);
