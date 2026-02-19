import React from 'react';
import Link from 'next/link';

const CraftedSection: React.FC = () => {
  return (
   
    <section className="relative w-full py-20 md:py-32 flex items-center justify-center bg-black text-white border-y border-gray-100">
      
    

      <div className="relative z-10 text-center px-4 max-w-3xl">
     
        <h2 className="text-3xl md:text-5xl font-serif text-[#1a1a1a] mb-6 tracking-tight">
          Crafted With Purpose
        </h2>
        
        <p className="text-sm md:text-base mb-10 leading-relaxed font-light tracking-wide max-w-xl mx-auto">
          Every piece is designed to last. We focus on premium materials, 
          thoughtful construction, and a timeless style that transcends seasons.
        </p>


        <Link 
          href="/shop/all" 
          className="bg-white px-5 text-black py-3 "
        >
          Explore Collection
        </Link>
      </div>

    </section>
  );
};

export default CraftedSection;