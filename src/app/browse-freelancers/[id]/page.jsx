"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function FreelancerDetails({ params }) {
  // Next.js-এর নিয়ম অনুযায়ী params-কে আনর্যাপ (unwrap) করা
  const { id } = use(params);

  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchFreelancerDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/freelancers/${id}`, {
        cache: "no-store",
      });
      const data = await res.json();
      
      // ❌ ভুল ছিল: setFreelancersData(data);
      setFreelancer(data); // ✅ এটি ঠিক করে দিন
      
    } catch (error) {
      console.log("Failed to load freelancer details");
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchFreelancerDetails();
}, [id]);

  // কিছু মানসম্মত র্যান্ডম/কৃত্রিম ডেটা জেনারেট করার ফাংশন (যা ডাটাবেজে না থাকলেও দেখাবে)
  const getMockMetrics = (name = "") => {
    const charCodeSum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      jobsCompleted: (charCodeSum % 40) + 12, // ১২ থেকে ৫২ এর মধ্যে একটি সংখ্যা
      successRate: (charCodeSum % 10) + 91,    // ৯১% থেকে ১০০% এর মধ্যে
      experience: (charCodeSum % 4) === 0 ? "Expert" : (charCodeSum % 4) === 1 ? "Senior" : "Intermediate",
      joined: `Jan 202${(charCodeSum % 3) + 4}` // ২০২৪ থেকে ২০২৬ এর মধ্যে
    };
  };

  const metrics = freelancer ? getMockMetrics(freelancer.name) : null;

  const handleHireClick = () => {
    toast.success(`Hiring request sent to ${freelancer?.name || "Freelancer"}!`, {
      style: {
        border: "1px solid #1e293b",
        padding: "16px",
        color: "#f8fafc",
        background: "#0f172a",
      },
      iconTheme: {
        primary: "#34d399",
        secondary: "#0f172a",
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-slate-400">
        Freelancer not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/browse-freelancers" 
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 mb-6 transition-colors group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-4 h-4 transform transition-transform group-hover:-translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span>Back to Freelancers</span>
        </Link>

        {/* Main Profile Card */}
        <div className="relative bg-[#131B2E] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500" />
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="p-6 sm:p-10 relative z-10">
            
            {/* Identity Info */}
            <div className="text-center flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 blur-sm opacity-60"></div>
                {freelancer?.image ? (
                  <Image
                    src={freelancer.image}
                    alt={freelancer?.name || "Freelancer"}
                    width={144}
                    height={144}
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-[#131B2E] relative z-10 shadow-xl"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-[#131B2E] flex items-center justify-center text-cyan-400 text-4xl font-bold relative z-10 shadow-xl">
                    {freelancer?.name?.charAt(0)?.toUpperCase() || "F"}
                  </div>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold mt-6 bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent tracking-tight">
                {freelancer?.name}
              </h1>

              <p className="text-xl font-bold text-emerald-400 mt-2 tracking-wide">
                ${freelancer?.hourlyRate || 0} <span className="text-sm text-slate-400 font-normal">/ hour</span>
              </p>
            </div>

            {/* ARTIFICIAL METRICS GRID*/}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50">
              <div className="text-center p-2 border-r border-slate-800/40 last:border-0">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Success Rate</p>
                <p className="text-base sm:text-lg font-bold text-emerald-400 mt-1">{metrics?.successRate}%</p>
              </div>
              <div className="text-center p-2 sm:border-r border-slate-800/40 last:border-0">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Jobs Done</p>
                <p className="text-base sm:text-lg font-bold text-slate-200 mt-1">{metrics?.jobsCompleted}+</p>
              </div>
              <div className="text-center p-2 border-r border-slate-800/40 last:border-0">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Level</p>
                <p className="text-base sm:text-lg font-bold text-cyan-400 mt-1">{metrics?.experience}</p>
              </div>
              <div className="text-center p-2 last:border-0">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Member Since</p>
                <p className="text-sm sm:text-base font-medium text-slate-300 mt-1">{metrics?.joined}</p>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-10">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800/60 pb-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                About Professional
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed font-light whitespace-pre-line">
                {freelancer?.bio || "No biography provided by the expert yet."}
              </p>
            </div>

            {/* Skills Section */}
            <div className="mt-10">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800/60 pb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                Core Expertise
              </h2>
              
              <div className="flex flex-wrap gap-2 mt-5">
                {Array.isArray(freelancer?.skills) && freelancer.skills.length > 0 ? (
                  freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-900/50 text-slate-300 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : freelancer?.skills && typeof freelancer.skills === "string" ? (
                  freelancer.skills.split(",").map((skill) => (
                    <span
                      key={skill}
                      className="bg-slate-900/50 text-slate-300 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic bg-slate-900/30 border border-slate-800/40 px-3 py-1 rounded-xl">
                    No explicit skills listed.
                  </span>
                )}
              </div>
            </div>

            {/* Action Section */}
            <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-center sm:text-left">
                <p className="text-xs text-slate-500">Direct Contact</p>
                <p className="text-sm font-medium text-slate-300 mt-0.5">{freelancer?.email}</p>
              </div>

              {/* Hire Me Button with Toast Trigger */}
              <button 
                onClick={handleHireClick}
                className="w-full sm:w-auto cursor-pointer px-8 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(34,211,238,0.15)] hover:shadow-[0_4px_25px_rgba(34,211,238,0.3)] transform hover:-translate-y-0.5"
              >
                Hire {freelancer?.name?.split(" ")[0] || "Freelancer"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}