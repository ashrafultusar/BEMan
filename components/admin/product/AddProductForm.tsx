"use client";

import React, { useState, useTransition } from "react";
import { Save, X, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/actions/productAction";
import toast from "react-hot-toast";

const AddProductForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Image Handling for Preview & State
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...files]);

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Submit Handler
  const clientAction = async (formData: FormData) => {
    // Manually images add kora
    formData.delete("images");
    if (selectedImages.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    startTransition(async () => {
      const result = await createProduct(null, formData);
      if (result.success) {
        toast.success("Product successfully added to BEMEN inventory!");
        router.push("/bemen-staff-portal/products");
      } else {
        toast.error("Failed to save product.");
      }
    });
  };

  return (
    <form action={clientAction} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* General Info */}
        <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">
            General Information
          </h2>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase">Product Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="e.g. Vintage Wash Oversized Tee"
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-black outline-none text-sm font-medium bg-gray-50/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase">Description</label>
            <textarea
              name="description"
              rows={6}
              placeholder="Product details..."
              className="w-full px-4 py-3 border border-gray-100 focus:border-black outline-none text-sm font-medium bg-gray-50/30 resize-none"
            />
          </div>
        </div>

        {/* Media Upload */}
        <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">
            Product Media
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previews.map((src, index) => (
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
            <label className="aspect-[3/4] border-2 border-dashed border-gray-100 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-black transition-all">
              <Plus size={24} className="text-gray-300" />
              <span className="text-[9px] font-black uppercase text-gray-400 mt-2">Upload</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Sidebar: Category & Pricing */}
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">
            Organization
          </h2>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase">Category</label>
            <select
              name="category"
              className="w-full px-4 py-3 border-b border-gray-200 outline-none text-sm font-bold bg-transparent"
            >
              <option value="T-SHIRTS">T-SHIRTS</option>
              <option value="SHIRTS">SHIRTS</option>
              <option value="PANTS">PANTS</option>
              <option value="JEANS">JEANS</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase">Inventory Stock</label>
            <input
              name="stock"
              type="number"
              required
              placeholder="0"
              className="w-full px-4 py-3 border-b border-gray-100 outline-none text-sm font-bold"
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">
            Pricing
          </h2>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase">Regular Price (৳)</label>
            <input
              name="price"
              type="number"
              placeholder="৳ 0.00"
              className="w-full px-4 py-3 border-b border-gray-200 outline-none text-lg font-black text-gray-900"
              required
            />
          </div>
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="w-full py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400"
        >
          {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {isPending ? "Publishing..." : "Publish Product"}
        </button>
      </div>
    </form>
  );
};

export default AddProductForm;