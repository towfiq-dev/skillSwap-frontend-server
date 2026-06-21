"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/payments`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.token}`,
          },
        }
      );

      const data = await res.json();
      setPayments(data);
    };

    fetchPayments();
  }, []);

  return (
    <div>
      <h1>Transactions</h1>

      {payments.map((p) => (
        <div key={p._id} className="border p-2 my-2">
          <p>Client Email: {p.clientEmail}</p>
          <p>Freelancer Email: {p.freelancerEmail}</p>
          <p>Amount: ${p.amount}</p>
          <p>
            Date: {new Date(p.paidAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}