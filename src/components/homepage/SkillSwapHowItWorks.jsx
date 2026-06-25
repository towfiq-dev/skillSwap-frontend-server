'use client'
import { useState } from "react";

const steps = {
  client: [
    {
      num: "01",
      icon: "📝",
      title: "Post a Task",
      desc: "Describe your project, set your budget and deadline. Your task goes live in just 2 minutes.",
    },
    {
      num: "02",
      icon: "📩",
      title: "Receive Proposals",
      desc: "Skilled freelancers will express interest. Review their portfolios and ratings to make the right call.",
    },
    {
      num: "03",
      icon: "💬",
      title: "Choose the Best Fit",
      desc: "Chat, discuss, and hire your preferred freelancer with full confidence.",
    },
    {
      num: "04",
      icon: "✅",
      title: "Pay Securely",
      desc: "Payment is only released once the work is done and you're satisfied. Not a moment before.",
    },
  ],
  freelancer: [
    {
      num: "01",
      icon: "👤",
      title: "Build Your Profile",
      desc: "Showcase your skills, portfolio, and rates. Your first impression is everything.",
    },
    {
      num: "02",
      icon: "🔍",
      title: "Browse Tasks",
      desc: "Explore thousands of projects. Filter by category, budget, and skill to find your perfect match.",
    },
    {
      num: "03",
      icon: "📄",
      title: "Send a Proposal",
      desc: "Present your experience and approach. A great proposal is what sets you apart.",
    },
    {
      num: "04",
      icon: "💸",
      title: "Get Paid",
      desc: "Deliver your work and get paid directly to your account. Fast and secure.",
    },
  ],
};

const guarantees = [
  {
    icon: "🛡️",
    title: "Secure Payments",
    desc: "Funds are held safely until the work is complete. Your money is fully protected.",
  },
  {
    icon: "⭐",
    title: "Verified Freelancers",
    desc: "Browse ratings and reviews to hire the best talent with peace of mind.",
  },
  {
    icon: "🎧",
    title: "24/7 Support",
    desc: "Our support team is always here whenever you need help.",
  },
  {
    icon: "🔄",
    title: "Revision Guarantee",
    desc: "Not satisfied? Get free revisions. We stand behind every result.",
  },
];

const stats = [
  { value: "12K+", label: "Successful Projects" },
  { value: "98%", label: "Satisfied Clients" },
  { value: "35K+", label: "Skilled Freelancers" },
  { value: "4.9★", label: "Average Rating" },
];

export default function SkillSwapHowItWorks() {
  const [activeTab, setActiveTab] = useState("client");
  const [activeStep, setActiveStep] = useState(null);

  const currentSteps = steps[activeTab];

  return (
    <section
      style={{
        background: "#f8fdf9",
        padding: "72px 24px",
        fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#40916c",
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#40916c",
            }}
          >
            Smart Workflow
          </span>
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#40916c",
            }}
          />
        </div>

        {/* Heading */}
        <h2
          style={{
            textAlign: "center",
            fontSize: 34,
            fontWeight: 700,
            color: "#1b4332",
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}
        >
          Your Journey to{" "}
          <span style={{ color: "#40916c" }}>Success Starts Here</span>
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "#555",
            maxWidth: 480,
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          Post a task or find work — reach your goal in just a few simple steps.
        </p>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 40,
          }}
        >
          {[
            { key: "client", label: "I'm a Client" },
            { key: "freelancer", label: "I'm a Freelancer" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setActiveStep(null);
              }}
              style={{
                padding: "10px 24px",
                borderRadius: 99,
                border:
                  activeTab === tab.key
                    ? "2px solid #1b4332"
                    : "1.5px solid #cce3d5",
                background: activeTab === tab.key ? "#1b4332" : "#fff",
                color: activeTab === tab.key ? "#d8f3dc" : "#40916c",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 48,
            position: "relative",
          }}
        >
          {currentSteps.map((step, i) => (
            <div
              key={step.num}
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              style={{
                background: activeStep === i ? "#1b4332" : "#fff",
                border:
                  activeStep === i
                    ? "2px solid #1b4332"
                    : "1.5px solid #c8e6c9",
                borderRadius: 16,
                padding: "24px 20px",
                cursor: "pointer",
                transition: "all 0.25s",
                position: "relative",
              }}
            >
              {/* Step number */}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: activeStep === i ? "#95d5b2" : "#40916c",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                STEP {step.num}
              </span>

              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: activeStep === i ? "#2d6a4f" : "#d8f3dc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 14,
                }}
              >
                {step.icon}
              </div>

              <p
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: activeStep === i ? "#d8f3dc" : "#1b4332",
                  margin: "0 0 8px",
                }}
              >
                {step.title}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: activeStep === i ? "#95d5b2" : "#666",
                  margin: 0,
                  lineHeight: 1.55,
                }}
              >
                {step.desc}
              </p>

              {/* Arrow connector */}
              {i < currentSteps.length - 1 && (
                <span
                  style={{
                    position: "absolute",
                    right: -14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 20,
                    color: "#74c69d",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div
          style={{
            background: "#1b4332",
            borderRadius: 16,
            padding: "28px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            marginBottom: 32,
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ textAlign: "center", position: "relative" }}>
              {i > 0 && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 1,
                    height: 40,
                    background: "rgba(255,255,255,0.15)",
                    display: "block",
                  }}
                />
              )}
              <span
                style={{
                  display: "block",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#95d5b2",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: 12, color: "#74c69d" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Guarantees */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 40,
          }}
        >
          {guarantees.map((g) => (
            <div
              key={g.title}
              style={{
                background: "#fff",
                border: "1.5px solid #c8e6c9",
                borderRadius: 14,
                padding: "18px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "#d8f3dc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {g.icon}
              </div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1b4332",
                  margin: 0,
                }}
              >
                {g.title}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#666",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {g.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            alignItems: "center",
          }}
        >
          <button
            style={{
              background: "#1b4332",
              color: "#d8f3dc",
              border: "none",
              padding: "12px 28px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Post a Task →
          </button>
          <button
            style={{
              background: "transparent",
              color: "#1b4332",
              border: "1.5px solid #1b4332",
              padding: "12px 28px",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Join as a Freelancer
          </button>
        </div>
      </div>
    </section>
  );
}
