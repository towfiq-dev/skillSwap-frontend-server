"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PublicBrowseTasks() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [totalTasks, setTotalTasks] = useState(0);

 useEffect(() => {
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/browse-tasks?page=${page}&limit=9&search=${searchTerm}&category=${category}`
      );

      const data = await res.json();

      setTasks(data.tasks);
      setTotalPages(data.totalPages);
      setTotalTasks(data.total);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, [page, searchTerm, category]);

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
      
      <div className="flex flex-col items-center gap-6">

        {/* Floating dots animation */}
        <div className="flex gap-3">
          <span className="h-3 w-3 bg-[#678d58] rounded-full animate-bounce"></span>
          <span className="h-3 w-3 bg-[#74d3ae] rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="h-3 w-3 bg-[#678d58] rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>

        {/* Main animated text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Loading your tasks
          </h2>

          <p className="text-gray-500 mt-1 animate-pulse">
            organizing your workspace...
          </p>
        </div>

        {/* Fun rotating ring */}
        <div className="relative mt-2">
          <div className="h-14 w-14 rounded-full border-4 border-gray-200"></div>
          <div className="h-14 w-14 rounded-full border-4 border-t-[#678d58] border-l-[#74d3ae] border-r-transparent border-b-transparent animate-spin absolute top-0 left-0"></div>
        </div>

      </div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Browse Jobs
        </h1>
        <p className="text-gray-500 mt-2">
          Find the perfect task that matches your skills
        </p>
      </motion.div>

      {/* SEARCH + FILTER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 rounded-2xl shadow-md mb-8 flex flex-col md:flex-row gap-4"
      >
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
         onChange={(e) => {
  setSearchTerm(e.target.value);
  setPage(1);
}}
          className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#74d3ae]"
        />

       <select
  value={category}
  onChange={(e) => {
  setCategory(e.target.value);
  setPage(1);
}}
  className="border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#74d3ae]"
>
  <option value="All">All Categories</option>
  <option value="Design">🎨 Design</option>
  <option value="Writing">✍️ Writing</option>
  <option value="Development">💻 Development</option>
  <option value="Marketing">📢 Marketing</option>
  <option value="Video Editing">🎬 Video Editing</option>
  <option value="Data Entry">📊 Data Entry</option>
  <option value="Other">📦 Other</option>
</select>
      </motion.div>
<div className="flex justify-between items-center mb-6 text-sm text-gray-500">
  <p>
    Showing page {page} of {totalPages}
  </p>

  <p>
    {tasks.length} tasks found
  </p>
</div>
      {/* EMPTY STATE */}
      {tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-sm"
        >
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold">
            No matching tasks found
          </h2>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or category filter
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
            >
              {/* CATEGORY BADGE */}
              <span className="inline-block px-3 py-1 text-xs rounded-full bg-[#74d3ae]/10 text-[#2f6f57] mb-3">
                {task.category}
              </span>

              {/* TITLE */}
              <h2 className="font-bold text-lg text-gray-800">
                {task.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {task.description}
              </p>

              {/* META */}
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                 <p>👤 Client: {task.clientName}</p>
                <p>💰 Budget: ${task.budget}</p>
                <p>📅 Deadline: {task.deadline}</p>
              </div>

              {/* BUTTON */}
              <Link
                href={`/browse-tasks/${task._id}`}
                className="block mt-5 text-center bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white py-2 rounded-full hover:opacity-90 transition"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
      {totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
    <button
      disabled={page === 1}
      onClick={() => setPage((prev) => prev - 1)}
      className="px-4 py-2 border rounded-lg disabled:opacity-50"
    >
      Previous
    </button>

    {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        onClick={() => setPage(index + 1)}
        className={`w-10 h-10 rounded-lg border ${
          page === index + 1
            ? "bg-[#74d3ae] text-white border-[#74d3ae]"
            : "bg-white"
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      disabled={page === totalPages}
      onClick={() => setPage((prev) => prev + 1)}
      className="px-4 py-2 border rounded-lg disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}
    </div>
  );
}