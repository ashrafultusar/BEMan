import { getProducts } from "@/lib/data/product";
import Sidebar from "@/components/main/Sidebar/Sidebar";
import ProductCard from "@/components/main/ProductCard/ProductCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CategoryPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ category: string }>,
  searchParams: Promise<{ q?: string }> 
}) {
  const { category } = await params;
  const { q: searchQuery } = await searchParams;

  const response = await getProducts(searchQuery);
  const products = response.success ? response.data : [];

  const categoryParam = category || "all";
  const activeCategoryTitle = categoryParam.replace(/-/g, " ").toUpperCase();

  let displayProducts = products;
  if (activeCategoryTitle !== "ALL") {
    displayProducts = displayProducts.filter((p: any) => 
      p.category.toUpperCase() === activeCategoryTitle
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-16 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar - Styled to be more minimal */}
        <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-28 h-fit">
          <div className="border-l border-gray-100 pl-6">
            <Sidebar activeCategory={categoryParam} />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Header Section */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 pb-10">
            <div>
              <span className="text-[#c59d5f] text-[10px] tracking-[0.4em] uppercase font-bold block mb-3">
                {searchQuery ? "Search Results" : "Collection"}
              </span>
              <h1 className="text-4xl md:text-5xl text-black font-serif tracking-tight uppercase">
                {searchQuery ? (
                  <>Results for: <span className="italic text-[#c59d5f]">{searchQuery}</span></>
                ) : (
                  <>Shop <span className="italic text-[#c59d5f]">{activeCategoryTitle}</span></>
                )}
              </h1>
              <p className="text-[11px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-medium">
                Displaying {displayProducts.length} Premium Items
              </p>
            </div>

            {searchQuery && (
              <Link 
                href={`/shop/${categoryParam}`} 
                className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black border border-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-300"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Clear Search
              </Link>
            )}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {displayProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {displayProducts.length === 0 && (
            <div className="text-center py-40 border border-dashed border-gray-200">
              <span className="text-[#c59d5f] text-4xl mb-6 block">×</span>
              <p className="text-gray-400 mb-8 text-[11px] font-bold uppercase tracking-[0.3em]">
                No pieces found in this collection.
              </p>
              <Link 
                href="/shop/all" 
                className="inline-block text-[10px] font-bold text-black border-b border-black pb-1 hover:text-[#c59d5f] hover:border-[#c59d5f] transition-all uppercase tracking-widest"
              >
                Browse All Collections
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}