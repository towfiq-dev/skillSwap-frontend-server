"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
      
      {/* --- Premium Background Effects --- */}
      {/* Decorative Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-red-400/20 blur-[120px] dark:bg-red-900/10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-rose-400/20 blur-[140px] dark:bg-rose-900/10 pointer-events-none" />
      
      {/* Subtle Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* --- Content Card Layout --- */}
      <div className="container relative z-10 mx-auto px-6 py-12 lg:flex lg:items-center lg:gap-16 max-w-7xl">
        
        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-200/60 dark:border-red-900/40 text-red-600 dark:text-red-400 font-medium bg-red-50/50 dark:bg-red-950/20 shadow-sm backdrop-blur-sm animate-fade-in">
            <HelpCircle className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider font-semibold">404 Error</span>
          </div>

          {/* Heading */}
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
            Page not found
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
            Sorry, the page you are looking for doesn't exist or has been moved. Here are some helpful links to get you back on track.
          </p>
          
          {/* Technical Info Box */}
          <div className="mt-6 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md w-full max-w-lg text-left shadow-inner">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
              Diagnostic Details
            </span>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              The requested resource returned a <span className="text-red-500 font-semibold">404_NOT_FOUND</span> state.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg sm:max-w-none">
            <button
              onClick={() => router.back()}
              className="group flex items-center justify-center gap-x-2 w-full sm:w-auto rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Go Back</span>
            </button>

            <Link
              href="/"
              className="group flex items-center justify-center gap-x-2 w-full sm:w-auto rounded-xl bg-red-600 dark:bg-red-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-red-600/10 transition-all duration-200 hover:bg-red-700 dark:hover:bg-red-500 active:scale-[0.98]"
            >
              <Home className="h-4 w-4" />
              <span>Take Me Home</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="relative mt-12 w-full lg:mt-0 lg:w-1/2 flex justify-center items-center">
          {/* Subtle image backing glow */}
          <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-red-200 to-rose-200 dark:from-red-950/40 dark:to-slate-900/20 blur-[80px] rounded-full opacity-50 pointer-events-none" />
          
          <Image
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl relative transform transition-transform duration-700 hover:scale-[1.02] drop-shadow-xl"
            src="https://merakiui.com/images/components/illustration.svg"
            alt="Page not found illustration"
            width={600}
            height={600}
            priority
          />
        </div>

      </div>
    </section>
  );
}