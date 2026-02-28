"use client";

import { useState, useMemo } from "react";
import { Plus, Pencil, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteProductBtn from "@/components/admin/product/DeleteProductBtn";

export default function ProductListClient({ products }: { products: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Ekhane tumi koyti product ekshathe dekhate chao ta set koro

  // Unique categories list
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["All", ...Array.from(new Set(cats))];
  }, [products]);

  // Main filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, products]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className=" max-w-7xl mx-auto">
      {/* Header & Stats */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Inventory</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            Total: {products.length} | Found: {filteredProducts.length}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
          {/* Search */}
          <div className="relative flex-grow sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search product..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-black"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Search korle page 1 e niye jabe
              }}
            />
          </div>

          {/* Category Filter */}
          <div className="relative sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <select
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-100 rounded appearance-none bg-white cursor-pointer font-medium"
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <Link
            href="/bemen-staff-portal/add-product"
            className="bg-[#1a1a1a] text-white px-5 py-2 rounded hover:bg-black flex items-center justify-center gap-2 text-sm font-bold transition-transform active:scale-95"
          >
            <Plus size={18} /> Add Product
          </Link>
        </div>
      </header>

      {/* Table Container */}
      <div className="border border-gray-100 rounded-sm shadow-sm bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-400 tracking-widest">Product</th>
                <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-400">Category</th>
                <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-400 text-center">Price</th>
                <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-400 text-center">Stock</th>
                <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentItems.length > 0 ? (
                currentItems.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 bg-gray-50 rounded border border-gray-100 overflow-hidden flex-shrink-0">
                          {p.images?.[0] ? (
                            <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-300 font-bold">NO IMG</div>
                          )}
                        </div>
                        <span className="text-sm font-bold text-gray-800 line-clamp-1">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">{p.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 text-center">৳{p.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${p.stock > 0 ? "bg-orange-50 text-orange-600/80" : "bg-red-50 text-red-600"}`}>
                        {p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <Link href={`/bemen-staff-portal/edit-product/${p._id}`} className="text-gray-400 hover:text-black transition-colors">
                          <Pencil size={18} />
                        </Link>
                        <DeleteProductBtn id={p._id.toString()} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    No matching products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-gray-200 rounded disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-200 rounded disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}