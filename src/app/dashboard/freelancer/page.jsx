"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function FreelancerDashboard() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const loadStats = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/freelancer/stats/${user.email}`
      );

      const data = await res.json();
      setStats(data);
    };

    loadStats();
  }, [user]);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat title="Total Proposals" value={stats.totalProposals} />
      <Stat title="Pending" value={stats.pendingProposals} />
      <Stat title="Accepted" value={stats.acceptedProposals} />
      <Stat title="Earnings ($)" value={stats.totalEarnings} />
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}