import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/data/category";

interface CategoryType {
  _id: string;
  title: string;
  image: string;
  alt?: string;
}

const FeaturedCategories = async () => {
  const response = await getCategories();
  const categories: CategoryType[] = response.data;

  if (!categories || categories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16" aria-labelledby="category-heading">
      <h2 id="category-heading" className="text-center text-2xl font-bold mb-10 tracking-tight uppercase">
        Featured Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((category, index) => (
         // Optimized Link with safety checks
<Link
  href={`/shop/${category.title?.toLowerCase().replace(/\s+/g, "-") || "all"}`}
  key={category._id || index}
  className="group block relative overflow-hidden bg-gray-100 aspect-[3/4]"
  title={`Browse our ${category.title || 'collection'}`}
>
            <Image
              src={category.image}
              alt={category.alt || category.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              // Priority for the first few images to improve LCP (Largest Contentful Paint)
              priority={index < 4}
            />

            {/* Badge for New Items */}
            <div className="absolute top-3 inset-x-0 flex justify-center z-10">
              <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-semibold">
                JUST LAUNCHED
              </span>
            </div>

            {/* Overlay Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6">
              <h3 className="text-white font-bold text-xs md:text-sm tracking-[0.2em] uppercase text-center px-2">
                {category.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;