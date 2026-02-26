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

const NewAndPopular: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await getProducts();
      if (result.success) {
        // ডাটাবেজ থেকে পাওয়া ডাটাকে ফরম্যাট করা
        const formattedData = result.data.map((item: any) => ({
          ...item,
          _id: item._id?.toString() || String(item.id),
          images: item.images || (item.image ? [item.image] : []),
          // সংখ্যার ফরম্যাট নিশ্চিত করা
          price: Number(item.price),
          discountPrice: item.discountPrice ? Number(item.discountPrice) : null,
        }));
        setProducts(formattedData);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "ALL"
      ? products
      : products.filter((item) => item.category?.toUpperCase() === selectedCategory);

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
              ${selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="animate-spin text-gray-400" size={32} />
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Loading BEMEN Collection...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                No products found in {selectedCategory}
              </p>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="mt-16 flex justify-center">
              <Link
                href="/shop"
                className="group flex items-center gap-3 px-10 py-4 bg-black text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:opacity-90"
              >
                View All Products
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NewAndPopular;