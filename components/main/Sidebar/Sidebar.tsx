"use client";

import React, { useState } from "react";
import Link from "next/link";

interface SidebarProps {
  activeCategory: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: "ALL", href: "all" },
    { name: "SHIRTS", href: "shirts" },
    { name: "TROUSERS", href: "trousers" },
    { name: "JEANS", href: "jeans" },
    { name: "POLOS", href: "polos" },
    { name: "CARGOS", href: "cargos" },
    { name: "PLUS SIZE", href: "plus-size" },
  ];

  const CategoryList = () => (
    <>
      <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-8 border-b pb-4 text-black">
        Browse by Category
      </h3>

      <ul className="space-y-4">
        {categories.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.href;
          return (
            <li key={cat.href}>
              <Link
                href={`/shop/${cat.href}`}
                onClick={() => setIsOpen(false)} 
                className={`group flex items-center justify-between text-[11px] font-bold uppercase tracking-widest transition-all duration-300
                  ${isActive ? "text-black translate-x-1" : "text-gray-400 hover:text-black hover:translate-x-1"}`}
              >
                <div className="flex items-center gap-2">
                  {isActive && <span className="w-1.5 h-1.5 bg-black rounded-full" />}
                  <span>{cat.name}</span>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px]">→</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );

  return (
    <div className="w-full">
      {/* Desktop Sidebar: hidden on mobile/tablet */}
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

      {/* Mobile/Tablet View: Bottom Sheet Trigger */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full py-3 border border-black text-[11px] font-bold tracking-widest uppercase flex justify-between items-center px-4"
        >
          Category: {activeCategory || "All"}
          <span>+</span>
        </button>

        {/* Backdrop overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-[998] transition-opacity"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Bottom Sheet Drawer */}
        <div className={`fixed left-0 right-0 bottom-0 bg-white z-[999] transition-transform duration-300 ease-in-out transform p-6 rounded-t-2xl shadow-2xl ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
          {/* Handle bar for visual cue */}
          <div className="w-12 h-1 bg-gray-300 mx-auto mb-6 rounded-full" />
          
          <CategoryList />
          
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full mt-8 py-4 bg-black text-white text-[11px] font-bold tracking-widest uppercase"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;