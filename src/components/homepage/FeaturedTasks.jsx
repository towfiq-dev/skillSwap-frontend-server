"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/featured-tasks`
        );
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        Loading featured tasks...
      </div>
    );
  }

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800">
          Latest Featured Tasks
        </h2>
        <p className="text-gray-500 mt-2">
          Discover high-quality tasks from real clients
        </p>
      </motion.div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tasks.map((task, index) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* TITLE */}
            <h3 className="text-lg font-semibold text-[#678d58] line-clamp-2">
              {task.title}
            </h3>

            {/* CLIENT */}
            <p className="text-sm text-gray-500 mt-2">
              Posted by{" "}
              <span className="font-medium text-gray-700">
                {task.clientName || "Anonymous"}
              </span>
            </p>

            {/* CATEGORY CHIP */}
            <div className="mt-3">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                {task.category}
              </span>
            </div>

            {/* BUDGET + DEADLINE */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                💰 ${task.budget}
              </span>

              <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                📅{" "}
                {task.deadline
                  ? new Date(task.deadline).toLocaleDateString()
                  : "No deadline"}
              </span>
            </div>

            {/* BUTTON */}
            <Link href={`/browse-tasks/${task._id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-5 w-full bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white py-2 rounded-full font-medium shadow-md hover:shadow-lg transition"
              >
                View Details
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedTasks;