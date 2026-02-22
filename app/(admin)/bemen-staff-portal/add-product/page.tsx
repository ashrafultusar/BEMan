import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddProductForm from "@/components/admin/product/AddProductForm";
import { getCategories } from "@/lib/data/category";

export default async function AddProductPage() {
  
  const response = await getCategories();
  const categories = response.success ? response.data : [];
  
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-[#fcfcfc] min-h-screen">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <Link href="/bemen-staff-portal/products" className="p-2 hover:bg-gray-100 rounded-full border border-gray-100 bg-white shadow-sm">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-black uppercase tracking-tight text-gray-900">New Product</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Add inventory to BEMEN Store</p>
          </div>
        </div>
      </div>

      <AddProductForm categories={categories} />
    </div>
  );
}