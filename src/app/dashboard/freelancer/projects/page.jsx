"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Send } from "lucide-react";
import { Button } from "@heroui/react";

export default function ActiveProjectsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [url, setUrl] = useState("");

 const loadProjects = async () => {
  try {
    setLoading(true);
const {data:tokenData} = await authClient.token()

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/freelancer/active-projects/${user.email}`,
      {
        headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${tokenData?.token}`
            },

      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to load");

    setProjects(data);
  } catch (err) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  if (!user?.email) return;
  loadProjects();
}, [user?.email]);

  const submitDeliverable = async () => {
    try {
      try {
      new URL(url);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }
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

      toast.success("Project has been completed!");

      setSelectedTask(null);
      setUrl("");

      loadProjects();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return (
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
  )
  // Split projects
  const activeProjects = projects.filter(
    (p) => p.status === "in progress"
  );

  const completedProjects = projects.filter(
    (p) => p.status === "completed"
  );

  return (
  <div className="p-6 max-w-6xl mx-auto">
   <div className="space-y-2 mb-8">
     <h1 className="text-3xl font-bold text-gray-800">
      Active Projects
    </h1>
    <p className="text-gray-500">Manage your active projects and see the tasks you have completed</p>
   </div>

    {/* ACTIVE PROJECTS */}
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        In Progress Projects
      </h2>

      {activeProjects.length === 0 ? (
        <p className="text-gray-500">No active projects</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeProjects.map((t) => (
            <div
              key={t._id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition mb-4"
            >
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                {t.title}
              </h2>

              <p className="text-gray-600 mt-2">
                💰 Budget: <span className="font-semibold">${t.freelancerBudget}</span>
              </p>

              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                In Progress
              </span>
              </div>

             <Button
  onClick={() => setSelectedTask(t._id)}
  className="mt-4 hover:bg-green-500 w-full bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white py-2 rounded-full transition flex items-center justify-center gap-2"
>
  Submit Deliverable
  <Send size={18} />
</Button>
            </div>
          ))}
        </div>
      )}
    </section>

    {/* COMPLETED PROJECTS */}
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Completed Projects
      </h2>

      {completedProjects.length === 0 ? (
        <p className="text-gray-500">No completed projects yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {completedProjects.map((t) => (
            <div
              key={t._id}
              className="bg-gray-50 border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
             <div className="space-y-2">
               <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                {t.title}
              </h2>

              <p className="text-gray-600 mt-2">
                💰 Budget: <span className="font-semibold">${t.freelancerBudget}</span>
              </p>

              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                Completed
              </span> 
             </div>

              {t.deliverable_url && (
                <a
                  href={t.deliverable_url}
                  target="_blank"
                  className="block mt-4 text-blue-600 hover:underline"
                >
                  🔗 View Deliverable
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>

    {/* MODAL */}
    {selectedTask && (
      <div className="fixed inset-0 text-gray-800 flex items-center justify-center border border-gray-800 p-4">
        <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
          <h2 className="text-lg font-bold mb-4 bg-gradient-to-r from-[#678d58] to-[#74d3ae] bg-clip-text text-transparent">
            Submit Deliverable
          </h2>

          <input
          type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="GitHub / Drive / Docs URL"
            className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex justify-end gap-3">
            <Button
            variant="outline"
              onClick={() => setSelectedTask(null)}
              className="px-4 py-2 rounded-full text-[#dd9787] border hover:bg-red-300"
            >
              Cancel
            </Button>

            <Button
              onClick={submitDeliverable}
              className="px-4 py-2 bg-gradient-to-r from-[#678d58] to-[#74d3ae] hover:opacity-80 text-white rounded-full"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}