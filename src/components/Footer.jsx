"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { FaFacebookF } from "react-icons/fa";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      toast.success("🎉 You're subscribed! Welcome aboard.");
      setEmail("");
      setLoading(false);
    }, 800);
  };

  const socials = [
    { icon: <FaXTwitter />, href: "/", hoverColor: "hover:text-white hover:border-white/40" },
    { icon: <FaGithub />, href: "/", hoverColor: "hover:text-white hover:border-white/40" },
    { icon: <FaFacebookF />, href: "/", hoverColor: "hover:text-[#1877F2] hover:border-[#1877F2]/50" },
    { icon: <FaLinkedin />, href: "/", hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2]/50" },
  ];

  const links = [
    {
      title: "Explore",
      items: [
        { label: "Home", href: "/" },
        { label: "Browse Tasks", href: "/tasks" },
        { label: "Freelancers", href: "/freelancers" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/faq" },
        { label: "Help Center", href: "/help" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl sm:h-72 sm:w-72 lg:h-80 lg:w-80" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl sm:h-72 sm:w-72 lg:h-80 lg:w-80" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-900/10 blur-3xl lg:h-96 lg:w-96" />

      {/* Top gradient border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-6">

        {/* ══ SECTION 1 — Brand + Newsletter ══ */}
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">

          {/* Brand */}
          <div className="flex flex-col">
            <Link href="/" className="inline-flex w-fit">
              <Image
                src="/footerlogo.png"
                alt="AlignTask Logo"
                height={40}
                width={150}
                className="h-14 w-auto object-contain sm:h-16"
              />
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-7 text-slate-400 sm:mt-4 sm:max-w-sm sm:text-sm">
              Connect with talented freelancers and get your work done faster,
              smarter, and more efficiently — from anywhere in the world.
            </p>

            {/* Socials */}
            <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
              {socials.map(({ icon, href, hoverColor }, i) => (
                <a
                  key={i}
                  href={href}
                  className={`group flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 text-sm transition-all duration-200 hover:scale-110 hover:bg-white/10 sm:h-10 sm:w-10 sm:text-base ${hoverColor}`}
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Trust badge */}
            <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/8 px-3 py-1.5 text-xs text-emerald-400 sm:mt-7 sm:px-4 sm:py-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
              Trusted by 12,000+ freelancers worldwide
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/3 p-5 backdrop-blur-xl sm:p-6 lg:p-7">
            <div className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-400">
              Newsletter
            </div>
            <h3 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
              Stay in the loop
            </h3>
            <p className="mt-1.5 text-xs leading-6 text-slate-400 sm:mt-2 sm:text-sm">
              Get the latest freelance opportunities, platform updates, and
              productivity tips — straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:flex-row sm:gap-3">
              <div className="relative flex-1">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none sm:text-sm" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/8 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/12 focus:ring-2 focus:ring-emerald-500/15 sm:h-12 sm:pl-10 sm:pr-4"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full cursor-pointer rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 text-sm font-semibold text-black shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-400 hover:to-emerald-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed sm:h-12 sm:w-auto sm:px-6"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </form>

            <p className="mt-2.5 text-xs text-slate-600">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent sm:my-10 lg:my-12" />

        {/* ══ SECTION 2 — Links + Contact ══ */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-4 md:gap-x-10 lg:gap-x-12">

          {links.map(({ title, items }) => (
            <div key={title}>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50 sm:mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-emerald-400 sm:text-sm"
                    >
                      <span className="h-px w-0 shrink-0 bg-emerald-400 transition-all duration-200 group-hover:w-3" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact — full width on smallest screens */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50 sm:mb-4">
              Contact
            </h4>
            <div className="space-y-2.5 sm:space-y-3">
              {[
                { icon: <FaEnvelope />, text: "support@skillswap.com" },
                { icon: <FaPhone />, text: "+91373512893546" },
                { icon: <FaLocationDot />, text: "Dhaka, Bangladesh" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-2.5 text-xs text-slate-400 sm:gap-3 sm:text-sm">
                  <span className="mt-0.5 shrink-0 text-emerald-500/70">{icon}</span>
                  <span className="leading-snug break-all sm:break-normal">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent sm:my-10" />

        {/* ══ BOTTOM BAR ══ */}
        <div className="flex flex-col items-center gap-4 text-[14px] text-slate-500 sm:flex-row sm:justify-between sm:gap-0">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 sm:justify-end">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms & Conditions", href: "/terms-and-conditions" },
              { label: "Cookies Policy", href: "/cookies-policy" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors hover:text-emerald-400"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;