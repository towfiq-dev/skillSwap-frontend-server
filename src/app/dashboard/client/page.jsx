"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  ClipboardList,
  FolderOpen,
  Briefcase,
  CheckCircle,
  DollarSign,
} from "lucide-react";

export default function ClientDashboardHome() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const loadStats = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/client/stats/${user.email}`
      );

      const data = await res.json();
      setStats(data);
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

  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: ClipboardList,
    },
    {
      title: "Open Tasks",
      value: stats.openTasks,
      icon: FolderOpen,
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: Briefcase,
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle,
    },
    {
      title: "Total Spent (USD)",
      value: `$${stats.totalSpent}`,
      icon: DollarSign,
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
    
       <div className="py-5">
         <h1 className="text-3xl font-bold">
          Welcome Back, <span className="bg-gradient-to-r from-[#678d58] to-[#74d3ae] bg-clip-text text-transparent">{user.name}</span>👋
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your projects, track progress,
          and monitor spending from one place.
        </p>
       </div>
     

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                <div className="p-3 rounded-2xl bg-blue-100">
                  <Icon className="w-7 h-7 text-[#678d58]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-2 gap-6 py-5">
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">
            Project Summary
          </h2>

          <p className="text-gray-600">
            You currently have{" "}
            <span className="font-bold text-blue-600">
              {stats.openTasks}
            </span>{" "}
            open tasks and{" "}
            <span className="font-bold text-orange-600">
              {stats.inProgressTasks}
            </span>{" "}
            active projects.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">
            Spending Summary
          </h2>

          <p className="text-gray-600">
            Total amount spent on freelancers:
          </p>

          <p className="text-4xl font-bold text-green-600 mt-3">
            ${stats.totalSpent}
          </p>
        </div>
      </div>
    </div>
  );
}