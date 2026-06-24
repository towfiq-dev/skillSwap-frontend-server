"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Input, TextArea } from "@heroui/react";

export default function ApplyProposal({ task }) {
  // 🔥 FIX 1: prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 🔥 FIX 2: correct loading state name (most auth libs use isLoading)
  const { data: session, isLoading } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    budget: "",
    estimatedDays: "",
    message: "",
  });

  const submitProposal = async (e) => {
    e.preventDefault();

    if (!form.budget || !form.estimatedDays || !form.message) {
      return toast.error("Please fill all fields");
    }

    try {
      if (!user) return toast.error("Please login first");

      if (user.role !== "freelancer") {
        return toast.error("Only freelancers can apply");
      }
     const {data:tokenData} = await authClient.token()
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proposals`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
 

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
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Proposal submitted!");

      setForm({
        budget: "",
        estimatedDays: "",
        message: "",
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  // 🔥 FIX 3: prevent SSR/client mismatch
  if (!mounted) return null;

  // 🔥 FIX 4: safe loading UI (no DOM mismatch)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">

          <div className="relative">
            <div className="h-14 w-14 rounded-full border-4 border-gray-200"></div>
            <div className="h-14 w-14 rounded-full border-4 border-t-[#678d58] border-r-transparent border-b-transparent border-l-transparent animate-spin absolute top-0 left-0"></div>
          </div>

          <p className="text-gray-600 font-medium">
            Loading...
          </p>

        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 text-center border rounded-lg bg-gray-50">
        <p className="mb-2">You need to login first</p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white hover:opacity-90 px-4 py-2 rounded-full"
        >
          Login
        </button>
      </div>
    );
  }

  if (user.role !== "freelancer") {
    return (
      <div className="p-4 text-center border rounded-lg bg-red-50 text-red-600">
        Only freelancers can apply for this task.
      </div>
    );
  }

  return (
    <form onSubmit={submitProposal} className="space-y-5">

      {/* Freelancer Info */}
      <div className="rounded-2xl border border-[#74d3ae]/20 bg-gradient-to-r from-[#678d58]/5 to-[#74d3ae]/10 p-5">

        <h3 className="font-semibold text-lg mb-4 text-gray-800">
          Freelancer Information
        </h3>

        <div className="space-y-3">

          <div className="flex justify-between items-center bg-white rounded-xl px-4 py-3 border">
            <span className="text-gray-500">Task ID</span>
            <span className="font-mono text-sm font-medium">
              {task?._id}
            </span>
          </div>

          <div className="flex justify-between items-center bg-white rounded-xl px-4 py-3 border">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-sm">
              {user?.email}
            </span>
          </div>

        </div>
      </div>

      {/* Budget */}
      <Input
        type="number"
        className="w-full"
        min="1"
        required
        value={form.budget}
        placeholder="Proposed Budget"
        onChange={(e) =>
          setForm({ ...form, budget: e.target.value })
        }
      />

      {/* Days */}
      <Input
      className="w-full"
        type="number"
        min="1"
        required
        value={form.estimatedDays}
        placeholder="Estimated Days"
        onChange={(e) =>
          setForm({ ...form, estimatedDays: e.target.value })
        }
      />

      {/* Message */}
      <TextArea
        required
        className="w-full"
        rows={3}
        value={form.message}
        placeholder="Cover note..."
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white font-semibold py-3 rounded-full"
      >
        🚀 Submit Proposal
      </button>

    </form>
  );
}