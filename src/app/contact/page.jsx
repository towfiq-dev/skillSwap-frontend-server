"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaClock,
} from "react-icons/fa6";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: "Email us",
    value: "support@skillswap.com",
    sub: "We reply within 24 hours",
    color: "bg-emerald-500/15 text-emerald-400",
  },
  {
    icon: <FaPhone />,
    label: "Call us",
    value: "+880 123 456 789",
    sub: "Sat – Thu, 9am – 6pm",
    color: "bg-sky-500/15 text-sky-400",
  },
  {
    icon: <FaLocationDot />,
    label: "Visit us",
    value: "Dhaka, Bangladesh",
    sub: "Gulshan-2, Dhaka 1212",
    color: "bg-violet-500/15 text-violet-400",
  },
  {
    icon: <FaClock />,
    label: "Working hours",
    value: "Sat – Thu",
    sub: "9:00 AM – 6:00 PM (BST)",
    color: "bg-amber-500/15 text-amber-400",
  },
];

const faqs = [
  {
    q: "How long does it take to get a reply?",
    a: "We typically respond within 24 hours on business days.",
  },
  {
    q: "Can I report a problem with a freelancer?",
    a: "Yes — use the contact form and select 'Report an Issue'. Our team reviews every report.",
  },
  {
    q: "Is SkillSwap available outside Bangladesh?",
    a: "Absolutely. SkillSwap is a global platform open to freelancers and clients worldwide.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("✅ Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f9f7]">

      {/* ══ HERO ══ */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-[#1a2e1a] to-slate-900 px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">

        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/15 blur-3xl sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute -bottom-10 right-0 h-52 w-52 rounded-full bg-emerald-700/10 blur-3xl sm:h-72 sm:w-72" />

        <div className="relative mx-auto max-w-3xl text-center text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400 sm:px-4 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Get in touch
          </div>

          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            We'd love to{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              hear from you
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400 sm:mt-5 sm:max-w-xl sm:text-base lg:text-lg">
            Have a question, idea, or issue? Drop us a message and our team will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* ══ INFO CARDS ══ */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {contactInfo.map(({ icon, label, value, sub, color }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-col sm:gap-3 sm:p-5"
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm sm:h-10 sm:w-10 sm:text-base ${color}`}>
                {icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">{label}</p>
                <p className="mt-0.5 truncate text-sm font-semibold text-slate-800 lg:text-base">{value}</p>
                <p className="mt-0.5 text-[11px] text-slate-400 sm:text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FORM + SIDEBAR ══ */}
      <section className="mx-auto mt-10 w-full max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-10 xl:gap-12">

          {/* FORM */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
              <h2 className="text-lg font-bold text-slate-800 sm:text-xl lg:text-2xl">Send a message</h2>
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">Fill in the form and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 sm:mt-6">

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
                      Your name
                    </label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rahim Islam"
                      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15 sm:h-11 sm:px-4"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
                      Email address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="rahim@email.com"
                      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15 sm:h-11 sm:px-4"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
                    Subject
                  </label>
                  <select
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15 sm:h-11 sm:px-4"
                  >
                    <option value="" disabled>Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="report">Report an Issue</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15 sm:px-4 sm:py-3"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 flex cursor-pointer h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#678d58] to-emerald-400 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:h-12 sm:w-auto sm:self-start sm:px-8"
                >
                  {loading ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send message →"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="flex flex-col gap-4 lg:col-span-2 lg:gap-5">

            {/* Map */}
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <iframe
                title="SkillSwap Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.356!2d90.4152!3d23.7937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzM3LjMiTiA5MMKwMjQnNTQuNyJF!5e0!3m2!1sen!2sbd!4v1"
                width="100%"
                height="200"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[200px] sm:h-[220px] lg:h-[210px] xl:h-[230px]"
              />
            </div>

            {/* Social links */}
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                Find us on
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:grid-cols-1 sm:gap-3 md:grid-cols-2 lg:grid-cols-1">
                {[
                  { icon: <FaFacebookF />, label: "Facebook", handle: "@SkillSwap", color: "text-[#1877F2] bg-[#1877F2]/10" },
                  { icon: <FaTwitter />, label: "Twitter / X", handle: "@SkillSwap", color: "text-slate-700 bg-slate-100" },
                  { icon: <FaLinkedin />, label: "LinkedIn", handle: "SkillSwap", color: "text-[#0A66C2] bg-[#0A66C2]/10" },
                  { icon: <FaGithub />, label: "GitHub", handle: "skillswap-dev", color: "text-slate-800 bg-slate-100" },
                ].map(({ icon, label, handle, color }) => (
                  <div key={label} className="flex items-center gap-2.5 sm:gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm sm:h-9 sm:w-9 ${color}`}>
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-700">{label}</p>
                      <p className="truncate text-[11px] text-slate-400">{handle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="mx-auto mt-12 w-full max-w-3xl px-4 pb-16 sm:mt-16 sm:px-6 sm:pb-20 lg:mt-20 lg:px-8 lg:pb-24">
        <div className="mb-6 text-center sm:mb-8 lg:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 sm:text-xs">FAQ</p>
          <h2 className="mt-2 text-xl font-bold text-slate-800 sm:text-2xl lg:text-3xl">Common questions</h2>
        </div>

        <div className="flex flex-col gap-2.5 sm:gap-3">
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-semibold text-slate-800 transition-colors hover:text-emerald-600 sm:px-5 sm:py-4 sm:text-base"
              >
                <span>{q}</span>
                <span className={`shrink-0 text-xl font-light text-slate-400 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {openFaq === i && (
                <div className="border-t border-slate-100 px-4 pb-3.5 pt-3 text-sm leading-7 text-slate-500 sm:px-5 sm:pb-4">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}