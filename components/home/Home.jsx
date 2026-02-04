"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ComingSoonHome() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

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
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 font-sans text-white overflow-hidden">
      
      {/* Background Decorative Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className={`relative z-10 w-full max-w-5xl px-6 flex flex-col items-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* LOGO SECTION */}
<div className="mb-8 flex justify-center">
  <div className="p-1 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-full shadow-lg">
    <div className="bg-black rounded-full p-1 flex items-center justify-center overflow-hidden">
      <Image 
        src="/assets/logo.jpg" 
        alt="Logo" 
        width={80} 
        height={80} 
        className="h-18 w-18 md:h-24 md:w-24 rounded-full object-cover"
        priority
      />
    </div>
  </div>
</div>

        {/* Hero Text */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse">COMING</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">SOON</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We&apos;re crafting a digital experience that&apos;s <span className="text-cyan-400 font-medium">worth the wait</span>.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex gap-4 md:gap-8 mb-10 w-full max-w-3xl justify-center">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl transition-transform hover:scale-105">
                <span className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                  {value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="mt-2 text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold">{unit}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-10">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
            <span>Development Status</span>
            <span className="text-cyan-400">85%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 relative" style={{ width: '85%' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          {[
            { n: '𝕏', c: 'hover:bg-[#1DA1F2]' }, 
            { n: 'f', c: 'hover:bg-[#1877F2]' }, 
            { n: 'ig', c: 'hover:bg-[#E4405F]' }, 
            { n: 'in', c: 'hover:bg-[#0077B5]' }
          ].map((social) => (
            <a key={social.n} href="#" className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:text-white hover:scale-110 ${social.c}`}>
              <span className="text-lg font-bold">{social.n}</span>
            </a>
          ))}
        </div>

        {/* Simple Footer */}
        <footer className="mt-10 text-gray-400 text-[10px] uppercase tracking-[0.3em]">
          © 2026 Meban 
        </footer>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-[20%] left-[10%] animate-float opacity-30"><div className="w-2 h-2 bg-cyan-400 rounded-full"></div></div>
      <div className="fixed top-[60%] right-[15%] animate-float-delayed opacity-30"><div className="w-3 h-3 bg-blue-500 rounded-full"></div></div>

      <style jsx>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite; animation-delay: 2s; }
        .animate-shimmer { animation: shimmer 2s infinite linear; }
      `}</style>
    </div>
  );
}