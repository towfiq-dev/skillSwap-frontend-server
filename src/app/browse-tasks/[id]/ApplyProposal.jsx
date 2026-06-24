"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function ApplyProposal({ task }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session, isLoading } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    budget: "",
    estimatedDays: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submitProposal = async (e) => {
    e.preventDefault();

    if (!form.budget || !form.estimatedDays || !form.message) {
      return toast.error("Please fill all fields");
    }

    try {
      if (!user) return toast.error("Please login first");
      if (user.role !== "freelancer") return toast.error("Only freelancers can apply");

      setSubmitting(true);

      const { data: tokenData } = await authClient.token();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/proposals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify({
          taskId: task?._id,
          taskTitle: task?.title,
          freelancerId: user.id,
          freelancerEmail: user.email,
          freelancerName: user.name,
          budget: form.budget,
          estimatedDays: form.estimatedDays,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Proposal submitted!");
      setForm({ budget: "", estimatedDays: "", message: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  // ── LOADING ──
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="h-5 w-40 animate-pulse rounded-lg bg-slate-100" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-100" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-100" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-100" />
        <div className="h-24 w-full animate-pulse rounded-xl bg-slate-100" />
        <div className="h-11 w-full animate-pulse rounded-xl bg-slate-100" />
      </div>
    );
  }

  // ── NOT LOGGED IN ──
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
          🔒
        </div>
        <div>
          <p className="font-semibold text-slate-700">Login required</p>
          <p className="mt-1 text-sm text-slate-400">You need to sign in to submit a proposal</p>
        </div>
        <button
          onClick={() => (window.location.href = "/login")}
          className="w-full rounded-xl bg-gradient-to-r from-[#678d58] to-[#74d3ae] py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 hover:-translate-y-0.5 sm:w-auto sm:px-8"
        >
          Sign in to apply
        </button>
      </div>
    );
  }

  // ── NOT A FREELANCER ──
  if (user.role !== "freelancer") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-6 text-center sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-xl">
          🚫
        </div>
        <p className="text-sm font-semibold text-red-600">Only freelancers can apply for tasks.</p>
      </div>
    );
  }

  // ── FORM ──
  return (
    <form onSubmit={submitProposal} className="flex flex-col gap-4">

      {/* ── Freelancer info card ── */}
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-[#74d3ae]/10 p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#678d58] to-emerald-400 text-xs font-bold text-white">
            {(user?.name || "F")[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-700">{user?.name}</p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
          <span className="ml-auto shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
            Freelancer
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between rounded-xl border border-white/80 bg-white px-3.5 py-2.5 sm:px-4">
            <span className="text-xs text-slate-400">Task</span>
            <span className="ml-4 max-w-[60%] truncate text-right text-xs font-semibold text-slate-700">
              {task?.title || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/80 bg-white px-3.5 py-2.5 sm:px-4">
            <span className="text-xs text-slate-400">Task ID</span>
            <span className="font-mono text-xs font-medium text-slate-500">{task?._id}</span>
          </div>
        </div>
      </div>

      {/* ── Budget + Days row ── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
            Proposed budget (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">$</span>
            <input
              type="number"
              min="1"
              required
              value={form.budget}
              onChange={set("budget")}
              placeholder="0"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-7 pr-4 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15 sm:h-11"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
            Estimated days
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              required
              value={form.estimatedDays}
              onChange={set("estimatedDays")}
              placeholder="0"
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pr-14 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15 sm:h-11"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">days</span>
          </div>
        </div>
      </div>

      {/* ── Cover note ── */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
          Cover note
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={set("message")}
          placeholder="Introduce yourself and explain why you're the best fit for this task..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15"
        />
        <p className="text-right text-[11px] text-slate-300">
          {form.message.length} chars
        </p>
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={submitting}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:h-12"
      >
        {submitting ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Submitting…
          </>
        ) : (
          <>🚀 Submit Proposal</>
        )}
      </button>

    </form>
  );
}