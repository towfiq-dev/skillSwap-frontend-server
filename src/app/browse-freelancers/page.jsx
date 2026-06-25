"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BrowseFreelancersPage() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/freelancers`);
        const data = await res.json();
        setFreelancers(data);
      } catch (error) {
        console.log("Failed to load freelancers");
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="flex flex-col items-center gap-4">
          {/* Neon Animated Spinner */}
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute inset-0 rounded-full border border-emerald-400/30 animate-pulse scale-110"></div>
          </div>

          <p className="text-slate-400 font-medium tracking-wide text-sm mt-2">
            Loading brilliant minds...
          </p>

          <div className="flex gap-1.5">
            <span className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Fancy Header section with Neon Gradient Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-32 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 blur-3xl rounded-full"></div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Browse Expert <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Freelancers</span>
          </h1>
          <p className="text-slate-400 mt-4 text-base sm:text-lg max-w-xl mx-auto font-light">
            Connect with top-tier professionals crafted to bring your digital visions to life.
          </p>
        </motion.div>

        {/* Full Responsive Grid - 1 col on mobile, 2 on tablet, 3 on desktop, 4 on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {freelancers.map((freelancer, index) => (
            <motion.div
              key={freelancer?._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-[#131B2E] border border-slate-800/80 rounded-2xl flex flex-col h-full overflow-hidden shadow-xl hover:border-slate-700 transition-all duration-300"
            >
              {/* Card Hover Glow Backlight */}
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-emerald-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-emerald-500/10 group-hover:to-cyan-500/10 rounded-2xl transition-all duration-500 pointer-events-none" />

              {/* Top Banner Accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-cyan-500/20 group-hover:from-cyan-400 group-hover:to-emerald-400 transition-all duration-500" />

              {/* CARD MAIN CONTENT */}
              <div className="p-6 flex flex-col items-center flex-grow relative z-10">
                
                {/* Avatar Area with Glow Effect */}
                <div className="relative mt-2">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                  {freelancer?.image ? (
                    <Image
                      src={freelancer.image}
                      alt={freelancer.name || "Freelancer"}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full object-cover border-2 border-slate-800 relative z-10 transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 flex items-center justify-center text-cyan-400 text-2xl font-bold relative z-10">
                      {freelancer?.name?.charAt(0)?.toUpperCase() || "F"}
                    </div>
                  )}
                </div>

                {/* Name */}
                <h2 className="text-lg font-bold mt-4 text-slate-100 group-hover:text-cyan-400 transition-colors text-center line-clamp-1">
                  {freelancer?.name}
                </h2>

                {/* Rate Badge */}
                <div className="mt-1.5 px-3 py-0.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs font-semibold text-emerald-400 tracking-wide">
                  ${freelancer?.hourlyRate || 0} / hr
                </div>

                {/* Bio (Fixed Height with Multiline Ellipsis) */}
                <p className="text-xs text-slate-400 mt-4 text-center line-clamp-3 min-h-[48px] leading-relaxed font-light">
                  {freelancer?.bio || "Crafting unique experiences and solid clean architectures across the modern web platform."}
                </p>

                {/* Dynamic Skills Badges (Renders nicely if they exist) */}
                <div className="mt-5 flex flex-wrap gap-1.5 justify-center content-start overflow-hidden max-h-[56px] w-full">
                  {freelancer?.skills && freelancer.skills.length > 0 ? (
                    freelancer.skills.slice(0, 3).map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900/40 text-slate-300 border border-slate-800/60 group-hover:border-slate-700/80 transition-colors"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900/40 text-slate-500 border border-slate-800/40 italic">
                      Verified Talent
                    </span>
                  )}
                </div>
              </div>

              {/* CARD ACTION FOOTER */}
              <div className="p-5 pt-0 mt-auto relative z-10">
                <Link href={`/browse-freelancers/${freelancer._id}`} className="block w-full">
                  <button className="w-full cursor-pointer relative group/btn overflow-hidden rounded-xl p-[1px] focus:outline-none">
                    {/* Glowing button borders */}
                    <span className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 group-hover/btn:from-cyan-400 group-hover/btn:to-emerald-400 transition-all duration-300 rounded-xl" />
                    
                    <div className="relative px-4 py-2.5 bg-[#161F37] group-hover/btn:bg-transparent text-slate-300 group-hover/btn:text-slate-950 font-semibold text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-1">
                      <span>View Full Profile</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2} 
                        stroke="currentColor" 
                        className="w-3.5 h-3.5 transform transition-transform group-hover/btn:translate-x-1"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </div>
                  </button>
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}