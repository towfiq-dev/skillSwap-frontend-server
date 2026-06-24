"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Activity, Briefcase, DollarSign, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AdminHome() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
  const fetchStats = async () => {
    const { data: tokenData } = await authClient.token();

    if (!tokenData?.token) return; // SAFE GUARD ONLY

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/stats`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
      }
    );

    const data = await res.json();
    setStats(data);
  };

  fetchStats();
}, []);

  if (!stats) return (
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
          Loading your admin overview...
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

  return (
   <div>
       <div className="py-5">
         <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back, <span className="bg-gradient-to-r from-[#678d58] to-[#74d3ae] bg-clip-text text-transparent">Admin</span>👋
        </h1>

        <p className="mt-2 text-gray-500">
          Manage Users, tasks and Earning progress from one place.
        </p>
       </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">
        Total Users
      </p>
      <h2 className="text-3xl font-bold mt-2">
        {stats.totalUsers}
      </h2>
    </div>

    <div className="bg-blue-100 p-3 rounded-xl">
      <Users className="text-blue-600" />
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">
        Total Tasks
      </p>
      <h2 className="text-3xl font-bold mt-2">
        {stats.totalTasks}
      </h2>
    </div>

    <div className="bg-purple-100 p-3 rounded-xl">
      <Briefcase className="text-purple-600" />
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">
        Revenue
      </p>
      <h2 className="text-3xl font-bold text-green-600 mt-2">
        ${stats.totalRevenue}
      </h2>
    </div>

    <div className="bg-green-100 p-3 rounded-xl">
      <DollarSign className="text-green-600" />
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">
        Active Tasks
      </p>
      <h2 className="text-3xl font-bold mt-2">
        {stats.activeTasks}
      </h2>
    </div>

    <div className="bg-orange-100 p-3 rounded-xl">
      <Activity className="text-orange-600" />
    </div>
  </div>
  </div>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Revenue Chart */}
  <div className="bg-white rounded-2xl shadow-sm border p-6">
    <h2 className="font-semibold text-lg mb-4">
      Revenue Overview
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart data={stats.revenueChart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#678d58"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Task Status Chart */}
  <div className="bg-white rounded-2xl shadow-sm border p-6">
    <h2 className="font-semibold text-lg mb-4">
      Task Status
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >
      <BarChart data={stats.taskChart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#74d3ae"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
  </div>


</div>



  );
}