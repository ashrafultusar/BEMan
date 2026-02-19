"use client"; 

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';


const products = [
    // SHIRTS
    { id: 1, name: "Classic White Linen Shirt", price: "₹1,499", image: "/assets/categorise/1.jpg", category: "SHIRTS", alt: "Premium white formal linen shirt for men", isNew: true },
    { id: 2, name: "Checked Flannel Overshirt", price: "₹1,899", image: "/assets/categorise/1.jpg", category: "SHIRTS", alt: "Red and black checked flannel shirt", isNew: false },
    { id: 3, name: "Oxford Blue Slim Fit", price: "₹1,299", image: "/assets/categorise/1.jpg", category: "SHIRTS", alt: "Light blue oxford cotton shirt", isNew: false },
    { id: 4, name: "Mandarin Collar Casual Shirt", price: "₹1,199", image: "/assets/categorise/1.jpg", category: "SHIRTS", alt: "Dark green mandarin collar shirt", isNew: true },
    // TROUSERS
    { id: 5, name: "Beige Chino Trousers", price: "₹1,799", image: "/assets/categorise/3.jpg", category: "TROUSERS", alt: "Slim fit beige cotton chinos", isNew: false },
    { id: 6, name: "Formal Charcoal Slacks", price: "₹2,199", image: "/assets/categorise/3.jpg", category: "TROUSERS", alt: "Formal grey trousers for office wear", isNew: true },
    { id: 7, name: "Olive Green Cotton Trousers", price: "₹1,599", image: "/assets/categorise/3.jpg", category: "TROUSERS", alt: "Casual olive green trousers", isNew: false },
    // JEANS
    { id: 8, name: "Light Wash Baggy Jeans", price: "₹1,999", image: "/assets/categorise/4.jpg", category: "JEANS", alt: "Relaxed fit light blue denim jeans", isNew: true },
    { id: 9, name: "Midnight Black Slim Jeans", price: "₹1,899", image: "/assets/categorise/4.jpg", category: "JEANS", alt: "Solid black slim fit denim", isNew: false },
    { id: 10, name: "Distressed Raw Denim", price: "₹2,499", image: "/assets/categorise/4.jpg", category: "JEANS", alt: "Premium distressed indigo jeans", isNew: false },
    { id: 11, name: "Vintage Straight Cut", price: "₹1,799", image: "/assets/categorise/4.jpg", category: "JEANS", alt: "Classic straight leg denim jeans", isNew: true },
    // POLOS
    { id: 12, name: "Navy Blue Pique Polo", price: "₹999", image: "/assets/categorise/5.jpg", category: "POLOS", alt: "Navy blue classic polo t-shirt", isNew: false },
    { id: 13, name: "Striped Summer Polo", price: "₹1,099", image: "/assets/categorise/5.jpg", category: "POLOS", alt: "White and blue striped polo shirt", isNew: true },
    { id: 14, name: "Burgundy Knit Polo", price: "₹1,299", image: "/assets/categorise/5.jpg", category: "POLOS", alt: "Textured burgundy polo shirt", isNew: false },
    // CARGOS
    { id: 15, name: "Utility Cargo Pants", price: "₹1,999", image: "/assets/categorise/6.jpg", category: "CARGOS", alt: "Multi-pocket khaki cargo pants", isNew: true },
    { id: 16, name: "Tactical Black Cargos", price: "₹2,299", image: "/assets/categorise/6.jpg", category: "CARGOS", alt: "Heavy duty black utility cargos", isNew: false },
    { id: 17, name: "Desert Sand Relaxed Cargos", price: "₹1,899", image: "/assets/categorise/6.jpg", category: "CARGOS", alt: "Sand colored relaxed fit cargos", isNew: false },
    // PLUS SIZE
    { id: 18, name: "Plus Size Denim Jacket", price: "₹2,999", image: "/assets/categorise/8.jpg", category: "PLUS SIZE", alt: "Extra large denim jacket for men", isNew: true },
    { id: 19, name: "XXL Vertical Stripe Shirt", price: "₹1,699", image: "/assets/categorise/8.jpg", category: "PLUS SIZE", alt: "Slimming vertical striped shirt for plus size", isNew: false },
    { id: 20, name: "Comfort Fit Plus Chinos", price: "₹1,999", image: "/assets/categorise/8.jpg", category: "PLUS SIZE", alt: "Stretchable comfort fit plus size trousers", isNew: false },
];

const filterCategories = ["ALL", "SHIRTS", "JEANS", "TROUSERS", "POLOS", "CARGOS", "PLUS SIZE"];

const NewAndPopular: React.FC = () => {

  const [selectedCategory, setSelectedCategory] = useState("ALL");

 
  const filteredProducts = selectedCategory === "ALL" 
    ? products 
    : products.filter(item => item.category === selectedCategory);

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
              ${selectedCategory === cat ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"}`}
          >
            {cat}
          </button>
        ))}
      </div>

  
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-3">
              <Image
                src={product.image}
                alt={`${product.name} - Premium Menswear BE-MAN`}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={product.id <= 2} 
              />
              
              <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
              
                <Heart size={18} className="text-gray-400 hover:text-[#FF0000] hover:fill-[#FF0000] transition-colors" />
              </button>
            </div>

            <div className="text-left space-y-1">
              <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-tight line-clamp-1">
                {product.name}
              </h3>
              <p className="text-[11px] font-bold text-gray-800">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

    
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 py-20">No products found in this category.</p>
      )}
    </section>
  );
};

export default NewAndPopular;