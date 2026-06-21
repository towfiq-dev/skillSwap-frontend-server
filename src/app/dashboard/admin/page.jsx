"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AdminHome() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: tokenData } = await authClient.token();

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

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin Overview</h1>

      <div>Total Users: {stats.totalUsers}</div>
      <div>Total Tasks: {stats.totalTasks}</div>
      <div>Total Revenue: ${stats.totalRevenue}</div>
      <div>Active Tasks: {stats.activeTasks}</div>
    </div>
  );
}