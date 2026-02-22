"use client";
import { useParams } from "next/navigation";
import { products } from "@/data/products";
import Sidebar from "@/components/main/Sidebar/Sidebar";
import ProductCard from "@/components/main/ProductCard/ProductCard";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  

  const categoryParam = (params?.category as string) || "";

  const activeCategory = categoryParam 
    ? categoryParam.replace("-", " ").toUpperCase() 
    : "ALL";

  const displayProducts =
    activeCategory === "ALL" || activeCategory === ""
      ? products
      : products.filter((p) => p.category.toUpperCase() === activeCategory);

  
  if (!categoryParam && activeCategory !== "ALL") {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 bg-white">
      <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-24 h-fit">
    <Sidebar activeCategory={categoryParam} />
  </aside>

      <main className="flex-1">
        <h1 className="text-2xl font-bold uppercase mb-8 border-b pb-4 tracking-widest text-black">
          {activeCategory || "Shop All"}
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
  {displayProducts.map((product) => (
    <ProductCard 
      key={product.id} 
      product={{
        ...product,
        _id: product.id.toString(), 
        images: [product.image],    
      }} 
    />
  ))}
</div>

        {displayProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4 font-medium uppercase tracking-tighter">
              No products found in {activeCategory}.
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