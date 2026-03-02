
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategories } from "@/lib/data/category";

export const dynamic = 'force-dynamic';

interface CategoryType {
  _id: string;
  name: string;
  image: string;
}

const FeaturedCategories = async () => {
  const response = await getCategories();
  const categories: CategoryType[] = response?.success ? response.data : [];

  if (!categories || categories.length === 0) return null;

  // প্রথম ৪টি ক্যাটাগরি দেখানো হচ্ছে
  const displayCategories = categories.slice(0, 4);

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header - Matching About & Instagram sections */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-[#c59d5f] text-[10px] tracking-[0.4em] uppercase font-bold">
              Explore
            </span>
            <h2 className="text-4xl md:text-5xl text-black font-serif mt-3 uppercase tracking-tight">
              Shop by <span className="italic text-[#c59d5f]">Category</span>
            </h2>
          </div>
          <Link 
            href="/shop/all" 
            className="text-[11px] font-bold uppercase tracking-widest text-black border-b border-black pb-1 hover:text-[#c59d5f] hover:border-[#c59d5f] transition-all duration-300 flex items-center gap-2 group"
          >
            View All Categories
            <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid Style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          {displayCategories.map((cat, index) => {
            const isFirst = index === 0;
            const slug = cat.name?.toLowerCase().replace(/\s+/g, "-");

            return (
              <Link
                key={cat._id}
                href={`/shop/${slug}`}
                className={`group relative overflow-hidden bg-[#f7f7f7] ${
                  isFirst 
                    ? "md:col-span-2 md:row-span-2" // প্রথম ক্যাটাগরি বড় হবে
                    : "md:col-span-1 md:row-span-1"
                }`}
              >
                {/* Image */}
                <Image
                  src={cat.image || "/placeholder.jpg"}
                  alt={cat.name}
                  fill
                  priority={isFirst}
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes={isFirst ? "50vw" : "25vw"}
                />
                
                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-[#c59d5f] text-[9px] font-bold uppercase tracking-[0.3em] mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    New Collection
                  </span>
                  <h3 className={`text-white font-serif tracking-wide transition-all duration-500 ${
                    isFirst ? 'text-3xl' : 'text-xl'
                  }`}>
                    {cat.name}
                  </h3>
                </div>

                {/* Real Color Icon Box */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-white flex items-center justify-center translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <ArrowUpRight size={20} color="#c59d5f" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;