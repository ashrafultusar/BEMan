"use client";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  Menu, 
  X, 
  Truck,
  Layers
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// BEMEN Admin Menu Items
const mainMenuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Orders", icon: Truck, href: "/admin/orders" },
  { name: "Products", icon: ShoppingBag, href: "/admin/products" },
  { name: "Categories", icon: Layers, href: "/admin/categories" },
  { name: "Customers", icon: Users, href: "/admin/customers" },
  { name: "Media Gallery", icon: ImageIcon, href: "/admin/gallery" },
  { name: "Site Settings", icon: Settings, href: "/admin/settings" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0f172a] text-white">
        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image
              src="/assets/logo.jpg"
              alt="BEMEN Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm font-bold tracking-widest uppercase italic">BEMEN</span>
        </div>
        <button
          className="p-2 bg-white/10 rounded-lg"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          bg-[#0f172a] text-gray-400
          transition-all duration-300 border-r border-white/5
          ${isOpen ? "w-72" : "w-20"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="flex flex-col h-full">
          {/* ===== BRAND LOGO ===== */}
          <div className="relative flex items-center gap-3 px-5 py-8">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/assets/logo.jpg"
                alt="BEMEN Logo"
                fill
                className="object-contain invert" 
              />
            </div>

            <div
              className={`${
                !isOpen && "lg:hidden opacity-0"
              } transition-opacity duration-200 overflow-hidden`}
            >
              <h1 className="text-xl font-black text-white leading-none tracking-tighter italic">
                BEMEN
              </h1>
              <p className="text-[10px] text-blue-400 mt-1 uppercase tracking-[3px] font-bold">
                Control Center
              </p>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:flex absolute -right-3 top-10
                bg-white text-black shadow-xl
                rounded-full p-1 hover:scale-110 transition-transform cursor-pointer border border-gray-200"
            >
              {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>

          {/* ===== NAVIGATION ===== */}
          <div className="flex-1 overflow-y-auto px-4">
            <p
              className={`text-[10px] uppercase tracking-[3px] text-gray-500 mb-6 mt-2 px-2 font-black ${
                !isOpen && "lg:hidden"
              }`}
            >
              Management
            </p>

            <nav className="space-y-2">
              {mainMenuItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    onClick={() => setIsMobileOpen(false)}
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center gap-4
                      px-3 py-3
                      text-[13px] font-bold uppercase tracking-widest
                      rounded-xl
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-white text-black shadow-lg shadow-white/5"
                          : "hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <item.icon
                      size={20}
                      className={`shrink-0 ${
                        isActive ? "text-black" : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`${
                        !isOpen && "lg:hidden opacity-0"
                      } whitespace-nowrap`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ===== FOOTER / PROFILE ===== */}
          <div className="p-4 border-t border-white/5">
             <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-red-500/10 group transition-colors">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500">
                    <X size={18} />
                </div>
                <span className={`text-xs font-bold text-red-500 uppercase tracking-widest ${!isOpen && 'lg:hidden'}`}>
                    Sign Out
                </span>
             </button>
          </div>
        </div>
      </aside>

      {/* ===== MOBILE OVERLAY ===== */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-md"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}