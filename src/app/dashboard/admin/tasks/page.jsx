"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/tasks`, {
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
    });

    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    const { data: tokenData } = await authClient.token();

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
    });

    fetchTasks();
  };

  return (
    <div>
      <h1>Manage Tasks</h1>

      {tasks.map((t) => (
        <div key={t._id}>
          <p>{t.title}</p>
          <p>Status: {t.status}</p>

          <button onClick={() => deleteTask(t._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}