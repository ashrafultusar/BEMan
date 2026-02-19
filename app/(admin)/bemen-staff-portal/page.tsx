import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="  text-black font-sans">
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          
          {/* Logo & Branding */}
          <div className="flex flex-col items-center justify-center mb-12">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-full border border-gray-100 shadow-sm bg-white p-2 mb-6 select-none">
              <Image
                src="/assets/logo.jpg" 
                alt="BEMEN Official Logo"
                fill
                priority 
                sizes="(max-width: 1040px) 196px, 112px" 
                className="object-contain"
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-black tracking-tighter uppercase italic">
              BEMEN
            </h1>

            <p className="mt-4 text-xs md:text-sm text-gray-500 font-bold uppercase tracking-[0.4em]">
            WEAR BEMEN TO BE MEN
            </p>
          </div>

          {/* Main Message */}
          <div className="max-w-3xl mx-auto border-t border-b border-gray-100 py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 uppercase tracking-tight">
              Crafting Confidence Through Style
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg font-medium px-4">
              Welcome to the world of <span className="text-black font-bold">BEMEN</span>. 
              We believe that clothing is more than just fabric—it&apos;s an expression of identity. 
              Our collections are meticulously designed for the modern man who values 
              quality, comfort, and timeless sophistication.
            </p>
            
          
          </div>

        
        </div>
      </section>
    </div>
  );
};

export default Page;