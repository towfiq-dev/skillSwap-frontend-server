"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

export default function PublicBrowseTasks() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/browse-tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load tasks");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center animate-pulse text-gray-500">
        Loading available jobs...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Browse Jobs
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
          >
            <h2 className="font-bold text-lg">{task.title}</h2>

            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {task.description}
            </p>

            <div className="mt-3 text-sm space-y-1">
              <p>💰 ${task.budget}</p>
              <p>📅 {task.deadline}</p>
            </div>

            {/* ROLE CHECK */}
           <Link
  href={`/browse-tasks/${task._id}`}
  className="block mt-4 text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800"
>
  View Details
</Link>
          </div>
        ))}
      </div>
    </div>
  );
}