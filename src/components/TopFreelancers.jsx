"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const TopFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/top-freelancers`
      );
      const data = await res.json();
      setFreelancers(data);
    };

    fetchData();
  }, []);

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      {/* TITLE ANIMATION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800">
          Top Freelancers
        </h2>
        <p className="text-gray-500 mt-2">
          Meet the most skilled freelancers ranked by performance and success
        </p>
      </motion.div>

      {/* GRID CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {freelancers.map((f, index) => (
          <motion.div
            key={f._id}
            variants={cardVariants}
            whileHover={{
              scale: 1.03,
              y: -5,
              transition: { duration: 0.2 },
            }}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            {/* PROFILE */}
            <div className="flex items-center gap-4">
              <Image
                src={f.image || "/avatar.jpg"}
                alt={f.name}
                width={500}
                height={500}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{f.name}</h3>
                <p className="text-sm text-gray-500">⭐ {f.avgRating}</p>
              </div>
            </div>

            {/* SKILLS */}
            <div className="flex flex-wrap gap-2 mt-4">
              {Array.isArray(f.skills)
                ? f.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#678d58]/10 text-[#678d58] px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
                : typeof f.skills === "string" && f.skills.length > 0
                  ? f.skills.split(",").map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#678d58]/10 text-[#678d58] px-3 py-1 rounded-full"
                    >
                      {skill.trim()}
                    </span>
                  ))
                  : null}
            </div>

            {/* STATS */}
            <div className="mt-4 text-sm text-gray-600">
              <p>
                <b>Finished Jobs:</b> {f.finishedJobs}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TopFreelancers;