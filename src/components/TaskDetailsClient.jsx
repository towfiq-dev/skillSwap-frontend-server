"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TaskDetailsClient({ id }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    budget: "",
    days: "",
    message: "",
  });

  useEffect(() => {
  if (!id) return;

  const fetchTask = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${id}`
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setTask(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchTask();
}, [id]);

  const submitProposal = async () => {
    try {
      if (!user) return toast.error("Login required");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proposals`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            taskId: id,
            freelancerId: user.id,
            freelancerEmail: user.email,
            budget: form.budget,
            days: form.days,
            message: form.message,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast.success("Proposal submitted!");
    } catch (err) {
      toast.error(err.message);
    }
  };
console.log("BASE URL:", process.env.NEXT_PUBLIC_BASE_URL);
console.log("TASK ID:", id);
  if (loading) {
    return <div className="p-10 animate-pulse">Loading task...</div>;
  }

  if (!task) {
    return <div className="p-10">Task not found</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="mt-3 text-gray-600">{task.description}</p>

      <div className="mt-6 space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Your Budget"
          onChange={(e) =>
            setForm({ ...form, budget: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Days to complete"
          onChange={(e) =>
            setForm({ ...form, days: e.target.value })
          }
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Cover message"
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button
          onClick={submitProposal}
          className="w-full bg-black text-white py-2 rounded"
        >
          Submit Proposal
        </button>
      </div>
    </div>
  );
}