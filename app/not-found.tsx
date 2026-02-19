import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 · Page Not Found | BEBEN',
  description: 'Page not found',
};

export default function NotFound() {
  return (
   
    <div className="min-h-screen bg-gradient-to-b from-[#3a5a92] via-[#212b46] to-[#111827] flex items-center justify-center p-4 overflow-hidden relative">
      
     
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="max-w-lg w-full text-center relative z-10">
        
        {/* Main 404 Visual with Astronaut */}
        <div className="flex items-center justify-center mb-4 select-none">
          <h1 className="text-[12rem] md:text-[16rem] font-bold text-white leading-none tracking-tighter opacity-90">
            4
          </h1>
          
          {/* Astronaut Center Image */}
          <div className="relative w-40 h-40 md:w-56 md:h-56 -mx-4 md:-mx-8 animate-bounce transition-all duration-[2000ms]">
            
             <svg viewBox="0 0 200 200" className="drop-shadow-2xl">
                <circle cx="100" cy="100" r="70" fill="#ededed" /> {/* Head */}
                <rect x="65" y="80" width="70" height="45" rx="20" fill="#2d3748" /> {/* Visor */}
                <path d="M70 90 Q100 80 130 90" stroke="#FF0000" strokeWidth="3" fill="none" /> {/* Red Detail */}
                <rect x="75" y="140" width="50" height="60" rx="10" fill="#ededed" /> {/* Body */}
                <circle cx="100" cy="160" r="10" fill="#3B82F6" /> {/* Blue Button */}
             </svg>
          </div>

          <h1 className="text-[12rem] md:text-[16rem] font-bold text-white leading-none tracking-tighter opacity-90">
            4
          </h1>
        </div>

        {/* Text Area */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-[0.3em] text-white">
            PAGE NOT FOUND
          </h2>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">
            The page you are looking for might be removed or is temporarily unavailable.
          </p>
        </div>
        
       
        <div className="mt-10">
          <Link
            href="/"
            className="inline-block px-10 py-3 bg-[#4b79c1] text-white rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#3a5a92] transition-all duration-300 shadow-lg hover:shadow-[#4b79c1]/50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}