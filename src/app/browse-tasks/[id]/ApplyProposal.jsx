"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Input, TextArea } from "@heroui/react";

export default function ApplyProposal({ task }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState({
    budget: "",
    deliveryDate: "",
    message: "",
  });

  const submitProposal = async () => {
    try {
      if (!user) return toast.error("Please login first");

      if (user.role !== "freelancer") {
        return toast.error("Only freelancers can apply");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/proposals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskId: task._id,

            // ✅ auto filled (NOT user input)
            freelancerId: user.id,
            freelancerEmail: user.email,
            freelancerName: user.name,

            budget: form.budget,
            deliveryDate: form.deliveryDate,
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

  if (!user) {
    return (
      <div className="p-4 text-center border rounded-lg bg-gray-50">
        <p className="mb-2">You need to login first</p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-linear-to-r from-[#678d58] to-[#74d3ae] text-white hover:opacity-90 px-4 py-2 rounded"
        >
          Sign in
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
    <div className="space-y-3 grid">

      {/* 🔥 FREELANCER INFO (READ ONLY UI) */}
      <div className="text-sm p-3 border rounded bg-gray-50">
        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>
      </div>

      <Input
        type="number"
        min="1"
        value={form.budget}
        placeholder="Your Budget"
        onChange={(e) =>
          setForm({ ...form, budget: e.target.value })
        }
      />

      <Input
        type="date"
        value={form.deliveryDate}
        onChange={(e) =>
          setForm({ ...form, deliveryDate: e.target.value })
        }
      />

      <TextArea
        placeholder="Cover message"
        value={form.message}
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
      />

      <button
        onClick={submitProposal}
        className="w-full bg-linear-to-r from-[#678d58] to-[#74d3ae] text-white py-2 rounded hover:opacity-90"
      >
        Submit Proposal
      </button>

    </div>
  );
}