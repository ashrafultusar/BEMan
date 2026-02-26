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
import styles from "./FeaturedCategories.module.css";

interface CategoryType {
  _id: string;
  name: string;
  image: string;
}

const FeaturedCategories = async () => {
  const response = await getCategories();
  const categories: CategoryType[] = response?.success ? response.data : [];

  if (!categories || categories.length === 0) return null;

  // Grid symmetry-r jonno amra 4-ti category dekhabo
  const displayCategories = categories.slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.header}>
          <div>
            <p className={styles.exploreText}>Explore</p>
            <h1 className={styles.title}>
              Shop by <span className={styles.italic}>Category</span>
            </h1>
          </div>
          <Link href="/shop" className={styles.viewAll}>
            View All Categories ↗
          </Link>
        </div>

        <div className={styles.grid}>
          {displayCategories.map((cat, index) => {
            const isFirst = index === 0;
            const slug = cat.name?.toLowerCase().replace(/\s+/g, "-");

            return (
              <Link
                key={cat._id}
                href={`/shop/${slug}`}
                className={`${styles.card} ${isFirst ? styles.cardLarge : ""}`}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={cat.image || "/placeholder.jpg"}
                    alt={cat.name}
                    fill
                    priority={isFirst}
                    className={styles.image}
                    sizes={isFirst ? "50vw" : "25vw"}
                  />
                  <div className={styles.overlay} />
                </div>

                <div className={styles.content}>
                  <span className={styles.badge}>New Collection</span>
                  <h3 className={styles.catName} style={{ fontSize: isFirst ? '1.8rem' : '1rem' }}>
                    {cat.name}
                  </h3>
                </div>

                {/* Real Color Icon */}
                <div className={styles.arrowBox}>
                  <ArrowUpRight size={20} color="#c5a47e" />
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