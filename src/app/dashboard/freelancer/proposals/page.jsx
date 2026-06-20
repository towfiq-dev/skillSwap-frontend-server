"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function MyProposals() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/proposals/freelancer/${user.email}`
    )
      .then(res => res.json())
      .then(setData);
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Proposals</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Budget</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map(p => (
            <tr key={p._id} className="border-t">
              <td>${p.budget}</td>
              <td>{p.status}</td>
              <td>{new Date(p.createdAt).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}