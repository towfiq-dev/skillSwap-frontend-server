"use client";

import { Avatar, Button, Dropdown } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const sessionUser = session?.user;

  const [profile, setProfile] = useState(null);

 useEffect(() => {
  const handleProfileUpdate = () => {
    if (!sessionUser?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/profile/${sessionUser.email}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => console.log("Navbar refresh failed"));
  };

  window.addEventListener("profile-updated", handleProfileUpdate);

  return () => {
    window.removeEventListener("profile-updated", handleProfileUpdate);
  };
}, [sessionUser?.email]);

  if (isPending) return null;

  // FINAL USER (single source of truth)
  const user = {
    name: profile?.name || sessionUser?.name || "User",
    image: profile?.image || sessionUser?.image || "",
    role: profile?.role || sessionUser?.role || "client",
  };

  const dashboardPath =
    user.role === "admin"
      ? "/dashboard/admin"
      : user.role === "freelancer"
      ? "/dashboard/freelancer"
      : "/dashboard/client";

  const handleLogOut = async () => {
    await authClient.signOut();
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Tasks", href: "/browse-tasks" },
    { name: "Browse Freelancers", href: "/browse-freelancers" },
    { name: "Contact Us", href: "/contact" }
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <header className="mx-auto flex h-16 items-center justify-between px-6">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} />
              )}
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2">
            <Image src="/footerlogo.png" alt="logo" height={40} width={140} />
          </Link>
        </div>

        {/* CENTER */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href} className="relative group">
              <Link
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive(link.href)
                    ? "text-[#dd9787]"
                    : "text-gray-600 group-hover:text-[#dd9787]"
                }`}
              >
                {link.name}
              </Link>

              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-[#dd9787] transition-all ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </li>
          ))}
        </ul>

        {/* RIGHT */}
        <div>
          {sessionUser ? (
            <Dropdown>
              <Button isIconOnly className="bg-transparent p-0">
                <Avatar>
                  <Avatar.Image
                    alt={user.name}
                    src={user.image}
                    className="object-cover"
                  />
                  <Avatar.Fallback>
                    {user.name?.[0]}
                  </Avatar.Fallback>
                </Avatar>
              </Button>

              <Dropdown.Popover>
                <Dropdown.Menu>
                  <Dropdown.Item key="dashboard">
                    <Link href={dashboardPath} className="block w-full font-semibold">
                      Dashboard
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item key="profile">
                    <Link href="/profile" className="block w-full font-semibold">
                      My Profile
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item key="settings">
                    <Link href="/settings" className="block w-full font-semibold">
                      Settings
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    key="logout"
                    onPress={handleLogOut}
                    className="text-red-500 font-semibold block w-full"
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <Link href="/login">
              <Button className="bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white">
                Login
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* MOBILE */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white/90 backdrop-blur-xl">
          <ul className="flex flex-col gap-3 p-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm ${
                    isActive(link.href)
                      ? "text-[#dd9787]"
                      : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;