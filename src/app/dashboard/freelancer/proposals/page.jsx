"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Table, Chip, Spinner } from "@heroui/react";

export default function MyProposals() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const load = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/proposals/freelancer/${user.email}`
        );

        const proposals = await res.json();
        setData(proposals);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "danger";
      default:
        return "warning";
    }
  };

  if (loading) {
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
          My Proposals
        </h1>
        <p className="text-gray-500 mt-1">
          All your submitted applications in one place
        </p>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="bg-white border rounded-2xl p-12 text-center shadow-sm">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-xl font-semibold text-gray-800">
            No proposals yet
          </h2>
          <p className="text-gray-500 mt-2">
            Start applying for tasks to see them here.
          </p>
        </div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="My proposals table">

                {/* HEADER */}
                <Table.Header>
                  <Table.Column isRowHeader>TASK TITLE</Table.Column>
                  <Table.Column>BUDGET BID</Table.Column>
                  <Table.Column>DATE SENT</Table.Column>
                  <Table.Column>STATUS</Table.Column>
                </Table.Header>

                {/* BODY */}
                <Table.Body>
                  {data.map((proposal) => (
                    <Table.Row key={proposal._id}>
                      <Table.Cell>
                        <div className="font-medium max-w-[250px] truncate text-gray-800">
                          {proposal.taskTitle}
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        <span className="font-semibold text-green-700">
                          ${proposal.budget}
                        </span>
                      </Table.Cell>

                      <Table.Cell>
                        {new Date(proposal.createdAt).toLocaleDateString()}
                      </Table.Cell>

                      <Table.Cell>
                        <Chip
                          color={getStatusColor(proposal.status)}
                          variant="flat"
                        >
                          {proposal.status === "pending"
                            ? "Pending"
                            : proposal.status === "accepted"
                            ? "Accepted"
                            : "Rejected"}
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>

              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      )}
    </div>
  );
}