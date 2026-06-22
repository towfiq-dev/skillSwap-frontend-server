"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Search,
  Send,
  CreditCard,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const clientSteps = [
  {
    icon: Briefcase,
    title: "Launch Your Project",
    desc: "Share your requirements and let skilled professionals discover your opportunity.",
  },
  {
    icon: Search,
    title: "Review Top Matches",
    desc: "Compare proposals, portfolios, and ratings to find the perfect fit.",
  },
  {
    icon: CreditCard,
    title: "Collaborate Securely",
    desc: "Track progress, communicate easily, and release payments with confidence.",
  },
];

const freelancerSteps = [
  {
    icon: Search,
    title: "Explore Opportunities",
    desc: "Discover projects tailored to your expertise and career goals.",
  },
  {
    icon: Send,
    title: "Make Your Pitch",
    desc: "Present your skills, timeline, and pricing to stand out from competitors.",
  },
  {
    icon: Rocket,
    title: "Grow & Earn",
    desc: "Deliver quality work, build reputation, and receive secure payouts.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
    },
  }),
};

export default function SmartWorkflow() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f4f9f2] via-white to-[#eef8ea]" />

      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-[#678d58]/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-green-300/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#678d58]/10 px-4 py-2 text-sm font-medium text-[#678d58]">
            <Sparkles size={16} />
            Smart Workflow
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Turn Ideas Into
            <span className="block text-[#678d58]">
              Successful Projects
            </span>
          </h2>

          <p className="mt-5 text-gray-600 text-base md:text-lg">
            Whether you're hiring talent or offering expertise, our platform
            simplifies every step from connection to completion.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {[
            { value: "10K+", label: "Active Projects" },
            { value: "5K+", label: "Professionals" },
            { value: "98%", label: "Success Rate" },
            { value: "24/7", label: "Support" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl bg-white/70 border border-white rounded-2xl p-6 text-center shadow-lg"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-[#678d58]">
                {item.value}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mt-16">
          {/* Client */}
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white shadow-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-[#678d58] text-white flex items-center justify-center">
                <Briefcase size={22} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  For Businesses
                </h3>
                <p className="text-gray-500 text-sm">
                  Hire trusted professionals effortlessly
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {clientSteps.map((step, i) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="group rounded-2xl border bg-white p-5 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-xl bg-[#678d58]/10 flex items-center justify-center text-[#678d58]">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg text-gray-900">
                          {step.title}
                        </h4>

                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Freelancer */}
          <div className="rounded-3xl bg-[#678d58] text-white shadow-xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-2xl" />

            <div className="flex items-center gap-3 mb-8 relative">
              <div className="h-12 w-12 rounded-2xl bg-white text-[#678d58] flex items-center justify-center">
                <Rocket size={22} />
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  For Professionals
                </h3>
                <p className="text-white/80 text-sm">
                  Build your freelance career faster
                </p>
              </div>
            </div>

            <div className="space-y-5 relative">
              {freelancerSteps.map((step, i) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5"
                  >
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg">
                          {step.title}
                        </h4>

                        <p className="text-white/80 text-sm mt-2 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl bg-white/10 p-5 border border-white/20">
              <div className="flex items-center gap-3">
                <ShieldCheck size={22} />
                <span className="font-semibold">
                  Safe Payments & Trusted Collaboration
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}