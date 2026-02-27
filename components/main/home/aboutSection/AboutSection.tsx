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
              Every piece at BEMEN is a testament to our commitment to excellence. 
              We believe fashion should be both beautiful and enduring — garments 
              that feel as good as they look, designed for the modern man who 
              values quality above all.
            </p>
            <p>
              From sourcing premium fabrics to perfecting every stitch, our 
              attention to detail ensures that each collection tells a story 
              of sophistication and style.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
            <div>
              <h3 className="text-[#c59d5f] text-2xl font-bold mb-1">10K+</h3>
              <p className="text-gray-500 uppercase text-xs tracking-tighter">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-[#c59d5f] text-2xl font-bold mb-1">500+</h3>
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