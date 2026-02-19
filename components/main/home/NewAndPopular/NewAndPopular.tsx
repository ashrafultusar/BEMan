"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import ProductCard from "../../ProductCard/ProductCard";
import { products } from "@/data/products";

const filterCategories = [
  "ALL",
  "SHIRTS",
  "JEANS",
  "TROUSERS",
  "POLOS",
  "CARGOS",
  "PLUS SIZE",
];

const NewAndPopular: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredProducts =
    selectedCategory === "ALL"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-white py-12 px-4 max-w-[1400px] mx-auto">
      <h2 className="text-center text-sm font-bold tracking-[0.2em] uppercase mb-6 text-black">
        NEW AND POPULAR
      </h2>

      {/* ৩. Filter Buttons with onClick handler */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-[10px] font-bold px-4 py-1.5 border border-black transition-all cursor-pointer uppercase
              ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 py-20">
          No products found in this category.
        </p>
      )}
    </section>
  );
};

export default NewAndPopular;
