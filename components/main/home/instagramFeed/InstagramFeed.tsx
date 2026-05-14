import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface InstagramPost {
  src: string;
  link: string;
}

const InstagramFeed: React.FC = () => {
  // এখানে আপনার ইমেজের পাথ এবং আসল ইনস্টাগ্রাম পোস্টের লিঙ্ক বসিয়ে দিন
  const feedImages: InstagramPost[] = [
    { src: '/assets/categorise/1.jpg', link: 'https://www.instagram.com/reels/DVmfN52E8P1/' },
    { src: '/assets/categorise/2.jpg', link: 'https://www.instagram.com/reels/DXqg104FJ6s/' },
    { src: '/assets/categorise/3.jpg', link: 'https://www.instagram.com/reels/DU_QUZNkyRb/' },
    { src: '/assets/categorise/4.jpg', link: 'https://www.instagram.com/reels/DTDZdqDE4RF/' },
    { src: '/assets/categorise/5.jpg', link: 'https://www.instagram.com/reels/DVVVmrIk3G6/' },
    { src: '/assets/categorise/6.jpg', link: 'https://www.instagram.com/p/DVqAHRJE8tG/?img_index=1&igsh=amc3bXJpbmU0OG1x' },
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
          {feedImages?.map((post, index) => (
            <Link 
              key={index} 
              href={post.link}
              target="_blank" // নতুন ট্যাবে ওপেন করার জন্য
              rel="noopener noreferrer" // সিকিউরিটির জন্য
              className="relative aspect-square overflow-hidden group cursor-pointer block"
            >
              <Image
                src={post.src}
                alt={`Instagram feed ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">View Post</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;