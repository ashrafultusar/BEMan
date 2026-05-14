import { Plus, Pencil, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSliders } from "@/lib/data/slider";
import { Metadata } from "next";
import DeleteSliderBtn from "@/components/admin/slider/DeleteSliderBtn";

export const metadata: Metadata = {
    title: "Manage Hero Sliders | BEMEN Staff Portal",
    description: "View and manage all sliders for the homepage.",
    robots: { index: false, follow: false },
};

export default async function SlidersPage() {
    const sliders = await getSliders();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <header>
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
                        Hero Sliders
                    </h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        {sliders.length} Active Sliders found
                    </p>
                </header>

                <Link
                    href='/bemen-staff-portal/add-slider'
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                >
                    <Plus size={16} />
                    Add Slider
                </Link>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sliders.length === 0 ? (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No sliders available</p>
                    </div>
                ) : (
                    sliders.map((slider: any) => (
                        <article
                            key={slider._id.toString()}
                            className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
                        >
                            {/* Top: Image Thumbnail */}
                            <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 border-b border-gray-50">
                                {slider.image ? (
                                    <Image
                                        src={slider.image}
                                        alt="Slider Thumbnail" // Descriptive ALT text for SEO
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon size={40} className="text-gray-200" />
                                    </div>
                                )}
                            </div>

                            {/* Middle: Info */}
                            <div className="p-5 flex flex-col flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                                        ID: {slider._id.toString().slice(-6)}
                                    </span>
                                </div>

                                <h2 className="text-sm font-black text-gray-900 leading-tight">
                                    CTA Link: <a href={slider.ctaLink} target="_blank" className="font-normal text-blue-500 hover:underline">{slider.ctaLink}</a>
                                </h2>
                            </div>

                            {/* Bottom: Action Buttons */}
                            <footer className="bg-gray-50/50 px-5 py-3 flex justify-between items-center border-t border-gray-50 mt-auto">
                                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                                    Actions
                                </span>
                                <div className="flex gap-4">
                                    <Link
                                        href={`/bemen-staff-portal/edit-slider/${slider._id}`}
                                        className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors text-[10px] font-black uppercase tracking-widest group/btn"
                                    >
                                        <Pencil size={14} className="group-hover/btn:scale-110 transition-transform" />
                                    </Link>
                                    <DeleteSliderBtn id={slider._id.toString()} />
                                </div>
                            </footer>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
}
