"use client";

import {
  Bell,
  Envelope,
  Gear,
  House,
  Person,
  Briefcase,
  Plus,
  ListCheck,
  File,
  LayoutSideContent,
} from "@gravity-ui/icons";

import { Avatar, Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { BiMoney, BiSearch } from "react-icons/bi";
import { ChartArea, FileText, User, Wallet } from "lucide-react";

export function DashboardSideBar() {
  const [open, setOpen] = useState(false);
 

  const { data: session } = authClient.useSession();
  const sessionUser = session?.user;

  const [profile, setProfile] = useState(null);

 useEffect(() => {
  const handleUpdate = () => {
    if (!sessionUser?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/profile/${sessionUser.email}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => console.log("Refresh failed"));
  };

  window.addEventListener("profile-updated", handleUpdate);

  return () => {
    window.removeEventListener("profile-updated", handleUpdate);
  };
}, [sessionUser?.email]);

  const role = sessionUser?.role || "client";

  // FINAL USER OBJECT (single source of truth)
  const displayUser = {
    name: profile?.name || sessionUser?.name || "User",
    image: profile?.image || sessionUser?.image || "",
  };

  // ROLE BASED NAVIGATION
  const navItems = {
    client: [
      { icon: ChartArea, label: "Overview", href: "/dashboard/client" },
      { icon: Plus, label: "Post Tasks", href: "/dashboard/client/tasks/new" },
      { icon: ListCheck, label: "My Tasks", href: "/dashboard/client/tasks" },
      { icon: File, label: "Manage Proposals", href: "/dashboard/client/proposals" },
    ],

    freelancer: [
      { icon: ChartArea, label: "Overview", href: "/dashboard/freelancer" },
      { icon: BiSearch, label: "Browse Tasks", href: "/dashboard/freelancer/browse-tasks" },
      { icon: FileText, label: "Proposals", href: "/dashboard/freelancer/proposals" },
      { icon: Briefcase, label: "Projects", href: "/dashboard/freelancer/projects" },
      { icon: Wallet, label: "Earnings", href: "/dashboard/freelancer/earnings" },
      { icon: User, label: "Edit Profile", href: "/dashboard/freelancer/profile" },
    ],

    admin: [
      { icon: ChartArea, label: "Overview", href: "/dashboard/admin" },
      { icon: Person, label: "Users", href: "/dashboard/admin/users" },
      { icon: Briefcase, label: "Tasks", href: "/dashboard/admin/tasks" },
      { icon: BiMoney, label: "Payments", href: "/dashboard/admin/payments" },
    ],
  };

  const items = navItems[role];

  return (
    <>
      {/* MOBILE DRAWER */}
      <div className="lg:hidden mt-2">
        <Drawer open={open} onOpenChange={setOpen}>
          <Button
            onClick={() => setOpen(true)}
            className="bg-linear-to-r from-[#678d58] to-[#74d3ae] text-white sticky fixed top-0 z-10"
          >
            <LayoutSideContent />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />

                <Drawer.Header className="border-b pb-4">
                  <div>
                    <h2 className="text-xl font-bold bg-linear-to-r from-[#678d58] to-[#74d3ae] bg-clip-text text-transparent">
                      AlignTask
                    </h2>

                    <p className="text-sm text-gray-500">
                      {role === "admin"
                        ? "Admin Panel"
                        : role === "freelancer"
                        ? "Freelancer Hub"
                        : "Client Dashboard"}
                    </p>
                  </div>
                </Drawer.Header>

                <Drawer.Body>
                  <nav className="flex flex-col gap-2">
                    {items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-gray-100 transition"
                      >
                        <item.icon className="size-5 text-gray-500" />
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  {/* USER FOOTER */}
                  <div className="mt-6 border-t pt-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <Avatar.Image
                          alt={displayUser.name}
                          src={displayUser.image}
                          className="object-cover"
                        />
                        <Avatar.Fallback>
                          {displayUser.name?.[0]}
                        </Avatar.Fallback>
                      </Avatar>

                      <div>
                        <p className="font-medium text-black text-sm">
                          {displayUser.name}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {role}
                        </p>
                      </div>
                    </div>
                  </div>
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 self-stretch border-r bg-white px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {role === "admin"
              ? "Admin Panel"
              : role === "freelancer"
              ? "Freelancer Hub"
              : "Client Space"}
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Manage your dashboard
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              <item.icon className="size-5 text-gray-500" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-6 border-t pt-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <Avatar.Image
                alt={displayUser.name}
                src={displayUser.image}
              />
              <Avatar.Fallback>
                {displayUser.name?.[0]}
              </Avatar.Fallback>
            </Avatar>

            <div>
              <p className="font-medium text-sm">
                {displayUser.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {role}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}