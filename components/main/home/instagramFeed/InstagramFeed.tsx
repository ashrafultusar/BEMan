import React from 'react';
import Image from 'next/image';

const InstagramFeed: React.FC = () => {
  // ইমেজ পাথগুলো আপনার public ফোল্ডার অনুযায়ী পরিবর্তন করে নিন
  const feedImages = [
    '/assets/categorise/3.jpg',
    '/assets/categorise/4.jpg',
    '/assets/categorise/5.jpg',
    '/assets/categorise/8.jpg',
    '/assets/categorise/6.jpg',
    '/assets/categorise/7.jpg',
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#c59d5f] text-[10px] tracking-[0.4em] uppercase font-bold">
            @BEMEN.BD
          </span>
          <h2 className="text-4xl md:text-5xl text-black font-serif mt-4">
            Follow Us on <span className="italic text-[#c59d5f]">Instagram</span>
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {feedImages.map((src, index) => (
            <div 
              key={index} 
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <Image
                src={src}
                alt={`Instagram feed ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">View Post</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;