import { getProducts } from "@/lib/data/product";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage() {
  const result = await getProducts();
  const products = result.success ? result.data : [];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Products</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            Total Inventory: {products.length} Items
          </p>
        </div>
        <Link href="/bemen-staff-portal/add-product" className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded shadow hover:bg-black flex items-center gap-2 text-sm font-bold tracking-tight">
          <Plus size={18} /> Add Product
        </Link>
      </div>

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
            {products.map((p: any) => (
              <tr key={p._id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {p.images && p.images[0] ? (
                        <Image 
                          src={p.images[0]} 
                          alt={p.name} 
                          fill 
                          className="object-cover" 
                          sizes="40px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[8px]">NO IMG</div>
                      )}
                    </div>
                    <span className="text-sm font-bold text-gray-800 tracking-tight">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-medium text-gray-500 uppercase">{p.category}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900 text-center">৳ {p.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  {/* Stock Logic: 0 hole Out of Stock, otherwise In Stock */}
                  <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${
                    p.stock > 0 ? "bg-orange-50 text-orange-600/80" : "bg-red-50 text-red-600"
                  }`}>
                    {p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button className="text-gray-400 hover:text-black transition-colors"><Pencil size={18} /></button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}