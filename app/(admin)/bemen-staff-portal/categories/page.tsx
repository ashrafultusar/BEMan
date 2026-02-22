import { Plus, Pencil, Trash2, Layers, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/data/category";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Categories | BEMEN Staff Portal",
  description: "View and manage all product collections and categories for BEMEN inventory.",
  robots: { index: false, follow: false }, 
};

export default async function CategoriesPage() {
  const result = await getCategories();
  const categories = result.success ? result.data : [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <header>
          <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
            Categories
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            {categories.length} Total Collections found
          </p>
        </header>

        <Link 
          href='/bemen-staff-portal/add-category' 
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg active:scale-95"
        >
          <Plus size={16} />
          Add Category
        </Link>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No categories available</p>
          </div>
        ) : (
          categories.map((category: any) => (
            <article
              key={category._id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="p-5 flex gap-4 items-start justify-between min-h-[140px]">
                
                {/* Left Side: Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                      ID: {category._id.slice(-6)}
                    </span>
                  </div>
                  
                  <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-black transition-colors">
                    {category.name}
                  </h2>
                  
                  <p className="text-xs text-gray-400 font-medium line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2">
                     <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                        <Layers size={12} className="text-gray-400" />
                        <span className="text-[10px] font-bold text-gray-600">
                           {category.productCount || 0} Products
                        </span>
                     </div>
                  </div>
                </div>

                {/* Right Side: Image Thumbnail */}
                <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-50 shadow-inner">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={`${category.name} category thumbnail`} // Descriptive ALT text for SEO
                      fill
                      sizes="96px" // Specific size for performance
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      priority={false} // Only use true for above-the-fold images
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={24} className="text-gray-200" />
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom: Action Buttons */}
              <footer className="bg-gray-50/50 px-5 py-3 flex justify-between items-center border-t border-gray-50">
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                  Actions
                </span>
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 text-gray-400 hover:text-black transition-colors text-[10px] font-black uppercase tracking-widest group/btn">
                    <Pencil size={14} className="group-hover/btn:scale-110 transition-transform" />
                    Edit
                  </button>
                  <button className="flex items-center gap-1 text-gray-400 hover:text-red-600 transition-colors text-[10px] font-black uppercase tracking-widest group/btn">
                    <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform" />
                    Delete
                  </button>
                </div>
              </footer>
            </article>
          ))
        )}
      </div>
    </div>
  );
}