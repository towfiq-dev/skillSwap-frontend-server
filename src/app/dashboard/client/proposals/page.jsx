"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

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

  if (!user) {
    return (
      <div className="p-6">
        <p>Login required</p>
      </div>
    );
  }
  const getCategoryEmoji = (category) => {
  const categories = {
    Design: "🎨",
    Development: "💻",
    Writing: "✍️",
    Marketing: "📢",
    "Video Editing": "🎥",
    "Data Entry": "📊",
    Other: "🧩",
  };

  return categories[category] || "📁";
};

const getStatusChip = (status) => {
  switch (status) {
    case "open":
      return "bg-green-50 text-green-700 border-green-200";
    case "in progress":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "awaiting_payment":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "completed":
      return "bg-gray-100 text-gray-700 border-gray-300";
    default:
      return "bg-gray-50 text-gray-600";
  }
};

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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Proposals
        </h1>
        <p className="text-gray-500 mt-1">
          Review proposals submitted to your tasks
        </p>
      </div>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="bg-white border rounded-2xl p-12 text-center shadow-sm">
          <div className="text-5xl mb-4">📭</div>

          <h2 className="text-xl font-semibold text-gray-800">
            No proposals yet
          </h2>

          <p className="text-gray-500 mb-6">
            Once freelancers start applying to your tasks, they will appear here.
          </p>

          <Link
            href="/dashboard/client/tasks"
            className="inline-block my-6 px-6 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-[#678d58] to-[#74d3ae] hover:opacity-90 transition"
          >
            View My Tasks
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 flex flex-col justify-between h-full"
            >
              {/* CONTENT WRAPPER */}
              <div>
                <h2 className="font-bold text-lg text-gray-800 line-clamp-2">
                  {task.title}
                </h2>

            <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border whitespace-nowrap">
                    {getCategoryEmoji(task.category)} {task.category}
                  </span>

                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusChip(
                      task.status
                    )}`}
                  >
                    {task.status === "open" && "🟢 Open"}
                    {task.status === "in progress" && "🟡 In Progress"}
                    {task.status === "awaiting_payment" && "🔵 Awaiting Payment"}
                    {task.status === "completed" && "✅ Completed"}
                  </span>
                </div>
                {/* BUDGET ROW WITH FLEX & GAP */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-sm font-semibold text-gray-700">
                    My Budget:
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-100">
                    💰 ${task.budget}
                  </span>
                </div>
              </div>

              {/* ACTIONS ARRENGED AT THE BOTTOM */}
              <div className="mt-6 pt-4 border-t border-gray-50">
                <Link
                  href={`/dashboard/client/proposals/${task._id}`}
                  className="w-full block text-center bg-linear-to-r from-[#678d58] to-[#74d3ae] text-white py-2.5 rounded-full font-medium hover:opacity-90 transition"
                >
                  View Proposals
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}