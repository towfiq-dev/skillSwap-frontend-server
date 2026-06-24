"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/featured-tasks`
        );
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-3 h-6 w-48 animate-pulse rounded-full bg-slate-200" />
            <div className="mx-auto h-4 w-64 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="mb-3 h-5 w-3/4 animate-pulse rounded-lg bg-slate-100" />
                <div className="mb-2 h-3 w-1/2 animate-pulse rounded-lg bg-slate-100" />
                <div className="mb-4 h-3 w-1/3 animate-pulse rounded-full bg-slate-100" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-slate-100" />
                  <div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
                </div>
                <div className="mt-5 h-9 w-full animate-pulse rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!tasks.length) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-slate-400">No featured tasks available right now.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-14 px-4 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-600 sm:text-xs">
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

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {tasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
              className="group flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg overflow-hidden"
            >
              {/* ── TOP COLOR ACCENT ── */}
              <div className="h-1 w-full bg-gradient-to-r from-[#678d58] to-[#74d3ae]" />

              <div className="flex flex-1 flex-col p-5 sm:p-6">

                {/* CATEGORY + BUDGET row */}
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 sm:text-xs">
                    {task.category}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 sm:text-xs">
                    💰 ${task.budget}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="line-clamp-2 text-base font-bold leading-snug text-slate-800 group-hover:text-[#678d58] transition-colors sm:text-lg">
                  {task.title}
                </h3>

                {/* CLIENT */}
                <div className="mt-2.5 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#678d58] to-emerald-400 text-[10px] font-bold text-white">
                    {(task.clientName || "A")[0].toUpperCase()}
                  </div>
                  <p className="text-xs text-slate-400">
                    Posted by{" "}
                    <span className="font-semibold text-slate-600">
                      {task.clientName || "Anonymous"}
                    </span>
                  </p>
                </div>

                {/* DEADLINE */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                  <span>📅</span>
                  <span>
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })
                      : "No deadline"}
                  </span>
                </div>

                {/* SPACER */}
                <div className="flex-1" />

                {/* DIVIDER */}
                <div className="my-4 h-px w-full bg-slate-100" />

                {/* BUTTON */}
                <Link href={`/browse-tasks/${task._id}`} className="block">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-xl bg-gradient-to-r from-[#678d58] to-[#74d3ae] py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition-all duration-200 hover:shadow-md hover:shadow-emerald-200 hover:brightness-105"
                  >
                    View Details →
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── VIEW ALL LINK ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 text-center sm:mt-12"
        >
          <Link
            href="/browse-tasks"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Browse all tasks
            <span className="text-emerald-500">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedTasks;