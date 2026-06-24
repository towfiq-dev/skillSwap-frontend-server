"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const sessionUser = session?.user;

  const [profile, setProfile] = useState(null);

  // scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleProfileUpdate = () => {
      if (!sessionUser?.email) return;
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/profile/${sessionUser.email}`)
        .then((res) => res.json())
        .then((data) => setProfile(data))
        .catch(() => console.log("Navbar refresh failed"));
    };
    window.addEventListener("profile-updated", handleProfileUpdate);
    return () => window.removeEventListener("profile-updated", handleProfileUpdate);
  }, [sessionUser?.email]);

  if (isPending) return null;

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
    toast.success("You are successfully signed out");
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/", icon: "mdi:home-outline", activeIcon: "mdi:home" },
    { name: "Browse Tasks", href: "/browse-tasks", icon: "mdi:briefcase-outline", activeIcon: "mdi:briefcase" },
    { name: "Browse Freelancers", href: "/browse-freelancers", icon: "mdi:account-group-outline", activeIcon: "mdi:account-group" },
    { name: "Contact Us", href: "/contact", icon: "mdi:email-outline", activeIcon: "mdi:email" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const initials = user.name?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "U";

  const roleBadge = {
    admin:      { label: "Admin",      cls: "bg-violet-100 text-violet-600" },
    client:     { label: "Client",     cls: "bg-sky-100 text-sky-600" },
    freelancer: { label: "Freelancer", cls: "bg-emerald-100 text-emerald-600" },
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-md backdrop-blur-xl border-b border-slate-200/60"
            : "bg-white/80 shadow-sm backdrop-blur-lg border-b border-white/30"
        }`}
      >
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* ── LEFT: Hamburger + Logo ── */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 md:hidden"
              aria-label="Toggle menu"
            >
              <Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} className="text-xl" />
            </button>

            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/footerlogo.png"
                alt="SkillSwap"
                height={48}
                width={160}
                className="h-11 w-auto object-contain"
              />
            </Link>
          </div>

          {/* ── CENTER: Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-[#dd9787]/10 text-[#dd9787]"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  <Icon
                    icon={isActive(link.href) ? link.activeIcon : link.icon}
                    className="text-base shrink-0"
                  />
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#dd9787]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── RIGHT: Auth area ── */}
          <div className="flex items-center gap-2 sm:gap-3">
            {sessionUser ? (
              <>
                {/* Notification bell */}
                <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
                  <Icon icon="mdi:bell-outline" className="text-lg" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#dd9787] ring-2 ring-white" />
                </button>

                {/* Avatar dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((p) => !p)}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100"
                  >
                    {/* Avatar */}
                    <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-lg">
                      {user.image ? (
                        <Image src={user.image} alt={user.name} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#678d58] to-[#74d3ae] text-[10px] font-bold text-white">
                          {initials}
                        </div>
                      )}
                    </div>
                    {/* Name — hidden on small screens */}
                    <span className="hidden max-w-[90px] truncate text-xs font-semibold text-slate-700 sm:block">
                      {user.name}
                    </span>
                    <Icon
                      icon="mdi:chevron-down"
                      className={`hidden text-slate-400 text-sm transition-transform sm:block ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown panel */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-slate-200 bg-white py-1.5 shadow-xl ring-1 ring-black/5">
                      {/* User info header */}
                      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl">
                          {user.image ? (
                            <Image src={user.image} alt={user.name} fill className="object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#678d58] to-[#74d3ae] text-sm font-bold text-white">
                              {initials}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">{user.name}</p>
                          <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${roleBadge[user.role]?.cls || "bg-slate-100 text-slate-500"}`}>
                            {roleBadge[user.role]?.label || "User"}
                          </span>
                        </div>
                      </div>

                      {/* Menu items */}
                      {[
                        { label: "Dashboard", href: dashboardPath, icon: "mdi:view-dashboard-outline" },
                        { label: "My Profile", href: "/profile", icon: "mdi:account-outline" },
                        { label: "Settings", href: "/settings", icon: "mdi:cog-outline" },
                      ].map(({ label, href, icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                        >
                          <Icon icon={icon} className="text-base text-slate-400" />
                          {label}
                        </Link>
                      ))}

                      <div className="my-1 border-t border-slate-100" />

                      <button
                        onClick={() => { setDropdownOpen(false); handleLogOut(); }}
                        className="flex cursor-pointer w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                      >
                        <Icon icon="mdi:logout" className="text-base" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="hidden rounded-xl bg-gradient-to-r from-[#678d58] to-[#74d3ae] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:block"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* ── MOBILE MENU ── */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-slate-100 bg-white/95 px-4 pb-5 pt-3">

            {/* Mobile user info (if logged in) */}
            {sessionUser && (
              <div className="mb-3 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl">
                  {user.image ? (
                    <Image src={user.image} alt={user.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#678d58] to-[#74d3ae] text-sm font-bold text-white">
                      {initials}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                  <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${roleBadge[user.role]?.cls || "bg-slate-100 text-slate-500"}`}>
                    {roleBadge[user.role]?.label || "User"}
                  </span>
                </div>
              </div>
            )}

            {/* Nav links */}
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                      isActive(link.href)
                        ? "bg-[#dd9787]/10 text-[#dd9787]"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                    }`}
                  >
                    <Icon icon={isActive(link.href) ? link.activeIcon : link.icon} className="text-base shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile auth buttons / quick links */}
            {sessionUser ? (
              <div className="mt-3 flex flex-col gap-1 border-t border-slate-100 pt-3">
                {[
                  { label: "Dashboard", href: dashboardPath, icon: "mdi:view-dashboard-outline" },
                  { label: "My Profile", href: "/profile", icon: "mdi:account-outline" },
                  { label: "Settings", href: "/settings", icon: "mdi:cog-outline" },
                ].map(({ label, href, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                  >
                    <Icon icon={icon} className="text-base text-slate-400" />
                    {label}
                  </Link>
                ))}
                <button
                  onClick={() => { setIsMenuOpen(false); handleLogOut(); }}
                  className="mt-1 flex cursor-pointer w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                  <Icon icon="mdi:logout" className="text-base" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#678d58] to-[#74d3ae] py-2.5 text-center text-sm font-semibold text-white shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
