"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PublicBrowseTasks() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

  // ── FETCH ──
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/browse-tasks?page=${page}&limit=9&search=${debouncedSearch}&category=${category}`
        );
        const data = await res.json();
        setTasks(data.tasks);
        setTotalPages(data.totalPages);
        setTotalTasks(data.total);
      } catch (error) {
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [page, debouncedSearch, category]);

  const handleSearch = () => {
    setDebouncedSearch(searchTerm);
    setPage(1);
  };

  const handleClearAll = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    setCategory("All");
    setPage(1);
  };

  const categories = [
    { value: "All", label: "All Categories" },
    { value: "Design", label: "🎨 Design" },
    { value: "Writing", label: "✍️ Writing" },
    { value: "Development", label: "💻 Development" },
    { value: "Marketing", label: "📢 Marketing" },
    { value: "Video Editing", label: "🎬 Video Editing" },
    { value: "Data Entry", label: "📊 Data Entry" },
    { value: "Other", label: "📦 Other" },
  ];

  // ── LOADING ──
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#f7f9f7]">
        <div className="w-full bg-gradient-to-br from-slate-950 via-[#1a2e1a] to-slate-900 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-3 h-5 w-36 animate-pulse rounded-full bg-white/10" />
            <div className="mx-auto mb-2 h-8 w-64 animate-pulse rounded-xl bg-white/10 sm:h-10 sm:w-80" />
            <div className="mx-auto h-4 w-48 animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 h-14 w-full animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="h-1 w-full bg-slate-100" />
                <div className="p-5 sm:p-6">
                  <div className="mb-3 flex justify-between">
                    <div className="h-5 w-20 animate-pulse rounded-full bg-slate-100" />
                    <div className="h-5 w-14 animate-pulse rounded-full bg-slate-100" />
                  </div>
                  <div className="mb-2 h-5 w-3/4 animate-pulse rounded-lg bg-slate-100" />
                  <div className="mb-1 h-3 w-full animate-pulse rounded bg-slate-100" />
                  <div className="mb-4 h-3 w-5/6 animate-pulse rounded bg-slate-100" />
                  <div className="mt-5 h-9 w-full animate-pulse rounded-xl bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f7f9f7]">

      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-[#1a2e1a] to-slate-900 px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-18 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl sm:h-72 sm:w-72" />
        <div className="pointer-events-none absolute -bottom-10 right-0 h-48 w-48 rounded-full bg-emerald-700/10 blur-3xl sm:h-64 sm:w-64" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-2xl text-center text-white"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 sm:px-4 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {totalTasks} tasks available
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Browse{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              Jobs
            </span>
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            Find the perfect task that matches your skills
          </p>
        </motion.div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

        {/* ── SEARCH + FILTER ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:flex-row sm:gap-3 sm:p-4"
        >
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-24 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15 sm:h-11"
            />
            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(""); setDebouncedSearch(""); setPage(1); }}
                className="absolute right-[4.5rem] top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition text-lg leading-none"
              >
                ×
              </button>
            )}
            <button
              onClick={handleSearch}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 rounded-lg bg-gradient-to-r from-[#678d58] to-emerald-400 px-3 text-xs font-semibold text-white transition hover:brightness-105 sm:h-8"
            >
              Search
            </button>
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15 sm:h-11 sm:w-auto sm:min-w-[180px]"
          >
            {categories.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </motion.div>

        {/* ── RESULTS META ── */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 sm:text-sm">
          <p>
            <span className="font-semibold text-slate-600">{tasks.length}</span> tasks on page{" "}
            <span className="font-semibold text-slate-600">{page}</span> of{" "}
            <span className="font-semibold text-slate-600">{totalPages}</span>
          </p>
          {(category !== "All" || debouncedSearch) && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 hover:border-red-200 hover:text-red-500 transition"
            >
              Clear all ×
            </button>
          )}
        </div>

        {/* ── EMPTY STATE ── */}
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-6 py-16 text-center shadow-sm sm:py-20"
          >
            <div className="mb-4 text-5xl">🔍</div>
            <h2 className="text-lg font-bold text-slate-700 sm:text-xl">No matching tasks found</h2>
            <p className="mt-2 text-sm text-slate-400">Try adjusting your search or category filter</p>
            <button
              onClick={handleClearAll}
              className="mt-5 rounded-xl bg-gradient-to-r from-[#678d58] to-emerald-400 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
                whileHover={{ y: -4 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[#678d58] to-[#74d3ae]" />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 sm:text-xs">
                      {task.category}
                    </span>
                    <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 sm:text-xs">
                      💰 ${task.budget}
                    </span>
                  </div>

                  <h2 className="line-clamp-2 text-base font-bold leading-snug text-slate-800 transition-colors group-hover:text-[#678d58] sm:text-lg">
                    {task.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                    {task.description}
                  </p>

                  <div className="mt-3 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#678d58] to-emerald-400 text-[9px] font-bold text-white">
                        {(task.clientName || "A")[0].toUpperCase()}
                      </div>
                      <p className="text-xs text-slate-400">
                        <span className="font-medium text-slate-600">{task.clientName || "Anonymous"}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <span>📅</span>
                      <span>
                        {task.deadline
                          ? new Date(task.deadline).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                          : "No deadline"}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1" />
                  <div className="my-4 h-px w-full bg-slate-100" />

                  <Link href={`/browse-tasks/${task._id}`} className="block">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      className="w-full rounded-xl bg-gradient-to-r from-[#678d58] to-[#74d3ae] py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition-all hover:brightness-105 hover:shadow-md"
                    >
                      View Details →
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12"
          >
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm transition hover:border-emerald-300 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10"
            >
              ← Prev
            </button>

            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[...Array(totalPages)].map((_, i) => {
                const p = i + 1;
                const isActive = page === p;
                const show = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
                const showDots = !show && (p === page - 2 || p === page + 2);

                if (showDots) return (
                  <span key={p} className="flex h-9 w-6 items-center justify-center text-xs text-slate-400 sm:h-10">…</span>
                );
                if (!show) return null;

                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-semibold transition sm:h-10 sm:w-10 ${
                      isActive
                        ? "border-emerald-400 bg-gradient-to-br from-[#678d58] to-emerald-400 text-white shadow-sm shadow-emerald-200"
                        : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm transition hover:border-emerald-300 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10"
            >
              Next →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}