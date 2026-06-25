"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const DollarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const categoryColors = {
  Design:      { bg: "bg-violet-50",  text: "text-violet-700",  border: "border-violet-200"  },
  Writing:     { bg: "bg-sky-50",     text: "text-sky-700",     border: "border-sky-200"     },
  Development: { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200"   },
  Marketing:   { bg: "bg-pink-50",    text: "text-pink-700",    border: "border-pink-200"    },
  Video:       { bg: "bg-orange-50",  text: "text-orange-700",  border: "border-orange-200"  },
};

const getCategoryStyle = (cat) =>
  categoryColors[cat] ?? { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" };

const SkeletonCard = () => (
  <div className="flex flex-col rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
    <div className="h-1 w-full bg-slate-100" />
    <div className="flex flex-col gap-3 p-5">
      <div className="flex justify-between">
        <div className="h-5 w-20 animate-pulse rounded-full bg-slate-100" />
        <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
      </div>
      <div className="h-5 w-3/4 animate-pulse rounded-lg bg-slate-100" />
      <div className="h-4 w-1/2 animate-pulse rounded-lg bg-slate-100" />
      <div className="h-4 w-1/3 animate-pulse rounded-lg bg-slate-100" />
      <div className="mt-2 h-px w-full bg-slate-100" />
      <div className="h-10 w-full animate-pulse rounded-xl bg-slate-100" />
    </div>
  </div>
);

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/featured-tasks`);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-3 h-6 w-44 animate-pulse rounded-full bg-slate-100" />
            <div className="mx-auto h-4 w-56 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </section>
    );
  }

  if (!tasks.length) {
    return (
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-2xl">
            📭
          </div>
          <p className="text-sm font-semibold text-slate-500">No featured tasks right now</p>
          <p className="text-xs text-slate-400">Check back soon — new tasks are posted daily.</p>
          <Link
            href="/browse-tasks"
            className="mt-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
          >
            Browse all tasks →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-14 px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center sm:mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Featured Tasks
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl lg:text-4xl">
            Latest Featured Tasks
          </h2>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Discover high-quality tasks from real clients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {tasks.map((task, index) => {
            const cat = getCategoryStyle(task.category);
            const initials = (task.clientName || "A")[0].toUpperCase();
            const deadline = task.deadline
              ? new Date(task.deadline).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
              : "No deadline";

            return (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.38, delay: index * 0.055 }}
                whileHover={{ y: -5 }}
                className="group flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-200/60 overflow-hidden"
              >
                <div className="h-1 w-full bg-gradient-to-r from-[#1b4332] to-[#52b788]" />

                <div className="flex flex-1 flex-col p-5 sm:p-6">

                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${cat.bg} ${cat.text} ${cat.border}`}>
                      {task.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                      <span className="text-emerald-600"><DollarIcon /></span>
                      ${task.budget}
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-800 transition-colors group-hover:text-[#1b4332] sm:text-[17px]">
                    {task.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1b4332] to-[#52b788] text-[10px] font-bold text-white">
                      {initials}
                    </div>
                    <p className="text-xs text-slate-400">
                      Posted by{" "}
                      <span className="font-semibold text-slate-600">
                        {task.clientName || "Anonymous"}
                      </span>
                    </p>
                  </div>

                  <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="text-slate-300"><CalendarIcon /></span>
                    <span>{deadline}</span>
                  </div>

                  <div className="flex-1" />
                  <div className="my-4 h-px w-full bg-slate-100" />

                  <Link href={`/browse-tasks/${task._id}`} className="block">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="group/btn flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1b4332] to-[#40916c] text-sm cursor-pointer font-semibold text-white shadow-sm shadow-emerald-900/20 transition-all duration-200 hover:shadow-md hover:shadow-emerald-900/25 hover:brightness-110"
                    >
                      <span>View Details</span>
                      <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">
                        <ArrowIcon />
                      </span>
                    </motion.button>
                  </Link>

                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-10 text-center sm:mt-12"
        >
          <Link
            href="/browse-tasks"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700  cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
          >
            Browse all tasks
            <span className="text-emerald-500"><ArrowIcon /></span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedTasks;