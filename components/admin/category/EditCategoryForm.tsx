"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateCategory } from "@/app/actions/categoryAction"; 
import { toast } from "react-hot-toast";
import { Loader2, Camera, Save, Info } from "lucide-react";
import Image from "next/image";

interface CategoryProps {
    category: {
        _id: string;
        name: string;
        description: string;
        image?: string;
    };
}

export default function EditCategoryForm({ category }: CategoryProps) {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(category.image || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setLoading(true);

        try {
            const res = await updateCategory(category._id, formData);
            if (res.success) {
                toast.success("Category updated successfully!");
                router.push("/bemen-staff-portal/categories");
                router.refresh();
            } else {
                toast.error(res.message || "Failed to update category");
                setLoading(false);
            }
        } catch (error) {
            toast.error("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Preview Area */}
            <div 
                onClick={() => !loading && fileInputRef.current?.click()}
                className="relative border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer group overflow-hidden h-[240px] flex items-center justify-center border-gray-200 bg-gray-50/30 hover:bg-gray-50 hover:border-black"
            >
                <input
                    type="file"
                    name="image"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                />
                
                {preview ? (
                    <div className="relative h-full w-full">
                        <Image src={preview} alt="Preview" fill className="object-cover rounded-xl" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera className="text-white" size={32} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <Camera className="text-gray-400 mx-auto mb-2" size={32} />
                        <p className="text-xs font-bold text-gray-500 uppercase">Click to upload</p>
                    </div>
                )}
            </div>

            {/* Inputs */}
            <div className="grid gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Category Name</label>
                    <input
                        name="name"
                        type="text"
                        required
                        defaultValue={category.name}
                        className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black outline-none transition text-sm font-bold uppercase"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                        <Info size={12} /> Description
                    </label>
                    <textarea
                        name="description"
                        rows={4}
                        required
                        defaultValue={category.description}
                        className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black outline-none transition text-sm font-medium resize-none"
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-50">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="text-xs cursor-pointer font-black uppercase text-gray-400 hover:text-black transition"
                >
                    Discard
                </button>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition font-black text-[11px] uppercase tracking-widest min-w-[150px] cursor-pointer justify-center"
                >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    {loading ? "Updating..." : "Update Category"}
                </button>
            </div>
        </form>
    );
}