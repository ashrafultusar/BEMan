import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import EditSliderForm from "@/components/admin/slider/EditSliderForm";
import { getSliderById } from "@/lib/data/slider";
import { notFound } from "next/navigation";

export default async function EditSliderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const slider = await getSliderById(id);

    if (!slider) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <Link
                    href="/bemen-staff-portal/sliders"
                    className="p-2 hover:bg-gray-100 rounded-full transition-all border border-transparent hover:border-gray-100"
                >
                    <ArrowLeft size={24} className="text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
                        Edit Slider
                    </h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                        BEMEN Staff Portal • Homepage Hero
                    </p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded overflow-hidden shadow-sm">
                <EditSliderForm slider={JSON.parse(JSON.stringify(slider))} />
            </div>
        </div>
    );
}
