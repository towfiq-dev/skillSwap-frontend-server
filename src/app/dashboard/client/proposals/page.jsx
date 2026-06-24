"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ClientProposalsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tasks?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load tasks");
        setLoading(false);
      });
  }, [user]);

  const getCategoryEmoji = (category) => {
    const map = {
      Design: "🎨", Development: "💻", Writing: "✍️",
      Marketing: "📢", "Video Editing": "🎥", "Data Entry": "📊", Other: "🧩",
    };
    return map[category] || "📁";
  };

  const statusConfig = {
    open:              { label: "Open",             cls: "bg-emerald-50 text-emerald-700 border-emerald-200",  dot: "bg-emerald-500" },
    "in progress":     { label: "In Progress",      cls: "bg-amber-50 text-amber-700 border-amber-200",        dot: "bg-amber-500" },
    awaiting_payment:  { label: "Awaiting Payment", cls: "bg-sky-50 text-sky-700 border-sky-200",              dot: "bg-sky-500" },
    completed:         { label: "Completed",        cls: "bg-slate-100 text-slate-600 border-slate-200",       dot: "bg-slate-400" },
  };

  const getStatus = (status) =>
    statusConfig[status] || { label: status, cls: "bg-slate-50 text-slate-500 border-slate-200", dot: "bg-slate-400" };

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <p className="text-sm text-slate-400">Login required</p>
      </div>
    );
  }

  // ── LOADING ──
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#f7f9f7] p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <div className="mb-2 h-7 w-48 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-4 w-64 animate-pulse rounded-lg bg-slate-100" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              <div className="h-1 w-full bg-slate-100" />
              <div className="p-5">
                <div className="mb-3 h-5 w-3/4 animate-pulse rounded-lg bg-slate-100" />
                <div className="mb-4 flex gap-2">
                  <div className="h-5 w-20 animate-pulse rounded-full bg-slate-100" />
                  <div className="h-5 w-24 animate-pulse rounded-full bg-slate-100" />
                </div>
                <div className="h-4 w-28 animate-pulse rounded-full bg-slate-100" />
                <div className="mt-5 h-9 w-full animate-pulse rounded-xl bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f7f9f7]">

      {/* ── HEADER ── */}
      <div className="border-b border-slate-100 bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 sm:text-xs">
                Client Dashboard
              </p>
              <h1 className="mt-0.5 text-xl font-bold text-slate-800 sm:text-2xl lg:text-3xl">
                Manage Proposals
              </h1>
              <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
                Review proposals submitted to your tasks
              </p>
            </div>
            {tasks.length > 0 && (
              <div className="mt-3 flex items-center gap-2 sm:mt-0">
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
                  {tasks.length} task{tasks.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* ── EMPTY STATE ── */}
        {tasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-6 py-16 text-center shadow-sm sm:py-24"
          >
            <div className="mb-4 text-5xl sm:text-6xl">📭</div>
            <h2 className="text-lg font-bold text-slate-700 sm:text-xl">No proposals yet</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Once freelancers start applying to your tasks, they will appear here.
            </p>
            <Link
              href="/dashboard/client/tasks"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#678d58] to-[#74d3ae] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              View My Tasks →
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {tasks.map((task) => {
              const status = getStatus(task.status);
              return (
                <motion.div
                  key={task._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                  }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  {/* top accent */}
                  <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[#678d58] to-[#74d3ae]" />

                  <div className="flex flex-1 flex-col p-5 sm:p-6">

                    {/* Category + Status */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 sm:text-xs">
                        {getCategoryEmoji(task.category)} {task.category}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:text-xs ${status.cls}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="line-clamp-2 text-base font-bold leading-snug text-slate-800 transition-colors group-hover:text-[#678d58] sm:text-lg">
                      {task.title}
                    </h2>

                    {/* Budget */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-slate-400">Budget</span>
                      <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                        💰 ${task.budget}
                      </span>
                    </div>

                    {/* Deadline */}
                    {task.deadline && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                        <span>📅</span>
                        <span>
                          {new Date(task.deadline).toLocaleDateString("en-US", {
                            year: "numeric", month: "short", day: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    <div className="flex-1" />
                    <div className="my-4 h-px w-full bg-slate-100" />

                    {/* CTA */}
                    <Link
                      href={`/dashboard/client/proposals/${task._id}`}
                      className="block w-full rounded-xl bg-gradient-to-r from-[#678d58] to-[#74d3ae] py-2.5 text-center text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition-all hover:brightness-105 hover:shadow-md"
                    >
                      View Proposals →
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}