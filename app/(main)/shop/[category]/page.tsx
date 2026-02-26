import { getProducts } from "@/lib/data/product";
import Sidebar from "@/components/main/Sidebar/Sidebar";
import ProductCard from "@/components/main/ProductCard/ProductCard";
import Link from "next/link";

export default async function CategoryPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ category: string }>,
  searchParams: Promise<{ q?: string }> 
}) {
  const { category } = await params;
  const { q: searchQuery } = await searchParams;

  // Backend theke filtered data fetch kora
  const response = await getProducts(searchQuery);
  const products = response.success ? response.data : [];

  const categoryParam = category || "all";
  const activeCategoryTitle = categoryParam.replace(/-/g, " ").toUpperCase();

  // Category filtering (Double layer filter for accuracy)
  let displayProducts = products;
  if (activeCategoryTitle !== "ALL") {
    displayProducts = displayProducts.filter((p: any) => 
      p.category.toUpperCase() === activeCategoryTitle
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 bg-white min-h-screen">
      <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-24 h-fit">
        <Sidebar activeCategory={categoryParam} />
      </aside>

      <main className="flex-1">
        <div className="mb-8 border-b pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-widest text-black">
              {searchQuery ? `Search: ${searchQuery}` : activeCategoryTitle}
            </h1>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
              {displayProducts.length} Items Found
            </p>
          </div>
          {searchQuery && (
            <Link href={`/shop/${categoryParam}`} className="text-[10px] font-bold border border-black px-4 py-1 hover:bg-black hover:text-white transition-all uppercase">
              Clear Search
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {displayProducts.length === 0 && (
          <div className="text-center py-32 bg-gray-50 rounded-lg">
            <p className="text-gray-400 mb-6 text-xs font-bold uppercase tracking-widest">No matching products.</p>
            <Link href="/shop/all" className="inline-block text-[10px] font-black border-b-2 border-black pb-1 uppercase">Browse All</Link>
          </div>
        )}
      </main>
    </div>
  );
}