"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FreelancerBrowseTasks() {
   const router = useRouter();

  const { data: session, isLoading } = authClient.useSession();
  const user = session?.user;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // FETCH TASKS
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/browse-tasks`
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        setTasks(data.tasks);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // AUTH GUARD (FIXED PROPERLY)
  useEffect(() => {
    if (isLoading) return;

    if (!session) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "freelancer") {
      router.replace("/unauthorized");
      return;
    }

    setAuthChecked(true);
  }, [session, user, isLoading, router]);

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

  // 🔥 CRITICAL FIX: block render until auth is ready
  if (!authChecked) {
    return (
     <div>
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
        </div>
    );
  }

  if (isLoading || loading) {
    return (
     <div>
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
        </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
  {/* HEADER */}
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-800">
      Browse Tasks
    </h1>

    <p className="text-gray-500 mt-1">
      Find projects that match your skills and start earning
    </p>
  </div>

  {/* EMPTY STATE */}
  {tasks.length === 0 ? (
    <div className="bg-white border rounded-2xl p-12 text-center shadow-sm">
      <div className="text-5xl mb-4">📭</div>

      <h2 className="text-xl font-semibold text-gray-800">
        No tasks available
      </h2>

      <p className="text-gray-500 mt-2">
        Check back later for new opportunities.
      </p>
    </div>
  ) : (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="
            bg-white
            border
            rounded-2xl
            p-5
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-1
            transition
            flex
            flex-col
            justify-between
          "
        >
          <div>
            <h2 className="font-bold text-lg text-gray-800 line-clamp-2">
              {task.title}
            </h2>

            <div className="mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border">
                {getCategoryEmoji(task.category)} {task.category}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">
                  Budget
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border">
                  💰 ${task.budget}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">
                  Deadline
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border">
                  📅 {task.deadline}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">
                  Client
                </span>

                <span className="text-sm font-medium text-gray-700">
                  👤 {task.clientName}
                </span>
              </div>
            </div>
          </div>

          <Link
            href={`/browse-tasks/${task._id}`}
            className="rounded-full
              mt-6
              text-center
              py-2.5
              font-medium
              text-white
              bg-gradient-to-r
              from-[#678d58]
              to-[#74d3ae]
              hover:opacity-90
              transition
            "
          >
            View & Apply
          </Link>
        </div>
      ))}
    </div>
  )}
</div>
  );
}