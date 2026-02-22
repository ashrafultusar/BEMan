"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { getCategories } from "@/lib/data/category";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchNavbarCats() {
      const res = await getCategories();
      if (res.success) {
        setDynamicCategories(res.data);
      }
    }
    fetchNavbarCats();
  }, []);

  return (
    <>
      {/* --- Main Navbar Section --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-16">
        <div className="mx-auto px-4 h-full flex items-center justify-between">
          
          {/* Hamburger Menu */}
          <div className="flex-1 flex items-center">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Menu size={24} className="cursor-pointer text-gray-800" />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-7">
                <Image src="/assets/logo.jpg" alt="BEMEN Logo" fill priority sizes="40px" className="object-cover" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-black uppercase font-serif">BEMEN</span>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-5">
            <div className="hidden md:flex items-center border border-gray-200 rounded px-3 py-1.5">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder='Search "Resort"' className="ml-2 outline-none text-sm w-32 lg:w-48" />
            </div>
            <button className="p-2 text-gray-700 hover:text-black"><User size={22} /></button>
            <Link href={'/checkout'} className="p-2 text-gray-700 hover:text-black relative">
              <ShoppingBag size={22} />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Sidebar Overlay --- */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100 " : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* --- Sidebar Menu (Left Side) --- */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-white z-[110] shadow-2xl transition-transform duration-500 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b flex justify-between items-center">
            <span className="font-bold text-black text-lg tracking-widest">MENU</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 hover:rotate-90 transition-transform duration-300">
              <X size={24} className="cursor-pointer text-gray-600" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-6">
            <div className="space-y-6">
              {/* Static Links First */}
              <div>
                <Link href="/shop/all" onClick={() => setMobileOpen(false)} className="block text-sm font-black tracking-[0.2em] uppercase text-gray-400 mb-4">
                  Shop All
                </Link>
                <Link href="/bemen-staff-portal" onClick={() => setMobileOpen(false)} className="block text-sm font-black tracking-[0.2em] uppercase text-gray-400 mb-6">
                  Dashboard
                </Link>
              </div>

              {/* Dynamic Categories */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-zinc-300 tracking-[0.3em] uppercase border-b pb-2">Collections</p>
                {dynamicCategories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/shop/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setMobileOpen(false)}
                    className="block text-2xl font-bold text-gray-900 hover:text-zinc-500 transition-colors lowercase first-letter:uppercase"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="p-6 border-t bg-zinc-50 space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Support</p>
            <p className="text-xs font-medium text-gray-600">info@bemen.com</p>
            <p className="text-xs font-medium text-gray-600">+880 1234 567890</p>
          </div>
        </div>
      </div>

      <div className="h-16"></div>
    </>
  );
}