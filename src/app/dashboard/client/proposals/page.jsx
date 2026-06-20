"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ClientProposalsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/tasks?userId=${user.id}`
    )
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(() => toast.error("Failed to load tasks"));
  }, [user]);

  if (!user) {
    return <p className="p-6">Login required</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        My Tasks → Manage Proposals
      </h1>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              <h2 className="font-bold">{task.title}</h2>
              <p className="text-sm text-gray-500">
                {task.category}
              </p>
            </div>

            <Link
              href={`/dashboard/client/proposals/${task._id}`}
              className="bg-black text-white px-4 py-2 rounded"
            >
              View Proposals
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}