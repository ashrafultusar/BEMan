"use client";

import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';

export default function ComingSoonHome() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  // Launch date memoized to prevent the cascading render error
  const launchDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d;
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 font-sans text-white overflow-hidden">
      
      {/* Background Decorative Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className={`relative z-10 w-full max-w-5xl px-6 flex flex-col items-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* LOGO & SLOGAN SECTION */}
        <div className="mb-8 flex flex-col items-center">
          <div className="p-1 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full shadow-lg mb-4">
            <div className="bg-black rounded-full p-1 flex items-center justify-center overflow-hidden">
              <Image 
                src="/assets/logo.jpg" 
                alt="Logo" 
                width={80} 
                height={80} 
                className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover"
                priority
              />
            </div>
          </div>
          <h2 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-gray-400 text-center">
            Wear <span className="text-white">BeMen</span> To Be Men
          </h2>
        </div>

        {/* Hero Text */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">COMING</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">SOON</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto tracking-wide">
            Our premium collection is worth the wait.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex gap-4 md:gap-8 mb-10 w-full max-w-3xl justify-center">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl transition-transform hover:scale-105">
                <span className="text-2xl md:text-4xl font-bold text-white">
                  {value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="mt-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold">{unit}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs mb-10">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
            <span>Production</span>
            <span className="text-cyan-400">85%</span>
          </div>
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-600" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a 
            href="https://www.facebook.com/profile.php?id=100091527039942" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-[#1877F2] hover:border-[#1877F2] hover:scale-110 group"
          >
            <span className="text-xl font-bold text-white group-hover:scale-110">f</span>
          </a>
          <a 
            href="#" 
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-[#E4405F] hover:border-[#E4405F] hover:scale-110 group"
          >
            <span className="text-xl font-bold text-white group-hover:scale-110">ig</span>
          </a>
        </div>

        {/* Simple Footer */}
        <footer className="mt-10 text-gray-500 text-[9px] uppercase tracking-[0.4em]">
          © 2026 Meban Creative
        </footer>
      </div>

      <style jsx>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}