"use client";

import React from "react";
import { Upload, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    alert("Category saved successfully!");
    router.push("/bemen-staff-portal/categories"); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <Link 
          href="/bemen-staff-portal/categories" 
          className="p-2 hover:bg-gray-100 rounded-full transition-all"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
            Create New Category
          </h1>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
            BEMEN Staff Portal • Inventory Management
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded  overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side: Inputs */}
            <div className="space-y-6">
              {/* Category Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">
                  Category Name
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. OVERSHIRTS"
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-bold uppercase tracking-wider"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">
                  Detailed Description
                </label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Describe the category collection..."
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm font-medium resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Right Side: Image Upload */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">
                Category Thumbnail
              </label>
              <div className="relative group h-[300px]">
                <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center bg-gray-50 group-hover:bg-gray-100 group-hover:border-black transition-all duration-300">
                  <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={30} className="text-gray-400 group-hover:text-black" />
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center px-6">
                    Drag and drop <br /> or click to upload cover image
                  </p>
                  <p className="mt-2 text-[9px] text-gray-300 font-bold uppercase italic">
                    Max size: 5MB (JPG, PNG)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-gray-50" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-end pt-4">
            <Link 
              href="/bemen-staff-portal/categories"
              className="w-full sm:w-auto px-10 py-4 text-center text-gray-400 hover:text-black text-[11px] font-black uppercase tracking-[0.3em] transition-colors"
            >
              Cancel
            </Link>
            <button 
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-4 bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-gray-800 transition-all shadow-2xl hover:translate-y-[-2px] active:translate-y-[0px] cursor-pointer"
            >
              <Save size={18} />
              Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}