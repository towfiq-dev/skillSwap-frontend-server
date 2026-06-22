"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  PenTool,
  FileText,
  Code2,
  Megaphone,
  MoreHorizontal,
  Video,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Design",
    color: "from-amber-400 to-orange-500",
    icon: PenTool,
    tasks: "1.2K+ Tasks",
  },
  {
    name: "Writing",
    color: "from-blue-400 to-cyan-500",
    icon: FileText,
    tasks: "850+ Tasks",
  },
  {
    name: "Development",
    color: "from-emerald-400 to-green-500",
    icon: Code2,
    tasks: "2.4K+ Tasks",
  },
  {
    name: "Marketing",
    color: "from-rose-400 to-red-500",
    icon: Megaphone,
    tasks: "940+ Tasks",
  },
  {
    name: "Video Editing",
    color: "from-orange-400 to-pink-500",
    icon: Video,
    tasks: "760+ Tasks",
  },
  {
    name: "Other",
    color: "from-violet-400 to-purple-500",
    icon: MoreHorizontal,
    tasks: "500+ Tasks",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function BrowseCategories() {
  const router = useRouter();

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Blur Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-200 rounded-full blur-3xl opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm">
            🚀 Browse Categories
          </span>

          <h2 className="mt-5 text-3xl md:text-5xl font-bold text-gray-900">
            Explore Popular
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              {" "}
              Categories
            </span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
            Discover thousands of opportunities tailored to your skills and
            interests.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  router.push(
                    `/browse-tasks?category=${encodeURIComponent(
                      category.name
                    )}`
                  )
                }
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition-all duration-300 hover:shadow-2xl"
              >
                {/* Top Border */}
                <div
                  className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${category.color}`}
                />

                {/* Icon */}
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${category.color} text-white shadow-md`}
                >
                  <Icon size={26} />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-800">
                  {category.name}
                </h3>

                {/* Task Count */}
                <p className="mt-1 text-sm text-gray-500">
                  {category.tasks}
                </p>

                {/* Link */}
                <div className="mt-4 flex items-center text-sm font-medium text-indigo-600">
                  Explore
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10 bg-gradient-to-r ${category.color}`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 text-center"
        >
          <button
            onClick={() => router.push("/browse-tasks")}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
          >
            View All Categories
          </button>
        </motion.div>
      </div>
    </section>
  );
}