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
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { BiSearch } from "react-icons/bi";

export function DashboardSideBar() {
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const role = user?.role || "client";

  // ROLE BASED NAVIGATION
  const navItems = {
    client: [
      { icon: House, label: "Home", href: "/dashboard/client" },
      { icon: Plus, label: "Post Tasks", href: "/dashboard/client/tasks/new" },
      { icon: ListCheck, label: "My Tasks", href: "/dashboard/client/tasks" },
      { icon: File, label: "Manage Proposals", href: "/dashboard/client/proposals" },

    ],

    freelancer: [
      { icon: House, label: "Dashboard", href: "/dashboard/freelancer" },
      { icon: BiSearch, label: "Browse Jobs", href: "/dashboard/freelancer/browse-tasks" },
      { icon: Envelope, label: "Proposals", href: "/dashboard/freelancer/proposals" },
      { icon: Envelope, label: "Projects", href: "/dashboard/freelancer/projects" },
      { icon: Gear, label: "Earnings", href: "/dashboard/freelancer/earnings" },
      { icon: Gear, label: "Profile", href: "/dashboard/freelancer/profile" },
    ],

    admin: [
      { icon: House, label: "Admin Panel", href: "/dashboard/admin" },
      { icon: Person, label: "Users", href: "/dashboard/admin/users" },
      { icon: Bell, label: "Tasks", href: "/dashboard/admin/tasks" },
      { icon: Gear, label: "Payments", href: "/dashboard/admin/payments" },
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
            className="bg-linear-to-r from-[#678d58] to-[#74d3ae] text-white"
          >
            <LayoutSideContent />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />

                <Drawer.Header className="border-b pb-4">
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-[#678d58] to-[#74d3ae] bg-clip-text text-transparent">
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
                  <div className="mt-6 border-t pt-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-linear-to-r from-[#678d58] to-[#74d3ae] flex items-center justify-center font-semibold">
                        <Avatar>
                          <Avatar.Image alt={user?.name} src={user?.image} />
                          <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
                        </Avatar>
                      </div>

                      <div>
                        <p className="font-medium text-black text-sm">{user?.name}</p>
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
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen border-r bg-white px-4 py-6">

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
              <Avatar.Image alt={user?.name} src={user?.image} />
              <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
            </Avatar>

            <div>
              <p className="font-medium text-sm">{user?.name}</p>
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