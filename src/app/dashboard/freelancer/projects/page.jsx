"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function ActiveProjectsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [url, setUrl] = useState("");

  const loadProjects = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/freelancer/active-projects/${user.email}`
      );

      const data = await res.json();
      setProjects(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) loadProjects();
  }, [user]);

  const submitDeliverable = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/submit-deliverable/${selectedTask}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deliverableUrl: url }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast.success("Project completed!");
      setSelectedTask(null);
      setUrl("");
      loadProjects();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Active Projects</h1>

      <div className="grid gap-4">
        {projects.map((t) => (
          <div key={t._id} className="border p-4 rounded-xl bg-white">
            <h2 className="font-bold">{t.title}</h2>
            <p>Budget: ${t.budget}</p>
            <p>Status: {t.status}</p>

            {t.deliverable_url && (
              <a
                href={t.deliverable_url}
                className="text-blue-600"
                target="_blank"
              >
                View Deliverable
              </a>
            )}

            <button
              onClick={() => setSelectedTask(t._id)}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit Deliverable
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-lg font-bold mb-3">
              Submit Deliverable
            </h2>

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="GitHub / Drive / Docs URL"
              className="border p-2 w-full mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-3 py-2"
              >
                Cancel
              </button>

              <button
                onClick={submitDeliverable}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}