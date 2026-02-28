import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row min-h-[600px] w-full bg-[#1a1a1a]">
      {/* Left Side: Image Content */}
      <div className="relative w-full md:w-1/2 h-[400px] md:h-auto">
        <Image
          src="/assets/brandstory/brandstory.jpg" 
          alt="Man walking in city"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay to match the warm golden tint */}
        <div className="absolute inset-0 bg-orange-900/20 mix-blend-multiply"></div>
      </div>

      {/* Right Side: Text Content */}
      <div className="w-full md:w-1/2 bg-[#231f1e] p-8 md:p-16 lg:p-24 flex flex-col justify-center">
        <div className="max-w-xl">
          <div className="w-12 h-0.5 bg-[#c59d5f] mb-6"></div>
          
          <span className="text-[#c59d5f] uppercase tracking-widest text-sm font-semibold mb-4 block">
            Our Story
          </span>
          
          <h2 className="text-4xl md:text-5xl text-white font-serif mb-8 leading-tight">
            Crafted With <br />
            <span className="italic text-[#c59d5f]">Purpose & Passion</span>
          </h2>

          <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
            <p>
            Most brands try to be everything to everyone. At Bemen, we chose a different path. We believe that to do something perfectly, you must focus. That is why we dedicate ourselves exclusively to men’s essentials.
            </p>
            <p>
            We noticed a gap in the world of fashion: a sea of fast-fashion "trends" that lack soul and fall apart after three washes. Bemen was born from the desire to return to the roots of masculinity—where clothing was an investment, a statement of intent, and a mark of a gentleman.Wear Bemen to be man. It’s more than a motto; it’s our commitment to helping you show up as the best version of yourself, every single day.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
            <div>
              <h3 className="text-[#c59d5f] text-2xl font-bold mb-1">1K+</h3>
              <p className="text-gray-500 uppercase text-xs tracking-tighter">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-[#c59d5f] text-2xl font-bold mb-1">100+</h3>
              <p className="text-gray-500 uppercase text-xs tracking-tighter">Unique Designs</p>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h3 className="text-[#c59d5f] text-2xl font-bold mb-1">4.9</h3>
                <Star size={18} fill="#c59d5f" className="text-[#c59d5f] mb-1" />
              </div>
              <p className="text-gray-500 uppercase text-xs tracking-tighter">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;