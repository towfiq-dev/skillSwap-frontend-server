"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function BrowseFreelancersPage() {
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/freelancers`)
      .then((res) => res.json())
      .then((data) => setFreelancers(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Browse Freelancers
      </h1>

      <div className="grid md:grid-cols-3 gap-5">
        {freelancers.map((freelancer) => (
          <Link
            key={freelancer?._id}
             href={`/browse-freelancers/${freelancer._id}`}
          >
           
            <div className="border rounded-xl p-4 shadow hover:shadow-lg cursor-pointer">
              <Image
                src={freelancer?.image}
                alt={freelancer?.name}
                 width={100}
                  height={100}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />

              <h2 className="text-xl font-bold text-center mt-3">
                {freelancer?.name}
              </h2>

              <p className="text-center text-gray-500">
                ${freelancer?.hourlyRate || 0}/hr
              </p>

              <p className="mt-3 text-sm line-clamp-2">
                {freelancer?.bio || "No bio yet"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}