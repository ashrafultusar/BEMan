"use client";

import React, { useState, useTransition } from "react";
import { Upload, Save, Loader2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSlider } from "@/app/actions/sliderAction";
import toast from "react-hot-toast";

const AddSliderForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [preview, setPreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const clientAction = async (formData: FormData) => {
        if (!imageFile) {
            toast.error("Please upload a slider banner image");
            return;
        }

        const toastId = toast.loading("Creating slider...");

        // FormData-te image append kora
        formData.append("image", imageFile);

        startTransition(async () => {
            const result = await createSlider(formData);
            if (result.success) {
                toast.success(result.message, { id: toastId });
                router.push("/bemen-staff-portal/sliders");
            } else {
                toast.error(result.message, { id: toastId });
            }
        });
    };

    return (
        <form action={clientAction} className="p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">
                            CTA Link / Button Url
                        </label>
                        <input
                            name="ctaLink"
                            type="text"
                            required
                            placeholder="/shop/summer-collection"
                            className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-black outline-none transition-all text-sm font-bold lowercase"
                        />
                    </div>
                </div>

                {/* Image Upload Box */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">
                        Slider Banner Image (1080x1350)
                    </label>
                    <div className="relative h-[400px]">
                        {preview ? (
                            <div className="relative h-full w-full rounded-3xl overflow-hidden border border-gray-100">
                                <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreview(null);
                                        setImageFile(null);
                                    }}
                                    className="absolute top-4 right-4 p-2 bg-black text-white rounded-full hover:scale-110 transition-transform"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="h-full border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center bg-gray-50 hover:border-black transition-all group">
                                    <Upload size={30} className="text-gray-400 group-hover:text-black transition-colors" />
                                    <p className="text-[10px] font-black text-gray-400 uppercase mt-4">
                                        Upload Banner Image
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Link
                    href="/bemen-staff-portal/sliders"
                    className="px-10 py-4 text-gray-400 text-[11px] font-black uppercase tracking-[0.3em] hover:text-black transition-colors"
                >
                    Cancel
                </Link>
                <button
                    disabled={isPending}
                    type="submit"
                    className="flex items-center gap-3 px-12 py-4 bg-black text-white cursor-pointer rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] disabled:bg-gray-400 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                >
                    {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {isPending ? "Saving..." : "Save Slider"}
                </button>
            </div>
        </form>
    );
};

export default AddSliderForm;
