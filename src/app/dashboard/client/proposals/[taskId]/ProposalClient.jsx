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
     const {data:tokenData} = await authClient.token()

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proposals/${taskId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`

          }
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
    loadProposals();
    loadTask();
  }, [taskId]);

  const isLocked =
    task?.status === "in progress" ||
    task?.status === "awaiting_payment";

  const goToCheckout = async (proposal) => {
    const {data:tokenData} = await authClient.token()

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json",
             authorization: `Bearer ${tokenData?.token}`

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

      toast.error("Proposal rejected!");
      loadProposals();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!user || user.role !== "client") {
    return (
      <div className="p-6 text-center text-red-500">
        Only clients can view proposals
      </div>
    );
  }

  if (loading) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          {/* Animated ring loader */}
          <div className="relative">
            <div className="h-14 w-14 rounded-full border-4 border-gray-200"></div>
            <div className="h-14 w-14 rounded-full border-4 border-t-[#678d58] border-r-transparent border-b-transparent border-l-transparent animate-spin absolute top-0 left-0"></div>
          </div>

          {/* Text */}
          <p className="text-gray-600 font-medium tracking-wide">
            Loading your tasks...
          </p>

          {/* subtle dots animation */}
          <div className="flex gap-1 mt-1">
            <span className="h-2 w-2 bg-[#678d58] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-[#678d58] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-[#678d58] rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl text-gray-800 font-bold mb-6">Manage Proposals</h1>

      {/* TASK STATUS */}
      {task && (
        <div className="mb-6 p-3 rounded-lg bg-white border text-sm">
          <b>Task Status:</b>{" "}
          <span className="font-semibold">{task.status}</span>
        </div>
      )}

      {/* EMPTY STATE */}
      {proposals.length === 0 ? (
        <div className="bg-white border rounded-2xl p-12 text-center shadow-sm">
          <div className="text-5xl mb-3">📭</div>
          <h2 className="text-xl font-semibold text-gray-800">
            No proposals yet
          </h2>
          <p className="text-gray-500 mt-2">
            Freelancers haven't applied to this task yet.
          </p>
        </div>
      ) : (
        /* GRID LAYOUT */
        <div className="grid md:grid-cols-3 gap-6">
          {proposals.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition flex flex-col"
            >
              <div className="flex-1 space-y-2">
                <h2 className="font-bold text-lg">
                  {p.freelancerName || "N/A"}
                </h2>

                <p className="text-sm text-gray-500">
                  📧 {p.freelancerEmail}
                </p>

                <p className="text-sm">
                  💰 <b>${p.budget}</b>
                </p>

                <p className="text-sm">
                  📅 {p.estimatedDays} days
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {p.message}
                </p>

                <p className="mt-2 text-sm">
                  <b>Status:</b>{" "}
                  <span
                    className={
                      p.status === "accepted"
                        ? "text-green-600"
                        : p.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }
                  >
                    {p.status}
                  </span>
                </p>
              </div>

              {/* ACTIONS (UNCHANGED LOGIC) */}
              <div className="flex gap-2 mt-5">
                {!isLocked && p.status === "pending" && (
                  <button
                    onClick={() => goToCheckout(p)}
                    className="rounded-full flex-1 px-3 py-2 bg-linear-to-r from-[#678d58] to-[#74d3ae] text-white"
                  >
                    Accept & Pay
                  </button>
                )}

                {!isLocked && p.status === "pending" && (
                  <button
                    onClick={() => rejectProposal(p._id)}
                    className="flex-1 px-3 py-2 bg-[#dd9787] text-white rounded-full"
                  >
                    Reject
                  </button>
                )}

                {isLocked && p.status === "accepted" && (
                  <span className="text-green-700 font-semibold">
                    Paid & Assigned
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}