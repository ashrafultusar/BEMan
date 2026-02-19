import React from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "SHIRTS",
    image: "/assets/categorise/1.jpg",
    alt: "Premium collection of men's casual and formal shirts",
  },
  {
    title: "TROUSERS",
    image: "/assets/categorise/3.jpg",
    alt: "Stylish cotton and linen trousers for men",
  },
  {
    title: "JEANS",
    image: "/assets/categorise/4.jpg",
    alt: "Durable slim fit and regular denim jeans",
  },
  {
    title: "POLOS",
    image: "/assets/categorise/5.jpg",
    alt: "Classic polo t-shirts in various colors",
  },
  {
    title: "CARGOS",
    image: "/assets/categorise/6.jpg",
    alt: "Comfortable multi-pocket cargo pants",
  },
  {
    title: "OVERSHIRTS",
    image: "/assets/categorise/7.jpg",
    alt: "Trendy overshirts for layering",
  },
  {
    title: "PLUS SIZE",
    image: "/assets/categorise/8.jpg",
    alt: "Men's plus size clothing collection",
  },
];

const FeaturedCategories: React.FC = () => {
  return (
    <section
      className="max-w-7xl mx-auto px-4 py-16"
      aria-labelledby="category-heading"
    >
      <h2
        id="category-heading"
        className="text-center text-2xl font-bold mb-10 tracking-tight uppercase"
      >
        Featured Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((category, index) => (
          <Link
            href={`/shop/${category.title.toLowerCase().replace(" ", "-")}`}
            key={index}
            className="group block relative overflow-hidden bg-gray-100 aspect-[3/4]"
            title={`Browse our ${category.title} collection`}
          >
            {/* Image Optimization */}
            <Image
              src={category.image}
              alt={category.alt} 
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              loading={index < 4 ? "eager" : "lazy"} 
              priority={index < 2} 
            />

            {/* Badge for New Items */}
            {category && (
              <div className="absolute top-3 inset-x-0 flex justify-center z-10">
                <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-semibold">
                  JUST LAUNCHED
                </span>
              </div>
            )}

            {/* Overlay Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6">
              <h3 className="text-white font-bold text-xs md:text-sm tracking-[0.2em] uppercase">
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
