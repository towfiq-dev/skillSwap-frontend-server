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

  // Load proposals
  const loadProposals = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proposals/${taskId}`
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

  // Load task (IMPORTANT for payment lock)
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

  // Accept → Stripe checkout
  const goToCheckout = async (proposal) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

  // Reject proposal
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

  // Auth guard
  if (!user || user.role !== "client") {
    return (
      <div className="p-6 text-center text-red-500">
        Only clients can view proposals
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="p-6 animate-pulse text-gray-500">
        Loading proposals...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Manage Proposals
      </h1>

      {/* Task status banner */}
      {task && (
        <div className="mb-4 p-3 rounded bg-gray-100 text-sm">
          <b>Task Status:</b>{" "}
          <span className="font-semibold">{task.status}</span>
        </div>
      )}

      <div className="space-y-4">
        {proposals.map((p) => (
          <div
            key={p._id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <p>
              <b>Freelancer Name:</b> {p.freelancerName || "N/A"}
            </p>

            <p>
              <b>Freelancer Email:</b> {p.freelancerEmail}
            </p>

            <p>
              <b>Budget:</b> ${p.budget}
            </p>

            <p>
              <b>Delivery:</b>{" "}
              {new Date(p.deliveryDate).toDateString()}
            </p>

            <p>
              <b>Message:</b> {p.message}
            </p>

            {/* STATUS */}
            <p>
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

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4">

              {/* Accept & Pay (ONLY if not locked) */}
              {!isLocked && p.status === "pending" && (
                <button
                  onClick={() => goToCheckout(p)}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Accept & Pay
                </button>
              )}

              {/* Reject (ONLY if not locked) */}
              {!isLocked && p.status === "pending" && (
                <button
                  onClick={() => rejectProposal(p._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  Reject
                </button>
              )}

              {/* After payment UI */}
              {isLocked && p.status === "accepted" && (
                <span className="text-green-700 font-semibold">
                  Paid & Assigned
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}