import { notFound } from "next/navigation";
import ApplyProposal from "./ApplyProposal";

export default async function Page({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const task = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* PAGE TITLE */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#678d58] to-[#74d3ae] bg-clip-text text-transparent">
            Task Details
          </h1>

          <p className="text-gray-500 mt-2">
            Review the project and submit your proposal
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* TASK DETAILS */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-xl p-8">

            {/* CATEGORY + STATUS */}
            <div className="flex flex-wrap gap-3 mb-5">

              <span className="px-4 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">
                📂 {task.category}
              </span>

              <span
                className={`px-4 py-1 rounded-full text-sm font-medium
                  ${
                    task.status === "open"
                      ? "bg-green-100 text-green-700"
                      : task.status === "in progress"
                      ? "bg-blue-100 text-blue-700"
                      : task.status === "completed"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                🔖 {task.status}
              </span>
            </div>

            {/* TITLE */}
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {task.title}
            </h2>

            {/* DESCRIPTION */}
            <div className="bg-gray-50 rounded-2xl p-5 border">
              <h3 className="font-semibold text-gray-700 mb-2">
                Project Description
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {task.description}
              </p>
            </div>

            {/* INFO GRID */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">

              <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                <p className="text-sm text-gray-500">Budget</p>
                <h3 className="text-2xl font-bold text-green-700">
                  ${task.budget}
                </h3>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-sm text-gray-500">Deadline</p>
                <h3 className="text-xl font-bold text-blue-700">
                  {task.deadline}
                </h3>
              </div>

            </div>

            {/* CLIENT INFO */}
            <div className="mt-8 border-t pt-6">

              <h3 className="font-semibold text-gray-700 mb-3">
                Client Information
              </h3>

              <div className="flex items-center gap-4">

                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#678d58] to-[#74d3ae] flex items-center justify-center text-white font-bold">
                  {(task.clientName || "U")[0]}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    {task.clientName || "Unknown Client"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Client
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* PROPOSAL CARD */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 h-fit sticky top-6">

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Submit Proposal
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Send your budget, timeline and cover message.
              </p>
            </div>

            <ApplyProposal task={task} />

          </div>

        </div>
      </div>
    </div>
  );
}