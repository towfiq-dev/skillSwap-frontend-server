"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

import EditTaskModal from "@/components/EditTaskModal";
import DeleteTaskAlert from "@/components/DeleteTaskAlert";
import Link from "next/link";

export default function MyTasksPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tasks?userId=${user.id}`
    )
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

  const statusColor = (status) => {
    if (status === "open") return "bg-blue-100 text-blue-700";
    if (status === "in progress") return "bg-yellow-100 text-yellow-700";
    if (status === "completed") return "bg-green-100 text-green-700";
    return "bg-gray-100";
  };
  const getCategoryEmoji = (category) => {
  switch (category) {
    case "Design":
      return "🎨";

    case "Development":
      return "💻";

    case "Writing":
      return "✍️";

    case "Marketing":
      return "📢";

    case "Video Editing":
      return "🎥";

    case "Data Entry":
      return "📊";

    case "Other":
      return "🧩";

    default:
      return "📁";
  }
};

  const chip =
    "px-3 py-1 rounded-full text-xs font-medium border bg-gray-50 text-gray-700";

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
      {/* HEADER */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Tasks
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track all your posted tasks
          </p>
        </div>

      
      </div>

      {/* EMPTY STATE */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white border rounded-2xl p-12 text-center shadow-sm">
          <div className="text-5xl mb-4">📝</div>

          <h2 className="text-xl font-semibold text-gray-800">
            You haven’t posted a task yet
          </h2>

          <p className="text-gray-500 mt-2 max-w-md">
            Start by posting your first task. You can manage, edit, or delete it anytime.
          </p>

          <Link
            href="/dashboard/client/tasks/new"
            className="mt-6 px-6 py-2 rounded-lg text-white font-medium
                       bg-gradient-to-r from-[#678d58] to-[#74d3ae]
                       hover:opacity-90 transition"
          >
          + Post a Task
          </Link>
        </div>
      ) : (
        /* TASK GRID */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
           <div
  key={task._id}
  className="
    bg-white border rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-200 flex flex-col justify-between h-full"
>
              {/* TITLE + STATUS */}
              <div className="flex justify-between items-start">
                <h2 className="font-bold text-lg text-gray-800 line-clamp-1">
                  {task.title}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${statusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm mt-3 text-gray-600 line-clamp-3">
                {task.description}
              </p>

              {/* CHIPS */}
              <div className="flex flex-wrap gap-2 mt-4 mb-4">
                <span className={chip}>
  {getCategoryEmoji(task.category)} {task.category}
</span>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border">
                  💰 ${task.budget}
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border">
                  📅 {task.deadline}
                </span>
              </div>

              {/* ACTIONS */}
             <div className="mt-auto pt-4 border-t border-gray-100">
  <div className="flex gap-2">
                {task.status === "open" && (
                  <EditTaskModal
                    task={task}
                    onUpdated={(updated) => {
                      setTasks((prev) =>
                        prev.map((t) =>
                          t._id === updated._id ? updated : t
                        )
                      );
                    }}
                  />
                )}

                <DeleteTaskAlert
                  taskId={task._id}
                  taskTitle={task.title}
                  onDeleted={(id) => {
                    setTasks((prev) =>
                      prev.filter((t) => t._id !== id)
                    );
                  }}
                />
              </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}