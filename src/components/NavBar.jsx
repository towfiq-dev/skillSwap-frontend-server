"use client";

import { Avatar, Button, Dropdown } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const {
        data: session,
        isPending
    } = authClient.useSession()
    
if (isPending) return null;
const user = session?.user
const dashboardPath =
  user?.role === "admin"
    ? "/dashboard/admin"
    : user?.role === "freelancer"
    ? "/dashboard/freelancer"
    : "/dashboard/client";
const handleLogOut = async() =>{
await authClient.signOut()
}


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Tasks", href: "/browse-tasks" },
    { name: "Browse Freelancers", href: "/browse-freelancers" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <header className="mx-auto flex h-16 items-center justify-between px-6">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" height={40} width={40} />

            <p className="font-bold italic text-xl">
              <span className="bg-gradient-to-r from-[#678d58] to-[#74d3ae] bg-clip-text text-transparent">
                Align
              </span>
              <span className="bg-gradient-to-r from-[#a6c48a] to-[#74d3ae] bg-clip-text text-transparent">
                Task
              </span>
            </p>
          </Link>
        </div>

        {/* CENTER NAV */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href} className="relative group">
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-[#dd9787]"
                    : "text-gray-600 group-hover:text-[#dd9787]"
                }`}
              >
                {link.name}
              </Link>

              {/* animated underline */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-[#dd9787] transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="items-center gap-4">

            {
            user? (<div>  <Dropdown>
      <Button  isIconOnly aria-label="Menu" className="bg-transparent min-w-0 p-0 h-auto">
        <Avatar>
        <Avatar.Image alt={user?.name} src={user?.image} />
        <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
      </Avatar>
      </Button>
     <Dropdown.Popover>
  <Dropdown.Menu>
  <Dropdown.Item key="dashboard" textValue="Dashboard">
    <Link
      href={dashboardPath}
      className="block w-full font-semibold hover:text-[#dd9787]"
    >
      Dashboard
    </Link>
  </Dropdown.Item>

  <Dropdown.Item
    key="logout"
    textValue="Logout"
    onPress={handleLogOut}
    className="text-red-500 font-semibold"
  >
    Logout
  </Dropdown.Item>
</Dropdown.Menu>
</Dropdown.Popover>
    </Dropdown></div>): (<div> <Link href="/login">
                  <Button className="w-full bg-gradient-to-r from-[#678d58] to-[#74d3ae] text-white">
                    Login
                  </Button>
                </Link></div>)
        }

        </div>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white/90 backdrop-blur-xl">
          <ul className="flex flex-col gap-3 p-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm font-medium ${
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