"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/data/category";

interface SidebarProps {
  activeCategory: string; 
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCats() {
      const res = await getCategories();
      if (res.success) {
        setCategories([{ name: "ALL", _id: "all" }, ...res.data]);
      }
    }
    fetchCats();
  }, []);

  const CategoryList = () => (
    <>
      <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-8 border-b pb-4 text-black">
        Browse by Category
      </h3>

      <ul className="space-y-4">
        {categories.map((cat) => {
          // স্লাগ তৈরি করা (ডাটাবেস নামের সাথে ম্যাচ করার জন্য)
          const catHref = cat.name.toLowerCase().replace(/\s+/g, "-");
          const isActive = 
            (activeCategory === "all" && cat.name === "ALL") || 
            activeCategory.toLowerCase() === catHref;

          return (
            <li key={cat._id}>
              <Link
                href={cat.name === "ALL" ? "/shop/all" : `/shop/${catHref}`}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between text-[11px] font-bold uppercase tracking-widest transition-all duration-300
                  ${isActive ? "text-black translate-x-1" : "text-gray-400 hover:text-black hover:translate-x-1"}`}
              >
                <div className="flex items-center gap-2">
                  {/* Active Indicator Dot */}
                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? "bg-black scale-100" : "bg-transparent scale-0"}`} />
                  <span>{cat.name}</span>
                </div>
                <span className={`transition-opacity text-[8px] ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );

  return (
    <div className="w-full">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <CategoryList />
        <div className="mt-16 pt-8 border-t border-gray-100">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-6 text-black">Customer Service</h3>
          <ul className="space-y-3">
            <li><Link href="/shipping" className="text-[10px] font-bold text-gray-400 hover:text-black uppercase">Shipping Policy</Link></li>
            <li><Link href="/returns" className="text-[10px] font-bold text-gray-400 hover:text-black uppercase">Easy Returns</Link></li>
          </ul>
        </div>
      </div>

      {/* Mobile/Tablet View */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full py-3 border border-black text-[11px] font-bold tracking-widest uppercase flex justify-between items-center px-4 bg-white"
        >
          Category: <span className="text-black">{activeCategory.replace(/-/g, " ") || "All"}</span>
          <span className="text-lg">+</span>
        </button>

        {/* Drawer & Overlay */}
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-[998]" onClick={() => setIsOpen(false)} />
            <div className={`fixed left-0 right-0 bottom-0 bg-white z-[999] transition-transform duration-300 p-6 rounded-t-2xl shadow-2xl ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
              <div className="w-12 h-1 bg-gray-300 mx-auto mb-6 rounded-full" />
              <CategoryList />
              <button onClick={() => setIsOpen(false)} className="w-full mt-8 py-4 bg-black text-white text-[11px] font-bold tracking-widest uppercase">
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;