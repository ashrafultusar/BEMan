import { getProducts } from "@/lib/data/product";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import DeleteProductBtn from "@/components/admin/product/DeleteProductBtn";

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: "Inventory Management | BEMEN Staff Portal",
  description: "Manage your premium product inventory, track stock levels, and update pricing.",
  robots: { index: false, follow: false }, 
};

export default async function ProductsPage() {
  const result = await getProducts();
  const products = result.success ? result.data : [];

  return (
    <div className="p-6">
      {/* Header Section - Semantic use of <header> */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Products</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            Total Inventory: {products.length} Items
          </p>
        </div>
        <Link 
          href="/bemen-staff-portal/add-product" 
          className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded shadow hover:bg-black flex items-center gap-2 text-sm font-bold tracking-tight transition-transform active:scale-95"
        >
          <Plus size={18} /> Add Product
        </Link>
      </header>

      {/* Table Container */}
      <div className="border border-gray-100 rounded-sm shadow-sm overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">Product</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">Category</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 text-center">Price</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 text-center">Stock</th>
              <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  No products found in database.
                </td>
              </tr>
            ) : (
              products.map((p: any) => (
                <tr key={p._id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0 border border-gray-50">
                        {p.images && p.images[0] ? (
                          <Image 
                            src={p.images[0]} 
                            alt={`${p.name} - BEMEN Product Image`} // SEO optimized Alt Text
                            fill 
                            className="object-cover" 
                            sizes="40px" // Exact size for browser optimization
                            priority={false}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-300">
                            NO IMG
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-bold text-gray-800 tracking-tight">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-tighter">
                    {p.category}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-center">
                    ৳ {p.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${
                      p.stock > 0 ? "bg-orange-50 text-orange-600/80" : "bg-red-50 text-red-600"
                    }`}>
                      {p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 ">
                    <Link 
      href={`/bemen-staff-portal/edit-product/${p._id}`}
      title="Edit Product"
      className="text-gray-400 cursor-pointer hover:text-black transition-colors"
    >
      <Pencil size={18} />
    </Link>
    <DeleteProductBtn id={p._id.toString()} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}