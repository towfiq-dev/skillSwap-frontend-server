"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

export default function FreelancerBrowseTasks() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/browse-tasks`
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        setTasks(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (!user || user.role !== "freelancer") {
    return (
      <div className="p-6 text-center text-red-500">
        Only freelancers can access this page
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center animate-pulse">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Freelancer Task Board
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold">{task.title}</h2>

            <p className="text-sm text-gray-500 mt-1">
              {task.category}
            </p>

            <div className="mt-3 text-sm space-y-1">
              <p>💰 Budget: ${task.budget}</p>
              <p>📅 Deadline: {task.deadline}</p>
              <p>👤 Client: {task.clientName}</p>
            </div>

            <Link
              href={`/browse-tasks/${task._id}`}
              className="block mt-4 text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              View & Apply
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}