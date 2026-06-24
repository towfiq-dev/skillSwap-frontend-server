"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button, Chip } from "@heroui/react";
import { CheckCircle, Clock, PlayCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
const fetchTasks = async () => {
  try {
    setLoading(true);

    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/tasks`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      }
    );

    const data = await res.json();
    setTasks(data);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
  try {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete task");
    }

    toast.success("Task deleted successfully");

    fetchTasks();
  } catch (err) {
    toast.error("Task Couldn't be deleted");
  }
};

  const getStatusUI = (status) => {
    switch (status) {
      case "open":
        return {
          label: "Open",
          className: "bg-green-100 text-green-700",
          icon: <Clock size={14} />,
        };

      case "in progress":
        return {
          label: "In Progress",
          className: "bg-blue-100 text-blue-700",
          icon: <PlayCircle size={14} />,
        };

      case "completed":
        return {
          label: "Completed",
          className: "bg-purple-100 text-purple-700",
          icon: <CheckCircle size={14} />,
        };

      default:
        return {
          label: status,
          className: "bg-gray-100 text-gray-700",
          icon: null,
        };
    }
  };
if (loading) {
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
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Tasks
        </h1>
        <p className="text-gray-500 mt-1">
          View and delete platform tasks
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
       {tasks.map((t) => {
  const status = getStatusUI(t.status);

  return (
   <div
  key={t._id}
  className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-md transition flex flex-col h-full"
>
  {/* TOP CONTENT */}
  <div>
    {/* Title */}
    <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
      {t.title}
    </h2>

    {/* Status */}
    <div className="mb-4">
      <Chip className={`${status.className}`}>
        {status.icon}
        {status.label}
      </Chip>
    </div>

    {/* Description */}
    {t.description && (
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
        {t.description}
      </p>
    )}
  </div>

  {/* FOOTER (always bottom) */}
  <div className="mt-auto flex items-center justify-between pt-4">
    <span className="text-xs text-gray-400">
      ID: {t._id.slice(-6)}
    </span>

    <AlertDialog>
      <Button
        variant="danger-soft"
        className="px-4 py-2 text-sm font-medium rounded-full"
      >
        Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-md">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Task?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              Are you sure you want to delete{" "}
              <strong>{t.title}</strong>?
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                slot="close"
                variant="danger-soft"
                onPress={() => deleteTask(t._id)}
              >
                Yes, Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  </div>
</div>
  );
})}
      </div>
    </div>
  );
}