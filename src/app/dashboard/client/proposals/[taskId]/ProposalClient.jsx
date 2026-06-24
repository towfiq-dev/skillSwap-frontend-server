"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function ProposalClient({ taskId }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [proposals, setProposals] = useState([]);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProposals = async () => {
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proposals/${taskId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProposals(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadTask = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${taskId}`
      );
      const data = await res.json();
      setTask(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (taskId) {
      loadProposals();
      loadTask();
    }
  }, [taskId]);

  const isLocked =
    task?.status === "in progress" || task?.status === "awaiting_payment";

  const goToCheckout = async (proposal) => {
    try {
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({
            proposalId: proposal._id,
            amount: proposal.budget,
            clientEmail: user.email,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.url;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const rejectProposal = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proposals/reject/${id}`,
        { method: "PATCH" }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Proposal updated successfully");
      loadProposals();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!user || user.role !== "client") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6 bg-slate-50/40">
        <div className="max-w-md rounded-2xl border border-rose-100 bg-white p-6 text-center shadow-xl shadow-rose-100/40">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500 text-xl">🔒</div>
          <h3 className="mt-4 text-base font-bold text-slate-900">Access Restricted</h3>
          <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">Only verified clients are authorized to view proposals for this resource.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50/30">
        <div className="flex flex-col items-center gap-4">
          <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-slate-200 border-t-[#678d58]"></div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Loading Workspace</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-7xl">
        
        {/* মিনিমালিস্ট টপ বার */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Proposals Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage incoming bids, vet details, and initiate project deposits.
            </p>
          </div>

          {task && (
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white px-4 py-1.5 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Status:</span>
              <span className="text-xs font-bold text-slate-800 capitalize bg-slate-100 px-2 py-0.5 rounded-md">{task.status}</span>
            </div>
          )}
        </div>

        {proposals.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-20 text-center max-w-xl mx-auto shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-2xl mb-4 shadow-inner">📬</div>
            <h2 className="text-lg font-bold text-slate-900">Waiting for applications</h2>
            <p className="mt-1 max-w-xs text-sm text-slate-400 leading-relaxed">
              No applications have been sent yet. Verified specialist bids will populate this view automatically.
            </p>
          </div>
        ) : (
          
          /* আল্ট্রা-প্রিমিয়াম টেবিল কন্টেইনার */
          <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/30">
            <div className="px-6 py-5 border-b border-slate-100 bg-white">
              <h3 className="font-bold text-slate-800 text-sm tracking-tight">Client Proposals for Task</h3>
            </div>

            {/* ডেস্কটপ ভিউ */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs text-slate-500">
                <thead className="bg-slate-50/70 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4.5 font-semibold">Freelancer</th>
                    <th className="px-6 py-4.5 font-semibold">Proposal Message (Snippet)</th>
                    <th className="px-6 py-4.5 font-semibold">Bid & Timeline</th>
                    <th className="px-6 py-4.5 font-semibold">Status</th>
                    <th className="px-6 py-4.5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/70">
                  {proposals.map((p) => {
                    const statusConfig = 
                      p.status === "accepted" ? "bg-emerald-50/60 text-emerald-700 border-emerald-100" :
                      p.status === "rejected" ? "bg-rose-50/60 text-rose-700 border-rose-100" :
                      "bg-amber-50/70 text-amber-700 border-amber-200/60";

                    return (
                      <tr key={p._id} className="hover:bg-slate-50/40 transition-colors duration-150">
                        {/* ফ্রিল্যান্সার প্রোফাইল */}
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-50 to-slate-100 text-xs font-bold text-slate-600 border border-slate-200 uppercase shadow-inner">
                                {p.freelancerName ? p.freelancerName[0] : "F"}
                              </div>
                              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{p.freelancerName || "Specialist"}</div>
                              <div className="text-[11px] text-slate-400 mt-0.5 tracking-tight">{p.freelancerEmail}</div>
                            </div>
                          </div>
                        </td>

                        {/* মেসেজ বডি */}
                        <td className="px-6 py-5 max-w-sm">
                          <p className="text-slate-600 font-normal leading-relaxed line-clamp-2 text-sm pr-4">
                            {p.message}
                          </p>
                        </td>

                        {/* বাজেট ও টাইমলাইন */}
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="font-bold text-slate-900 text-base">${p.budget}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{p.estimatedDays} days delivery</div>
                        </td>

                        {/* স্ট্যাটাস ব্যাজ */}
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 font-medium tracking-tight ${statusConfig}`}>
                            {p.status}
                          </span>
                        </td>

                        {/* অ্যাকশন বাটনসমূহ */}
                        <td className="px-6 py-5 whitespace-nowrap text-right">
                          {!isLocked && p.status === "pending" && (
                            <div className="flex justify-end items-center gap-2.5">
                              <button
                                onClick={() => rejectProposal(p._id)}
                                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all duration-200"
                              >
                                Decline
                              </button>
                              <button
                                onClick={() => goToCheckout(p)}
                                className="rounded-xl bg-[#678d58] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[#678d58]/10 hover:bg-[#57784a] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                              >
                                Accept & Pay
                              </button>
                            </div>
                          )}

                          {isLocked && p.status === "accepted" && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50/50 px-3 py-1.5 rounded-xl border border-emerald-100">
                              🛡️ Secured & Assigned
                            </span>
                          )}

                          {((isLocked && p.status !== "accepted") || (!isLocked && p.status !== "pending")) && (
                            <span className="text-[11px] text-slate-300 italic tracking-tight">Archived state</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* মোবাইল ফ্রেন্ডলি কার্ড লেআউট */}
            <div className="block md:hidden divide-y divide-slate-100">
              {proposals.map((p) => {
                const statusConfig = 
                  p.status === "accepted" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                  p.status === "rejected" ? "bg-rose-50 text-rose-700 border-rose-100" :
                  "bg-amber-50 text-amber-700 border-amber-200/60";

                return (
                  <div key={p._id} className="p-5 space-y-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-xs font-bold text-slate-600 border border-slate-200 uppercase">
                          {p.freelancerName ? p.freelancerName[0] : "F"}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{p.freelancerName || "Specialist"}</h4>
                          <span className="text-[10px] text-slate-400 block tracking-tight">{p.freelancerEmail}</span>
                        </div>
                      </div>
                      <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-[11px] font-medium ${statusConfig}`}>
                        {p.status}
                      </span>
                    </div>

                    <div className="bg-slate-50/70 p-3.5 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">Bid Total</span>
                        <span className="font-extrabold text-slate-900 text-sm">${p.budget}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-0.5">Timeline</span>
                        <span className="font-bold text-slate-800 text-xs">{p.estimatedDays} Days</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/30 p-3.5 rounded-xl border border-slate-100/60">
                      "{p.message}"
                    </p>

                    <div className="pt-1">
                      {!isLocked && p.status === "pending" && (
                        <div className="flex gap-2.5">
                          <button
                            onClick={() => rejectProposal(p._id)}
                            className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-600 active:bg-slate-50 transition-all"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => goToCheckout(p)}
                            className="flex-2 rounded-xl bg-[#678d58] py-2.5 text-xs font-semibold text-white text-center shadow-md shadow-[#678d58]/10 active:opacity-95 transition-all"
                          >
                            Accept & Pay
                          </button>
                        </div>
                      )}

                      {isLocked && p.status === "accepted" && (
                        <div className="w-full text-center text-xs font-bold text-emerald-700 bg-emerald-50/50 border border-emerald-100 py-2.5 rounded-xl">
                          🛡️ Paid & Project Assigned
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}