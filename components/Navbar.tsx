"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";


const NAVIGATION_LINKS = [
  { name: "DASHBOARD", href: "/bemen-staff-portal" },
  { name: "SHOP ALL", href: "/shop/all" },
  { name: "Shirts", href: "/shop/shirts" },
  { name: "Jeans", href: "/shop/jeans" },
  { name: "Trousers", href: "/shop/trousers" },
  { name: "Polos", href: "/shop/polos" },
  { name: "Cargos", href: "/shop/cargos" },
  { name: "Plus Size", href: "/shop/plus-size" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* --- Main Navbar Section --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-16">
        <div className=" mx-auto px-4 h-full flex items-center justify-between">
          
          {/* 1. Left: Hamburger Menu */}
          <div className="flex-1 flex items-center">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Menu size={24} className="text-gray-800 cursor-pointer" />
            </button>
          </div>

          {/* 2. Center: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-7">
              <Image
  src="/assets/logo.jpg"
  alt="BEMEN Logo"
  fill
  priority 
  sizes="40px" 
/>
              </div>
              <span className="text-xl font-bold tracking-tighter text-black uppercase font-serif">
                BEMEN
              </span>
            </Link>
          </div>

          {/* 3. Right: Utility Icons (Search, User, Cart) */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-5">
            <div className="hidden md:flex items-center border border-gray-200 rounded px-3 py-1.5">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder='Search "Resort"' 
                className="ml-2 outline-none text-sm w-32 lg:w-48"
              />
            </div>
            <button className="p-2 text-gray-700 hover:text-black">
              <User size={22} />
            </button>
            <button className="p-2 text-gray-700 hover:text-black relative">
              <ShoppingBag size={22} />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- Sidebar Overlay --- */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* --- Sidebar Menu (Left Side) --- */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white z-[110] shadow-2xl transition-transform duration-500 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-5 border-b flex justify-between items-center">
            <span className="font-bold text-black text-lg">MENU</span>
            <button onClick={() => setMobileOpen(false)} className="p-2">
              <X size={24} className="text-gray-600 cursor-pointer" />
            </button>
          </div>

          {/* Sidebar Links/Categories */}
          <nav className="flex-1 overflow-y-auto py-6 px-5 space-y-4">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-xl font-medium text-gray-900 hover:text-[#D4AF37] transition-colors border-b border-gray-50 pb-2"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-5 border-t bg-gray-50 text-sm text-gray-500">
            <p>Email: info@ezan.com</p>
            <p>Support: +888045425560</p>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}