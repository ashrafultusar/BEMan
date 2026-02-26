"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { getCategories } from "@/lib/data/category";
import { useCart } from "@/context/CartContext"; 
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const router = useRouter();

  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    async function fetchNavbarCats() {
      const res = await getCategories();
      if (res.success) {
        setDynamicCategories(res.data);
      }
    }
    fetchNavbarCats();
  }, []);

  // Search Submit Function
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Direct shop page-e query niye jabe
      router.push(`/shop/all?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Search hoye gele input clear hobe
    }
  };

  return (
    <>
      {/* --- Main Navbar Section --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-16">
        <div className="mx-auto px-4 h-full flex items-center justify-between">
          
          {/* Left: Hamburger Menu */}
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

          {/* Right Icons & Search Bar */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-5">
            
            {/* --- Inline Search Bar --- */}
            <form 
              onSubmit={handleSearch}
              className="hidden md:flex items-center border border-gray-200 rounded px-3 py-1.5 focus-within:border-black transition-colors"
            >
              <button type="submit" className="text-gray-400 hover:text-black">
                <Search size={18} />
              </button>
              <input 
                type="text" 
                placeholder='Search "Premium"...' 
                className="ml-2 outline-none text-sm w-32 lg:w-48 bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Mobile Search Icon (Optional: can link to a simple input toggle) */}
            <div className="md:hidden">
               {/* Mobile-e jodi alada toggle na chao, tobe eikhane icon thakbe */}
               <Search size={22} className="text-gray-700" onClick={() => router.push('/shop/all')} />
            </div>
            
            <button className="p-2 text-gray-700 hover:text-black">
              <User size={22} />
            </button>

            {/* Shopping Bag */}
            <Link href={'/checkout'} className="p-2 text-gray-700 hover:text-black relative">
              <ShoppingBag size={22} />
              {totalItems >= 0 && (
                <span className={`absolute top-1 right-1 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full ${totalItems > 0 ? 'bg-red-600 animate-in zoom-in duration-300' : 'bg-gray-400'}`}>
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Sidebar Overlay --- */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100 " : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* --- Sidebar Menu --- */}
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
              <div>
                <Link href="/shop/all" onClick={() => setMobileOpen(false)} className="block text-sm font-black tracking-[0.2em] uppercase text-gray-400 mb-4 hover:text-black transition-colors">
                  Shop All
                </Link>
                <Link href="/bemen-staff-portal" onClick={() => setMobileOpen(false)} className="block text-sm font-black tracking-[0.2em] uppercase text-gray-400 mb-6 hover:text-black transition-colors">
                  Dashboard
                </Link>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-zinc-300 tracking-[0.3em] uppercase border-b pb-2">Collections</p>
                {dynamicCategories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/shop/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setMobileOpen(false)}
                    className="block text-2xl font-bold text-gray-900 hover:text-[#c5a47e] transition-colors lowercase first-letter:uppercase"
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