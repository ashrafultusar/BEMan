"use client";

import React, { useState } from "react";
import { Upload, Save, ArrowLeft, X, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // ইমেজ প্রিভিউ হ্যান্ডলার
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-[#fcfcfc] min-h-screen">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 hover:bg-gray-100 rounded-full transition-all border border-gray-100 bg-white shadow-sm"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-black uppercase tracking-tight text-gray-900">
              New Product
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Add inventory to BEMEN Store
            </p>
          </div>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: General Info & Images */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">General Information</h2>
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-900 uppercase">Product Name</label>
              <input 
                type="text" 
                placeholder="e.g. Vintage Wash Oversized Tee"
                className="w-full px-4 py-3 rounded-none border-b border-gray-200 focus:border-black outline-none transition-all text-sm font-medium bg-gray-50/30"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-900 uppercase">Description</label>
              <textarea 
                rows={6}
                placeholder="Write about product material, fit and style..."
                className="w-full px-4 py-3 rounded-none border border-gray-100 focus:border-black outline-none transition-all text-sm font-medium bg-gray-50/30 resize-none"
              />
            </div>
          </div>

          {/* Section 2: Media Upload */}
          <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">Product Media</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Preview Cards */}
              {selectedImages.map((src, index) => (
                <div key={index} className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden group">
                  <img src={src} alt="preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {/* Upload Button */}
              <label className="aspect-[3/4] border-2 border-dashed border-gray-100 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-black transition-all">
                <Plus size={24} className="text-gray-300" />
                <span className="text-[9px] font-black uppercase text-gray-400 mt-2">Upload</span>
                <input type="file" multiple className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Category */}
        <div className="space-y-8">
          
          {/* Section 3: Status & Category */}
          <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">Organization</h2>
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-900 uppercase">Category</label>
              <select className="w-full px-4 py-3 border-b border-gray-200 outline-none text-sm font-bold bg-transparent">
                <option>T-SHIRTS</option>
                <option>SHIRTS</option>
                <option>PANTS</option>
                <option>JACKETS</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-900 uppercase">Inventory Stock</label>
              <input 
                type="number" 
                placeholder="0"
                className="w-full px-4 py-3 border-b border-gray-200 outline-none text-sm font-bold"
              />
            </div>
          </div>

          {/* Section 4: Pricing */}
          <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">Pricing</h2>
            
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-900 uppercase">Regular Price (৳)</label>
              <input 
                type="text" 
                placeholder="৳ 0.00"
                className="w-full px-4 py-3 border-b border-gray-200 outline-none text-lg font-black text-gray-900"
              />
            </div>

            <div className="space-y-2 pt-2 text-[10px] text-gray-400 font-medium italic">
              * This price will be shown to customers on the website.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              type="submit"
              className="w-full py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
            >
              <Save size={18} />
              Publish Product
            </button>
            <button 
              type="button"
              className="w-full py-4 bg-white border border-gray-100 text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] hover:text-black transition-all"
            >
              Save Draft
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}