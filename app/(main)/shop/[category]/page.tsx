import { getProducts } from "@/lib/data/product";
import Sidebar from "@/components/main/Sidebar/Sidebar";
import ProductCard from "@/components/main/ProductCard/ProductCard";
import Link from "next/link";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  // ১. সার্ভার থেকে সব প্রোডাক্ট নিয়ে আসা
  const response = await getProducts();
  const allProducts = response.success ? response.data : [];

  // ২. URL প্যারামিটারকে ক্লিন করা (যেমন: men-s-collection -> MEN'S COLLECTION)
  const categoryParam = category || "";
  const activeCategoryTitle = categoryParam 
    ? categoryParam.replace(/-/g, " ").toUpperCase() 
    : "ALL";

  // ৩. ডাইনামিক ফিল্টারিং
  const displayProducts = activeCategoryTitle === "ALL"
    ? allProducts
    : allProducts.filter((p: any) => p.category.toUpperCase() === activeCategoryTitle);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 bg-white">
      <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-24 h-fit">
        <Sidebar activeCategory={categoryParam} />
      </aside>

      <main className="flex-1">
        <h1 className="text-2xl font-bold uppercase mb-8 border-b pb-4 tracking-widest text-black">
          {activeCategoryTitle}
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product: any) => (
            <ProductCard 
              key={product._id} 
              product={product} 
            />
          ))}
        </div>

        {displayProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4 font-medium uppercase tracking-tighter">
              No products found in {activeCategoryTitle}.
            </p>
            <Link href="/shop/all" className="text-sm font-bold underline">
              BACK TO SHOP ALL
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}