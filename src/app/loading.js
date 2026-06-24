"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keeps the loader visible for exactly 2.5 seconds (2500ms)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center transition-colors duration-300">
      
      {/* --- Premium Background Effects --- */}
      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-red-400/15 blur-[120px] dark:bg-red-900/5 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-rose-400/15 blur-[140px] dark:bg-rose-900/5 pointer-events-none" />
      
      {/* Subtle Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* --- Loader Content --- */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        
        {/* Modern Spinner Layer */}
        <div className="relative flex items-center justify-center h-20 w-20">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800" />
          
          {/* Smooth Elegant Accent Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 dark:border-t-red-500 animate-[spin_2s_linear_infinite]" />
          
          {/* Inner Pulsing Core */}
          <div className="h-6 w-6 rounded-full bg-rose-500/20 dark:bg-rose-500/30 animate-[pulse_2.5s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
        </div>

        {/* Loading Text */}
        <h2 className="mt-8 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 md:text-2xl animate-[pulse_2.5s_cubic-bezier(0.4,0,0.6,1)_infinite]">
          Loading content
        </h2>
        
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs font-medium tracking-wide">
          Please wait while we prepare everything for you...
        </p>

      </div>
    </section>
  );
}