"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Table, Chip } from "@heroui/react";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const getStatus = () => {
    return {
      label: "Paid",
      className: "bg-green-100 text-green-700",
    };
  };

const safeText = (value, fallback = "Unknown") => {
  return value?.trim() ? value : fallback;
};
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
          Loading your payments...
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
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Transactions History
        </h1>
        <p className="text-gray-500">
          All Stripe payments processed by the system
        </p>
      </div>

      {/* Table */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Payments table">

            {/* HEADER */}
            <Table.Header>
              <Table.Column isRowHeader>Client Email</Table.Column>
              <Table.Column>Freelancer Email</Table.Column>
              <Table.Column>Payout Size</Table.Column>
              <Table.Column>Payment Date</Table.Column>
              <Table.Column>Status</Table.Column>
            </Table.Header>

            {/* BODY */}
           <Table.Body>
  {payments.map((p) => (
    <Table.Row key={p._id}>
      
      {/* Client */}
      <Table.Cell>
        {p.clientEmail?.trim() ? p.clientEmail : "Unknown Client"}
      </Table.Cell>

      {/* Freelancer */}
      <Table.Cell>
        {p.freelancerEmail?.trim() ? p.freelancerEmail : "Unknown Freelancer"}
      </Table.Cell>

      {/* Payout */}
      <Table.Cell className="font-semibold text-green-700">
        ${p.amount || 0}
      </Table.Cell>

      {/* Date */}
      <Table.Cell>
        {p.paidAt
          ? new Date(p.paidAt).toLocaleDateString()
          : "Unknown Date"}
      </Table.Cell>

      {/* Status */}
      <Table.Cell>
        <Chip className="bg-green-100 text-green-700">
          Paid
        </Chip>
      </Table.Cell>

    </Table.Row>
  ))}
</Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}