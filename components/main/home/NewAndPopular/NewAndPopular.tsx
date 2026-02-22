"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import { getProducts } from "@/lib/data/product"; // Apnar toiri kora function
import { Loader2 } from "lucide-react";

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
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Dynamic Data Fetching ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await getProducts();
      if (result.success) {
        setProducts(result.data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // --- Filtering Logic ---
  const filteredProducts =
    selectedCategory === "ALL"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-white py-12 px-4 max-w-[1400px] mx-auto min-h-[600px]">
      <h2 className="text-center text-sm font-bold tracking-[0.2em] uppercase mb-6 text-black">
        NEW AND POPULAR
      </h2>

      {/* Filter Buttons */}
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

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-gray-400" size={32} />
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Loading BEMEN Collection...</p>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 border border-dashed border-gray-100 rounded">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                No products found in {selectedCategory}
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NewAndPopular;