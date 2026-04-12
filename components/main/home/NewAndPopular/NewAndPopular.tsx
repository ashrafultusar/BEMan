"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import { getProducts } from "@/lib/data/product";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

const filterCategories = [
  "ALL",
  "SHIRTS",
  "JEANS",
  "TROUSERS",
  "POLOS",
  "CARGOS",
  "PLUS SIZE",
];

interface NewAndPopularProps {
  initialProducts: any[];
}

const NewAndPopular: React.FC<NewAndPopularProps> = ({ initialProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [products, setProducts] = useState<any[]>(initialProducts || []);

  const filteredProducts =
    selectedCategory === "ALL"
      ? products
      : products.filter((item) => item.category?.toUpperCase() === selectedCategory);

  return (
    <section className="bg-white py-20 px-4 max-w-[1400px] mx-auto min-h-[600px]">
      {/* Header with Luxury Gold Tone */}
      <div className="text-center mb-12">
        <span className="text-[#c59d5f] text-[10px] tracking-[0.4em] uppercase font-bold">
          BEMEN Collection
        </span>
        <h2 className="text-4xl md:text-5xl text-black font-serif mt-3 uppercase tracking-tight">
          New & <span className="italic text-[#c59d5f]">Popular</span>
        </h2>
      </div>

      {/* Filter Buttons - Refined Design */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-[11px] font-bold px-6 py-2 transition-all duration-300 border uppercase tracking-wider
              ${selectedCategory === cat
                ? "bg-black text-white border-black"
                : "bg-transparent text-gray-500 border-gray-100 hover:border-[#c59d5f] hover:text-[#c59d5f]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>


      <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-5">
          {filteredProducts.map((product) => (
            <div key={product._id} className="group">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
              No products found in <span className="text-black">{selectedCategory}</span>
            </p>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="mt-20 flex justify-center">
            <Link
              href="/shop/all"
              className="group relative flex items-center gap-4 px-12 py-5 bg-black text-white text-[11px] font-bold tracking-[0.3em] uppercase transition-all overflow-hidden"
            >
              {/* Visual Background Effect */}
              <span className="absolute inset-0 w-0 bg-[#c59d5f] transition-all duration-300 group-hover:w-full"></span>

              <span className="relative z-10 flex items-center gap-4">
                Explore Full Shop
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </span>
            </Link>
          </div>
        )}
      </>
    </section>
  );
};

export default NewAndPopular;