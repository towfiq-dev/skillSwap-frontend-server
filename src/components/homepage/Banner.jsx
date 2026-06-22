"use client";

import Link from "next/link";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#1a3a2a] to-[#0d2b22] min-h-[420px] flex items-center">

      {/* Background Orbs */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-[#678d58]/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-80px] right-[10%] h-80 w-80 rounded-full bg-[#74d3ae]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-40px] top-1/4 h-48 w-48 rounded-full bg-[#dd9787]/15 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 lg:py-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">

          {/* ── LEFT ── */}
          <div className="w-full lg:max-w-[560px]">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#74d3ae]/35 bg-[#74d3ae]/10 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#74d3ae]" />
              <span className="text-xs font-medium text-[#74d3ae]">
                Work with the world&apos;s best freelancers
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[52px]">
              Find Your{" "}
              <span className="bg-gradient-to-r from-[#678d58] to-[#74d3ae] bg-clip-text text-transparent">
                Dream Project
              </span>
              <br className="hidden sm:block" />
              {" "}Right Here
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-lg text-base leading-relaxed text-white/60">
              Thousands of skilled freelancers are ready to help you on SkillSwap.
              Post a task, receive proposals, and hire the perfect freelancer — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/client/tasks/new"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#678d58] to-[#74d3ae] px-7 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Post a Task
              </Link>

              <Link
                href="/browse-freelancers"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/7 px-6 py-3 text-sm font-medium text-white/85 backdrop-blur-sm transition-all duration-200 hover:bg-white/12 hover:-translate-y-0.5 active:scale-95"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                Browse Freelancers
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-6 border-t border-white/10 pt-8">
              {[
                { num: "12K+", label: "Freelancers" },
                { num: "35K+", label: "Tasks Completed" },
                { num: "98%",  label: "Happy Clients" },
              ].map(({ num, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-2xl font-bold text-[#74d3ae]">{num}</span>
                  <span className="mt-0.5 text-[11px] uppercase tracking-widest text-white/40">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — floating cards ── */}
          <div className="hidden lg:flex lg:items-center lg:justify-center">
            <div className="relative h-[280px] w-[230px]">

              {/* Card 1 */}
              <div className="absolute left-0 top-0 w-[185px] animate-[float_3.5s_ease-in-out_infinite] rounded-2xl border border-white/12 bg-white/7 p-4 backdrop-blur-md">
                <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">New Task</p>
                <p className="mb-2 text-sm font-semibold text-white">Logo Design Project</p>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#74d3ae]/20 px-2.5 py-0.5 text-[10px] text-[#74d3ae]">Design</span>
                  <span className="text-xs font-semibold text-[#74d3ae]">$60</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="absolute left-10 top-[90px] w-[185px] animate-[float_4s_0.5s_ease-in-out_infinite] rounded-2xl border border-white/12 bg-white/7 p-4 backdrop-blur-md">
                <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">Top Freelancer</p>
                <p className="mb-2 text-sm font-semibold text-white">Rahim — Web Dev</p>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#dd9787]/20 px-2.5 py-0.5 text-[10px] text-[#dd9787]">⭐ 4.9</span>
                  <span className="text-xs font-semibold text-[#74d3ae]">$10/hr</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="absolute left-2 top-[178px] w-[185px] animate-[float_3.2s_1s_ease-in-out_infinite] rounded-2xl border border-white/12 bg-white/7 p-4 backdrop-blur-md">
                <p className="mb-1 text-[10px] uppercase tracking-wider text-white/40">Completed</p>
                <p className="mb-2 text-sm font-semibold text-white">App UI Completed ✓</p>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#74d3ae]/20 px-2.5 py-0.5 text-[10px] text-[#74d3ae]">React</span>
                  <span className="text-xs font-semibold text-[#74d3ae]">$180</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
