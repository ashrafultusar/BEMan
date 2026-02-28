"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // পাথ ডিটেক্ট করার জন্য
import { 
  Menu, X, Search, ShoppingBag, LogOut, 
  ChevronRight, LayoutDashboard, Store, 
  Mail, Instagram, Facebook 
} from "lucide-react";
import { getCategories } from "@/lib/data/category";
import { useCart } from "@/context/CartContext"; 
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dynamicCategories, setDynamicCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname(); // বর্তমান ইউআরএল পাথ

  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin"; 
  const isLoggedIn = status === "authenticated";

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

  // ফাংশন: চেক করবে লিঙ্কটি অ্যাক্টিভ কি না
  const isActive = (path: string) => pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop/all?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* --- Main Navbar Section --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 md:h-20">
        <div className="mx-auto px-4 h-full flex items-center justify-between">
          
          <div className="flex-1 flex items-center">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-all active:scale-95"
            >
              <Menu size={26} className="text-gray-900" />
            </button>
          </div>

          <div className="flex-shrink-0 flex justify-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-32 md:w-40 h-10 md:h-12">
                <Image 
                  src="/assets/logo.jpeg" 
                  alt="BEMEN Logo" 
                  fill 
                  priority 
                  className="object-contain" 
                />
              </div>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-end gap-2 md:gap-5">
            <form onSubmit={handleSearch} className="hidden md:flex items-center border border-gray-200 rounded-full px-4 py-1.5 focus-within:border-black transition-all">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder='Search...' 
                className="ml-2 outline-none text-sm w-32 lg:w-48 bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <Link href={'/checkout'} className={`p-2 relative transition-colors ${isActive('/checkout') ? 'text-black' : 'text-gray-700 hover:text-black'}`}>
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full bg-red-600">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Sidebar Overlay --- */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${mobileOpen ? "opacity-100 " : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* --- Sidebar Menu --- */}
      <div className={`fixed top-0 left-0 h-full w-full max-w-[340px] bg-white z-[110] shadow-2xl transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          
          <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
            <div className="relative w-28 h-10">
                <Image src="/assets/logo.jpeg" alt="BEMEN Logo" fill className="object-contain" />
            </div>
            <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-white rounded-full shadow-sm">
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-8">
              
              <div className="space-y-2">
                <Link 
                  href="/shop/all" 
                  onClick={() => setMobileOpen(false)} 
                  className={`flex items-center justify-between group p-3 rounded-xl transition-all ${isActive('/shop/all') ? 'bg-gray-900 text-white' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  <div className="flex items-center gap-3">
                    <Store size={20} className={isActive('/shop/all') ? 'text-white' : 'text-gray-400 group-hover:text-black'} />
                    <span className="text-sm font-bold tracking-widest uppercase">Shop All</span>
                  </div>
                  <ChevronRight size={16} className={`${isActive('/shop/all') ? 'text-white' : 'text-gray-300'} transition-transform group-hover:translate-x-1`} />
                </Link>

                {isAdmin && (
                  <Link 
                    href="/bemen-staff-portal" 
                    onClick={() => setMobileOpen(false)} 
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive('/bemen-staff-portal') ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    <LayoutDashboard size={20} />
                    <span className="text-sm font-bold tracking-widest uppercase">Dashboard</span>
                  </Link>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 px-3">
                    <span className="h-[1px] w-6 bg-gray-200"></span>
                    <p className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">Collections</p>
                </div>
                
                <div className="grid grid-cols-1 gap-1">
                  {dynamicCategories.map((cat) => {
                    const catPath = `/shop/${cat.name.toLowerCase().replace(/\s+/g, "-")}`;
                    const active = isActive(catPath);
                    
                    return (
                      <Link
                        key={cat._id}
                        href={catPath}
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center justify-between p-3 rounded-xl transition-all ${active ? 'bg-gray-50 border-l-4 border-black' : 'hover:bg-gray-50'}`}
                      >
                        <span className={`text-xl font-medium transition-colors capitalize ${active ? 'text-black font-bold' : 'text-gray-800 group-hover:text-[#c5a47e]'}`}>
                          {cat.name}
                        </span>
                        {active && <div className="w-2 h-2 rounded-full bg-black"></div>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>

          <div className="p-6 border-t bg-gray-50/80 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Support</p>
                <p className="text-xs font-semibold text-gray-700">info@bemen.com</p>
              </div>
              <div className="flex gap-3">
                <Instagram size={18} className="text-gray-400 hover:text-pink-600 cursor-pointer" />
                <Facebook size={18} className="text-gray-400 hover:text-blue-600 cursor-pointer" />
              </div>
            </div>

            {isLoggedIn && (
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-red-100 text-red-600 hover:bg-red-50 font-bold text-xs uppercase tracking-widest transition-all"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="h-16 md:h-20"></div>
    </>
  );
}