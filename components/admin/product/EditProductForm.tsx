"use client";

import React, { useState, useTransition } from "react";
import { Save, X, Plus, Loader2, Ruler, Shirt, Wind, Hash } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/app/actions/productAction";
import toast from "react-hot-toast";

const EditProductForm = ({
  product,
  categories,
}: {
  product: any;
  categories: any[];
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [existingImages, setExistingImages] = useState<string[]>(
    product.images || []
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...files]);
      const previews = files.map((file) => URL.createObjectURL(file));
      setNewPreviews((prev) => [...prev, ...previews]);
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const clientAction = async (formData: FormData) => {
    if (existingImages.length === 0 && selectedImages.length === 0) {
      toast.error("Please provide at least one image.");
      return;
    }

    formData.append("existingImages", JSON.stringify(existingImages));
    selectedImages.forEach((file) => formData.append("images", file));

    startTransition(async () => {
      const result = await updateProduct(product._id, formData);
      if (result.success) {
        toast.success(result.message);
        router.push("/bemen-staff-portal/products");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <form
      action={clientAction}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">
            General Information
          </h2>

          {/* Product ID Field */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase flex items-center gap-2">
              <Hash size={12} className="text-blue-600" /> Product ID / SKU
            </label>
            <input
              name="productId"
              type="text"
              defaultValue={product.productId}
              required
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-black outline-none text-sm font-bold bg-gray-50/30 transition-all uppercase"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              defaultValue={product.name}
              required
              className="w-full px-4 py-3 border-b border-gray-200 focus:border-black outline-none text-sm font-medium bg-gray-50/30 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={product.description}
              rows={4}
              required
              className="w-full px-4 py-3 border border-gray-100 focus:border-black outline-none text-sm font-medium bg-gray-50/30 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-900 uppercase flex items-center gap-2">
                <Shirt size={12} /> Material
              </label>
              <input
                name="material"
                type="text"
                defaultValue={product.material}
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-black outline-none text-sm bg-gray-50/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-900 uppercase flex items-center gap-2">
                <Wind size={12} /> Care
              </label>
              <input
                name="care"
                type="text"
                defaultValue={product.care}
                className="w-full px-4 py-3 border-b border-gray-200 focus:border-black outline-none text-sm bg-gray-50/10"
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">
            Product Media
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((src, index) => (
              <div
                key={`old-${index}`}
                className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden group"
              >
                <img
                  src={src}
                  alt="existing"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-1 text-[8px] text-white text-center font-bold uppercase">
                  Stored
                </div>
              </div>
            ))}
            {newPreviews.map((src, index) => (
              <div
                key={`new-${index}`}
                className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden group"
              >
                <img
                  src={src}
                  alt="new-preview"
                  className="w-full h-full object-cover border-2 border-black"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-2 right-2 p-1 bg-black text-white rounded-full"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <label className="aspect-[3/4] border-2 border-dashed border-gray-100 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-black transition-all text-gray-300 hover:text-black">
              <Plus size={24} />
              <span className="text-[9px] font-bold uppercase mt-2">New</span>
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

      <div className="space-y-8">
        <div className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b pb-4">
            Organization & Size
          </h2>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase">
              Category
            </label>
            <select
              name="category"
              defaultValue={product.category}
              required
              className="w-full px-4 py-3 border-b border-gray-200 outline-none text-sm font-bold bg-transparent uppercase"
            >
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase flex items-center gap-2">
              <Ruler size={12} /> Sizes
            </label>
            <input
              name="sizes"
              type="text"
              defaultValue={product.sizes.join(", ")}
              className="w-full px-4 py-3 border-b border-gray-100 outline-none text-sm font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-900 uppercase">
              Stock
            </label>
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
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-900 uppercase">
                Price (৳)
              </label>
              <input
                name="price"
                type="number"
                defaultValue={product.price}
                required
                className="w-full px-4 py-3 border-b border-gray-200 outline-none text-lg font-black text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#c5a47e] uppercase">
                Discount (৳)
              </label>
              <input
                name="discountPrice"
                type="number"
                defaultValue={product.discountPrice || ""}
                className="w-full px-4 py-3 border-b border-gray-200 outline-none text-lg font-black text-[#c5a47e]"
              />
            </div>
          </div>
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="w-full py-4 bg-black text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          {isPending ? "Updating..." : "Update Product"}
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
