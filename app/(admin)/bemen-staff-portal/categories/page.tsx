"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Layers, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  image?: string;
}

const initialCategories: Category[] = [
  { id: "1", name: "T-shirts", description: "Premium cotton tees", productCount: 7, image: "/assets/categorise/1.jpg" },
  { id: "2", name: "Shirts", description: "Formal & casual shirts", productCount: 6, image: "/assets/categorise/1.jpg" },
  { id: "3", name: "Pants", description: "Formal & casual pants", productCount: 6, image: "/assets/categorise/3.jpg" },
  { id: "4", name: "Accessories", description: "Belts, Wallets & more", productCount: 5, image: "/assets/categorise/4.jpg" },
  { id: "5", name: "Jeans", description: "Denim & slim fit jeans", productCount: 4, image: "/assets/categorise/4.jpg" },
  { id: "6", name: "Jackets", description: "Winter & leather jackets", productCount: 3, image: "/assets/categorise/5.jpg" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900">Categories</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            {categories.length} Total Collections found
          </p>
        </div>

        <Link 
          href='/bemen-staff-portal/add-category' 
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          <Plus size={16} />
          Add Category
        </Link>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
          >
            
            <div className="p-5 flex gap-4 items-start justify-between min-h-[140px]">
              
              {/* Left Side: Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                    ID: {category.id}
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-xs text-gray-400 font-medium line-clamp-2 leading-relaxed">
                  {category.description}
                </p>

                <div className="pt-2 flex items-center gap-2">
                   <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                      <Layers size={12} className="text-gray-400" />
                      <span className="text-[10px] font-bold text-gray-600">{category.productCount} Products</span>
                   </div>
                </div>
              </div>

              {/* Right Side: Image Thumbnail */}
              <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-50 shadow-inner">
                {category.image ? (
                <Image
                src={category.image}
                alt={category.name}
                fill
                unoptimized 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={24} className="text-gray-200" />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom: Action Buttons */}
            <div className="bg-gray-50/50 px-5 py-3 flex justify-between items-center border-t border-gray-50">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                Actions
              </span>
              <div className="flex gap-4">
                <button className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors text-[10px] font-black uppercase tracking-widest group/btn">
                  <Pencil size={14} className="group-hover/btn:scale-110 transition-transform" />
                  Edit
                </button>
                <button className="flex items-center gap-1 text-gray-400 hover:text-red-600 transition-colors text-[10px] font-black uppercase tracking-widest group/btn">
                  <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}