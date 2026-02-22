"use client";

import React, { useState, useTransition, useEffect } from "react";
import { Save, X, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/app/actions/productAction"; // Ensure you have this action
import toast from "react-hot-toast";

const EditProductForm = ({ product }: { product: any }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // Existing images (URLs from DB) and new selected files
  const [existingImages, setExistingImages] = useState<string[]>(product.images || []);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  // Handle New Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...files]);

      const previews = files.map((file) => URL.createObjectURL(file));
      setNewPreviews((prev) => [...prev, ...previews]);
    }
  };

  // Remove existing image (from DB list)
  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove newly selected image
  const removeNewImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clientAction = async (formData: FormData) => {
    // Validation: Total images check (existing + new)
    if (existingImages.length === 0 && selectedImages.length === 0) {
      toast.error("Please provide at least one image.");
      return;
    }

    // Append existing images as a JSON string or separate fields
    formData.append("existingImages", JSON.stringify(existingImages));

    // Append new files
    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    startTransition(async () => {
      const result = await updateProduct(product._id, formData);
      if (result.success) {
        toast.success("Product successfully updated!");
        router.push("/bemen-staff-portal/products");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update product.");
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
              defaultValue={product.name}
              required
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-black outline-none text-sm font-medium bg-gray-50/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase">Description</label>
            <textarea
              name="description"
              defaultValue={product.description}
              rows={6}
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
            {/* Existing Images from DB */}
            {existingImages.map((src, index) => (
              <div key={`old-${index}`} className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden group">
                <img src={src} alt="existing" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-1 text-[8px] text-white text-center font-bold">SAVED</div>
              </div>
            ))}

            {/* New Previews */}
            {newPreviews.map((src, index) => (
              <div key={`new-${index}`} className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden group">
                <img src={src} alt="new-preview" className="w-full h-full object-cover border-2 border-black" />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-2 right-2 p-1 bg-black text-white rounded-full opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            <label className="aspect-[3/4] border-2 border-dashed border-gray-100 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-black transition-all">
              <Plus size={24} className="text-gray-300" />
              <span className="text-[9px] font-black uppercase text-gray-400 mt-2">Add New</span>
              <input type="file" multiple className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">
            Organization
          </h2>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase">Category</label>
            <select
              name="category"
              defaultValue={product.category}
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
              defaultValue={product.stock}
              required
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
              defaultValue={product.price}
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
          {isPending ? "Updating..." : "Update Product"}
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;