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
  <div className="p-6 max-w-6xl mx-auto">
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* LEFT SIDE → TASK DETAILS */}
      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">

        <h1 className="text-3xl font-bold">{task.title}</h1>

        <p className="text-gray-600">{task.description}</p>

        {/* META */}
        <div className="flex flex-wrap gap-2 text-sm">

          <span className="px-3 py-1 rounded-full bg-gray-100">
            📂 {task.category}
          </span>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
            💰 ${task.budget}
          </span>

          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
            📅 {task.deadline}
          </span>

          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
            🔖 {task.status}
          </span>

        </div>

        {/* OPTIONAL EXTRA INFO */}
       <div className="pt-4 border-t text-sm text-gray-500">
  Posted by: <span className="font-medium">{task.clientName || "Unknown Client"}</span>
</div>

      </div>

      {/* RIGHT SIDE → PROPOSAL FORM */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-4">
          Submit Proposal
        </h2>

        <ApplyProposal task={task} />

      </div>

    </div>
  </div>
);
}