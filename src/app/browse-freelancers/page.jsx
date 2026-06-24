"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BrowseFreelancersPage() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
  const fetchFreelancers = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/freelancers`
      );

      const data = await res.json();
      setFreelancers(data);
    } catch (error) {
      console.log("Failed to load freelancers");
    } finally {
      setLoading(false);
    }
  };

  fetchFreelancers();
}, []);

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
          Loading your freelancers...
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
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold text-gray-800">
          Browse Freelancers
        </h1>
        <p className="text-gray-500 mt-2">
          Find skilled professionals for your tasks
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {freelancers.map((freelancer, index) => (
          <motion.div
            key={freelancer?._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white border rounded-2xl shadow-sm hover:shadow-xl transition flex flex-col h-full overflow-hidden"
          >

            {/* TOP CONTENT */}
            <div className="p-6 flex flex-col items-center">

              {/* Avatar fallback */}
              {freelancer?.image ? (
                <Image
                  src={freelancer.image}
                  alt={freelancer.name}
                  width={500}
                  height={500}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#678d58] to-[#74d3ae] flex items-center justify-center text-white text-2xl font-bold">
                  {freelancer?.name?.charAt(0)?.toUpperCase() || "F"}
                </div>
              )}

              <h2 className="text-xl font-semibold mt-4 text-gray-800 text-center">
                {freelancer?.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                ${freelancer?.hourlyRate || 0} / hr
              </p>

              {/* FIXED BIO HEIGHT */}
              <p className="text-sm text-gray-600 mt-3 text-center min-h-[60px] line-clamp-3">
                {freelancer?.bio || "No bio provided yet."}
              </p>
            </div>

            {/* PUSH BUTTON TO BOTTOM */}
            <div className="mt-auto border-t bg-gray-50 p-4">
              <Link href={`/browse-freelancers/${freelancer._id}`}>
                <button className="w-full bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white font-medium py-2.5 rounded-full hover:opacity-90 transition">
                  View Profile
                </button>
              </Link>
            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
}