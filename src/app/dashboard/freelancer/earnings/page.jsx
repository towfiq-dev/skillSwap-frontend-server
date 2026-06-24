"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Table } from "@heroui/react";

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
  }, [user?.email]);

  if (loading) return <p className="p-6">Loading earnings...</p>;

  const total = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
    <div className="space-y-2">
        <h1 className="text-3xl text-gray-800 font-bold">My Earnings</h1>
        <p className="text-gray-500">Keep track of your earnings</p>
    </div>

      <p className="mb-6 mt-3 text-xl font-semibold text-green-600">
        Total Earned: ${total}
      </p>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Earnings Table">

            {/* HEADER */}
            <Table.Header>
              <Table.Column isRowHeader>Task Title</Table.Column>
              <Table.Column>Client Name</Table.Column>
              <Table.Column>Amount Made</Table.Column>
              <Table.Column>Completion Date</Table.Column>
            </Table.Header>

            {/* BODY */}
            <Table.Body>
              {payments.map((p) => (
                <Table.Row key={p._id}>
                  <Table.Cell className="line-clamp-1">{p?.taskTitle}</Table.Cell>

                  <Table.Cell>
                    {p?.clientName || "Unknown Client"}
                  </Table.Cell>

                  <Table.Cell>
                    ${Number(p.amount)}
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(p.paidAt).toDateString()}
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