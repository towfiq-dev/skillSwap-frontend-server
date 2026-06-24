"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function FreelancerDashboard() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

   const loadStats = async () => {
  try {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/freelancer/stats/${user.email}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      }
    );

    const data = await res.json();
    setStats(data);
  } catch (error) {
    console.error(error);
  }
};

    loadStats();
  }, [user]);

  if (!stats) {
    return (
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
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
         <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back, <span className="bg-gradient-to-r from-[#678d58] to-[#74d3ae] bg-clip-text text-transparent">{user.name}</span>👋
        </h1>
        <p className="text-gray-500">Manage you stats as a freelancer</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Stat
          title="Total Proposals"
          value={stats.totalProposals}
          icon="📄"
        />

        <Stat
          title="Pending"
          value={stats.pendingProposals}
          icon="⏳"
        />

        <Stat
          title="Accepted"
          value={stats.acceptedProposals}
          icon="✅"
        />

        <Stat
          title="Earnings"
          value={`$${stats.totalEarnings}`}
          icon="💰"
        />
      </div>

      {/* CHART */}
      <div className="bg-white border rounded-2xl shadow-sm my-6 p-6">
        <div className="space-y-5">
          <h2 className="text-xl font-bold text-gray-800">
            Earnings Overview
          </h2>

          <p className="text-gray-500 text-sm">
            Monthly earnings from completed projects
          </p>
        </div>

        <ResponsiveContainer
          width="90%"
          height={350}
        >
          <BarChart
            data={stats.chartData || []}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="earnings"
              fill="#678d58"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* STAT CARD COMPONENT */
function Stat({ title, value, icon }) {
  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-5
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <span className="text-2xl">
          {icon}
        </span>
      </div>

      <h2 className="text-3xl font-bold mt-3 text-gray-800">
        {value}
      </h2>
    </div>
  );
}