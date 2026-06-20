"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function EarningsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEarnings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payments/freelancer/${user.email}`
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setPayments(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) loadEarnings();
  }, [user]);

  if (loading) return <p className="p-6">Loading earnings...</p>;

 const total = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Earnings</h1>

      <p className="mb-4 font-semibold">
        Total Earned: ${total}
      </p>

      <div className="space-y-3">
        {payments.map((p) => (
          <div key={p._id} className="border p-4 rounded-xl bg-white">
            <p><b>Task:</b> {p.taskTitle}</p>
            <p><b>Client:</b> {p.clientName}</p>
            <p><b>Amount:</b> ${Number(p.amount)}</p>
            <p>
              <b>Date:</b>{" "}
              {new Date(p.paidAt).toDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}