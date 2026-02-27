// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { getCategories } from "@/lib/data/category";

// // ১. ইন্টারফেস আপডেট (যদি আপনার API 'name' রিটার্ন করে তবেই এটি কাজ করবে)
// interface CategoryType {
//   _id: string;
//   name: string; 
//   image: string;
//   alt?: string;
// }

// const FeaturedCategories = async () => {
//   const response = await getCategories();
  
//   // সেফটি চেক: ডাটা ঠিকমতো আছে কিনা
//   const categories: CategoryType[] = response?.success ? response.data : [];

//   if (!categories || categories.length === 0) return null;

//   return (
//     <section className="max-w-7xl mx-auto px-4 py-16" aria-labelledby="category-heading">
//       <h2 id="category-heading" className="text-center text-2xl font-bold mb-10 tracking-tight uppercase">
//         Featured Categories
//       </h2>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//         {categories.map((category, index) => {
//           // সেফটি চেক: ক্যাটাগরির নাম না থাকলে 'all' দেখাবে
//           const categorySlug = category.name?.toLowerCase().replace(/\s+/g, "-") || "all";

//           return (
//             <Link
//               href={`/shop/${categorySlug}`}
//               key={category._id || index}
//               className="group block relative overflow-hidden bg-gray-100 aspect-[3/4]"
//               // 'name' প্রপ বদলে 'title' করা হয়েছে
//               title={`Browse our ${category.name || 'collection'}`}
//             >
//               <Image
//                 src={category.image || "/placeholder.jpg"} // ফলব্যাক ইমেজ
//                 alt={category.alt || category.name || "category"}
//                 fill
//                 sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
//                 className="object-cover transition-transform duration-700 group-hover:scale-110"
//                 priority={index < 4}
//               />

//               {/* Badge for New Items */}
//               <div className="absolute top-3 inset-x-0 flex justify-center z-10">
//                 <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-semibold">
//                   JUST LAUNCHED
//                 </span>
//               </div>

//               {/* Overlay Text */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6">
//                 <h3 className="text-white font-bold text-xs md:text-sm tracking-[0.2em] uppercase text-center px-2">
//                   {category.name}
//                 </h3>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default FeaturedCategories;


import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategories } from "@/lib/data/category";

interface CategoryType {
  _id: string;
  name: string;
  image: string;
}

const FeaturedCategories = async () => {
  const response = await getCategories();
  const categories: CategoryType[] = response?.success ? response.data : [];

  if (!categories || categories.length === 0) return null;

  // প্রথম ৪টি ক্যাটাগরি দেখানো হচ্ছে
  const displayCategories = categories.slice(0, 4);

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header - Matching About & Instagram sections */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-[#c59d5f] text-[10px] tracking-[0.4em] uppercase font-bold">
              Explore
            </span>
            <h2 className="text-4xl md:text-5xl text-black font-serif mt-3 uppercase tracking-tight">
              Shop by <span className="italic text-[#c59d5f]">Category</span>
            </h2>
          </div>
          <Link 
            href="/shop/all" 
            className="text-[11px] font-bold uppercase tracking-widest text-black border-b border-black pb-1 hover:text-[#c59d5f] hover:border-[#c59d5f] transition-all duration-300 flex items-center gap-2 group"
          >
            View All Categories
            <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid Style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          {displayCategories.map((cat, index) => {
            const isFirst = index === 0;
            const slug = cat.name?.toLowerCase().replace(/\s+/g, "-");

            return (
              <Link
                key={cat._id}
                href={`/shop/${slug}`}
                className={`group relative overflow-hidden bg-[#f7f7f7] ${
                  isFirst 
                    ? "md:col-span-2 md:row-span-2" // প্রথম ক্যাটাগরি বড় হবে
                    : "md:col-span-1 md:row-span-1"
                }`}
              >
                {/* Image */}
                <Image
                  src={cat.image || "/placeholder.jpg"}
                  alt={cat.name}
                  fill
                  priority={isFirst}
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes={isFirst ? "50vw" : "25vw"}
                />
                
                {/* Minimal Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-[#c59d5f] text-[9px] font-bold uppercase tracking-[0.3em] mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    New Collection
                  </span>
                  <h3 className={`text-white font-serif tracking-wide transition-all duration-500 ${
                    isFirst ? 'text-3xl' : 'text-xl'
                  }`}>
                    {cat.name}
                  </h3>
                </div>

                {/* Real Color Icon Box */}
                <div className="absolute top-6 right-6 w-10 h-10 bg-white flex items-center justify-center translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <ArrowUpRight size={20} color="#c59d5f" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;