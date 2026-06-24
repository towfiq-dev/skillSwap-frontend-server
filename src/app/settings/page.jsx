"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaUser, FaLock, FaBell, FaShield, FaTrash,
  FaBriefcase, FaStar, FaChevronRight, FaCrown,
} from "react-icons/fa6";

// ─── mock: replace with real session/auth data ───
const MOCK_USER = {
  role: "freelancer", // change to "admin" | "client" | "freelancer"
  name: "Towfiqul Islam",
  email: "towfiq@skillswap.com",
  avatar: "",
  phone: "+880 171 234 5678",
  location: "Dhaka, Bangladesh",
  bio: "Full-stack developer with 4 years of experience building web apps.",
  skills: "React, Next.js, Node.js, Tailwind",
  hourlyRate: "25",
  availability: "available",
  website: "https://towfiq.dev",
  company: "SkillSwap Ltd.",
  companySize: "11-50",
};

const TABS = {
  admin: [
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "security", label: "Security", icon: <FaLock /> },
    { key: "notifications", label: "Notifications", icon: <FaBell /> },
    { key: "platform", label: "Platform", icon: <FaCrown /> },
    { key: "danger", label: "Danger Zone", icon: <FaShield /> },
  ],
  client: [
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "security", label: "Security", icon: <FaLock /> },
    { key: "notifications", label: "Notifications", icon: <FaBell /> },
    { key: "billing", label: "Billing", icon: <FaBriefcase /> },
    { key: "danger", label: "Danger Zone", icon: <FaShield /> },
  ],
  freelancer: [
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "security", label: "Security", icon: <FaLock /> },
    { key: "notifications", label: "Notifications", icon: <FaBell /> },
    { key: "freelancer", label: "Freelancer", icon: <FaStar /> },
    { key: "danger", label: "Danger Zone", icon: <FaShield /> },
  ],
};

const roleBadge = {
  admin:      { label: "Admin",      cls: "bg-violet-100 text-violet-600" },
  client:     { label: "Client",     cls: "bg-sky-100 text-sky-600" },
  freelancer: { label: "Freelancer", cls: "bg-emerald-100 text-emerald-600" },
};

// ─── reusable field components ───
const Field = ({ label, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</label>
    {children}
    {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
  </div>
);

const TextInput = ({ value, onChange, placeholder, type = "text", disabled }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15 disabled:opacity-50 sm:h-11"
  />
);

const Toggle = ({ checked, onChange, label, sub }) => (
  <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">
    <div>
      <p className="text-sm font-medium text-slate-700">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-emerald-500" : "bg-slate-300"}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  </div>
);

const SaveButton = ({ onClick, loading }) => (
  <div className="flex justify-end border-t border-slate-100 pt-5">
    <button
      onClick={onClick}
      disabled={loading}
      className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[#678d58] to-emerald-400 px-6 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/30 disabled:opacity-60 sm:h-11"
    >
      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Saving…
        </>
      ) : "Save changes"}
    </button>
  </div>
);

// ─── SECTION PANELS ───

function ProfilePanel({ user }) {
  const [form, setForm] = useState({
    name: user.name, email: user.email,
    phone: user.phone, location: user.location, bio: user.bio,
    website: user.website,
  });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const save = () => {
    setLoading(true);
    setTimeout(() => { toast.success("Profile updated!"); setLoading(false); }, 800);
  };

  const initials = form.name?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex flex-col gap-6">
      {/* Avatar row */}
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 sm:flex-row sm:p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#678d58] to-emerald-400 text-xl font-bold text-white sm:h-20 sm:w-20 sm:text-2xl">
          {initials}
        </div>
        <div className="text-center sm:text-left">
          <p className="font-semibold text-slate-800">{form.name}</p>
          <p className="text-sm text-slate-400">{form.email}</p>
          <span className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${roleBadge[user.role].cls}`}>
            {roleBadge[user.role].label}
          </span>
        </div>
        <button className="ml-auto hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 sm:block">
          Change photo
        </button>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-700">Personal information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <TextInput value={form.name} onChange={set("name")} placeholder="Your name" />
          </Field>
          <Field label="Email address">
            <TextInput value={form.email} onChange={set("email")} type="email" placeholder="you@email.com" />
          </Field>
          <Field label="Phone">
            <TextInput value={form.phone} onChange={set("phone")} placeholder="+880..." />
          </Field>
          <Field label="Location">
            <TextInput value={form.location} onChange={set("location")} placeholder="City, Country" />
          </Field>
          <Field label="Website" hint="Optional personal or portfolio link">
            <TextInput value={form.website} onChange={set("website")} placeholder="https://" />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Bio" hint="A short intro shown on your public profile">
            <textarea
              rows={3}
              value={form.bio}
              onChange={set("bio")}
              placeholder="Tell others about yourself..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15"
            />
          </Field>
        </div>
        <div className="mt-5">
          <SaveButton onClick={save} loading={loading} />
        </div>
      </div>
    </div>
  );
}

function SecurityPanel() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [twofa, setTwofa] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const save = () => {
    if (form.next !== form.confirm) { toast.error("Passwords don't match."); return; }
    if (form.next.length < 6) { toast.error("Password must be at least 6 characters."); return; }
    setLoading(true);
    setTimeout(() => { toast.success("Password changed!"); setForm({ current: "", next: "", confirm: "" }); setLoading(false); }, 800);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-700">Change password</h3>
        <div className="flex flex-col gap-4">
          <Field label="Current password">
            <TextInput type="password" value={form.current} onChange={set("current")} placeholder="••••••••" />
          </Field>
          <Field label="New password" hint="Min 6 characters with uppercase & lowercase">
            <TextInput type="password" value={form.next} onChange={set("next")} placeholder="••••••••" />
          </Field>
          <Field label="Confirm new password">
            <TextInput type="password" value={form.confirm} onChange={set("confirm")} placeholder="••••••••" />
          </Field>
        </div>
        <div className="mt-5">
          <SaveButton onClick={save} loading={loading} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-700">Two-factor authentication</h3>
        <Toggle
          checked={twofa}
          onChange={(v) => { setTwofa(v); toast.info(v ? "2FA enabled." : "2FA disabled."); }}
          label="Enable 2FA"
          sub="Add an extra layer of security to your account."
        />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-1 text-sm font-bold text-slate-700">Active sessions</h3>
        <p className="mb-4 text-xs text-slate-400">Devices currently signed in to your account</p>
        {[
          { device: "Chrome · Windows 11", location: "Dhaka, Bangladesh", active: true },
          { device: "Safari · iPhone 14", location: "Chittagong, Bangladesh", active: false },
        ].map(({ device, location, active }) => (
          <div key={device} className="mb-2.5 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-700">{device}</p>
              <p className="text-xs text-slate-400">{location}</p>
            </div>
            {active
              ? <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-600">Current</span>
              : <button onClick={() => toast.success("Session revoked.")} className="text-xs font-medium text-red-400 hover:text-red-600 transition">Revoke</button>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsPanel() {
  const [settings, setSettings] = useState({
    emailNewMessage: true, emailTaskUpdate: true, emailProposal: false,
    pushNewMessage: true, pushTaskUpdate: false, pushProposal: true,
  });
  const [loading, setLoading] = useState(false);
  const toggle = (k) => setSettings((p) => ({ ...p, [k]: !p[k] }));

  const save = () => {
    setLoading(true);
    setTimeout(() => { toast.success("Notification preferences saved!"); setLoading(false); }, 700);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-700">Email notifications</h3>
        <div className="flex flex-col gap-2.5">
          <Toggle checked={settings.emailNewMessage} onChange={() => toggle("emailNewMessage")} label="New message" sub="When someone sends you a message" />
          <Toggle checked={settings.emailTaskUpdate} onChange={() => toggle("emailTaskUpdate")} label="Task updates" sub="Status changes on tasks you're involved in" />
          <Toggle checked={settings.emailProposal} onChange={() => toggle("emailProposal")} label="New proposal" sub="When a freelancer applies to your task" />
        </div>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-700">Push notifications</h3>
        <div className="flex flex-col gap-2.5">
          <Toggle checked={settings.pushNewMessage} onChange={() => toggle("pushNewMessage")} label="New message" sub="In-app alerts for new messages" />
          <Toggle checked={settings.pushTaskUpdate} onChange={() => toggle("pushTaskUpdate")} label="Task updates" sub="Real-time task status notifications" />
          <Toggle checked={settings.pushProposal} onChange={() => toggle("pushProposal")} label="New proposal" sub="Instant alerts when proposals arrive" />
        </div>
        <div className="mt-5">
          <SaveButton onClick={save} loading={loading} />
        </div>
      </div>
    </div>
  );
}

function FreelancerPanel({ user }) {
  const [form, setForm] = useState({
    skills: user.skills, hourlyRate: user.hourlyRate, availability: user.availability,
  });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const save = () => {
    setLoading(true);
    setTimeout(() => { toast.success("Freelancer profile updated!"); setLoading(false); }, 800);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-700">Work profile</h3>
        <div className="flex flex-col gap-4">
          <Field label="Skills" hint="Comma-separated list of your skills">
            <TextInput value={form.skills} onChange={set("skills")} placeholder="React, Design, Writing..." />
          </Field>
          <Field label="Hourly rate (USD)" hint="Your default rate shown to clients">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">$</span>
              <input
                type="number"
                value={form.hourlyRate}
                onChange={set("hourlyRate")}
                placeholder="25"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-4 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15 sm:h-11"
              />
            </div>
          </Field>
          <Field label="Availability">
            <select
              value={form.availability}
              onChange={set("availability")}
              className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-400/15 sm:h-11"
            >
              <option value="available">Available for work</option>
              <option value="busy">Currently busy</option>
              <option value="unavailable">Not available</option>
            </select>
          </Field>
        </div>
        <div className="mt-5">
          <SaveButton onClick={save} loading={loading} />
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
            <FaStar className="text-sm" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">Boost your profile visibility</p>
            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              Complete your bio, add a profile photo, and set your hourly rate to appear higher in search results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BillingPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-1 text-sm font-bold text-slate-700">Current plan</h3>
        <p className="mb-4 text-xs text-slate-400">You are on the free plan</p>
        <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <div>
            <p className="font-semibold text-emerald-700">Free Plan</p>
            <p className="text-xs text-emerald-600">Up to 5 active tasks · Basic support</p>
          </div>
          <button
            onClick={() => toast.info("Upgrade coming soon!")}
            className="rounded-xl bg-gradient-to-r from-[#678d58] to-emerald-400 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5"
          >
            Upgrade
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-700">Payment methods</h3>
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-8 text-center">
          <p className="text-sm font-medium text-slate-500">No payment method added</p>
          <button
            onClick={() => toast.info("Payment setup coming soon!")}
            className="mt-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            + Add payment method
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-700">Billing history</h3>
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <p className="text-sm text-slate-400">No transactions yet</p>
        </div>
      </div>
    </div>
  );
}

function PlatformPanel() {
  const [settings, setSettings] = useState({
    maintenance: false, newRegistrations: true, emailVerification: true,
  });
  const [loading, setLoading] = useState(false);
  const toggle = (k) => setSettings((p) => ({ ...p, [k]: !p[k] }));

  const save = () => {
    setLoading(true);
    setTimeout(() => { toast.success("Platform settings saved!"); setLoading(false); }, 700);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4 sm:p-5">
        <div className="flex items-center gap-2.5">
          <FaCrown className="text-violet-500" />
          <p className="text-sm font-semibold text-violet-700">Admin-only settings</p>
        </div>
        <p className="mt-1 text-xs text-violet-500">These controls affect all users on the platform.</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-700">Platform controls</h3>
        <div className="flex flex-col gap-2.5">
          <Toggle checked={settings.maintenance} onChange={() => toggle("maintenance")} label="Maintenance mode" sub="Temporarily block access for non-admin users" />
          <Toggle checked={settings.newRegistrations} onChange={() => toggle("newRegistrations")} label="Allow new registrations" sub="Let new users sign up on the platform" />
          <Toggle checked={settings.emailVerification} onChange={() => toggle("emailVerification")} label="Require email verification" sub="Users must verify email before accessing the platform" />
        </div>
        <div className="mt-5">
          <SaveButton onClick={save} loading={loading} />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-700">Quick stats</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Total users", value: "12,430" },
            { label: "Active tasks", value: "3,210" },
            { label: "Freelancers", value: "5,890" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-slate-50 px-4 py-3 text-center">
              <p className="text-lg font-bold text-emerald-600">{value}</p>
              <p className="text-[11px] text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DangerPanel() {
  const [confirm, setConfirm] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-red-100 bg-white p-5 sm:p-6">
        <h3 className="mb-1 text-sm font-bold text-red-600">Deactivate account</h3>
        <p className="mb-4 text-xs text-slate-400">Your account will be hidden from the platform. You can reactivate anytime.</p>
        <button
          onClick={() => toast.warn("Account deactivation requires confirmation.")}
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          Deactivate account
        </button>
      </div>

      <div className="rounded-2xl border border-red-200 bg-white p-5 sm:p-6">
        <h3 className="mb-1 text-sm font-bold text-red-600">Delete account</h3>
        <p className="mb-4 text-xs text-slate-400">
          This action is permanent and cannot be undone. All your data, tasks, and reviews will be erased.
        </p>
        <Field label={`Type "DELETE" to confirm`}>
          <TextInput value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="DELETE" />
        </Field>
        <div className="mt-4">
          <button
            disabled={confirm !== "DELETE"}
            onClick={() => toast.error("Account deletion requested.")}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FaTrash className="text-xs" />
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───
export default function SettingsPage() {
  const user = MOCK_USER;
  const tabs = TABS[user.role];
  const [activeTab, setActiveTab] = useState("profile");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeTabObj = tabs.find((t) => t.key === activeTab);

  const renderPanel = () => {
    switch (activeTab) {
      case "profile":      return <ProfilePanel user={user} />;
      case "security":     return <SecurityPanel />;
      case "notifications":return <NotificationsPanel />;
      case "freelancer":   return <FreelancerPanel user={user} />;
      case "billing":      return <BillingPanel />;
      case "platform":     return <PlatformPanel />;
      case "danger":       return <DangerPanel />;
      default:             return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f9f7]">

      {/* ── PAGE HEADER ── */}
      <div className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <div>
            <h1 className="text-lg font-bold text-slate-800 sm:text-xl">Settings</h1>
            <p className="text-xs text-slate-400 sm:text-sm">Manage your account preferences</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${roleBadge[user.role].cls}`}>
            {roleBadge[user.role].label}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8 xl:gap-10">

          {/* ── SIDEBAR (desktop) ── */}
          <aside className="hidden w-56 shrink-0 lg:block xl:w-60">
            <div className="sticky top-6 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
              {/* user mini card */}
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#678d58] to-emerald-400 text-xs font-bold text-white">
                  {user.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-700">{user.name}</p>
                  <p className="truncate text-[10px] text-slate-400">{user.email}</p>
                </div>
              </div>

              <nav className="flex flex-col gap-0.5">
                {tabs.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      activeTab === key
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    } ${key === "danger" ? "mt-2 border-t border-slate-100 pt-3 text-red-400 hover:bg-red-50 hover:text-red-500" : ""}`}
                  >
                    <span className={`text-sm ${activeTab === key ? "text-emerald-500" : ""} ${key === "danger" ? "text-red-400" : ""}`}>
                      {icon}
                    </span>
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── MOBILE TAB PICKER ── */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen((p) => !p)}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-emerald-500">{activeTabObj?.icon}</span>
                <span className="text-sm font-semibold text-slate-700">{activeTabObj?.label}</span>
              </div>
              <FaChevronRight className={`text-slate-400 text-xs transition-transform ${mobileMenuOpen ? "rotate-90" : ""}`} />
            </button>

            {mobileMenuOpen && (
              <div className="mt-1.5 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md">
                {tabs.map(({ key, label, icon }) => (
                  <button
                    key={key}
                    onClick={() => { setActiveTab(key); setMobileMenuOpen(false); }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors ${
                      activeTab === key ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:bg-slate-50"
                    } ${key === "danger" ? "border-t border-slate-100 text-red-400" : ""}`}
                  >
                    <span className={`${activeTab === key ? "text-emerald-500" : ""} ${key === "danger" ? "text-red-400" : ""}`}>
                      {icon}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── CONTENT ── */}
          <main className="min-w-0 flex-1">
            <div className="mb-4 hidden lg:block">
              <h2 className="text-base font-bold text-slate-800">{activeTabObj?.label}</h2>
              <div className="mt-1 h-0.5 w-8 rounded-full bg-emerald-400" />
            </div>
            {renderPanel()}
          </main>
        </div>
      </div>
    </div>
  );
}