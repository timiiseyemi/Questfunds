"use client"

import { Zap, Shield, Sliders, Headphones, Lock, Smartphone } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Fast Access to Funds",
    description:
      "Get loan approvals within 24 hours and access capital when your business needs it most.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Your funds and data are protected with industry-standard security and trusted systems.",
  },
  {
    icon: Sliders,
    title: "Flexible Options",
    description:
      "Choose loan durations or investment plans that align with your financial goals.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Get help whenever you need it with a responsive support team focused on your success.",
  },
  {
    icon: Lock,
    title: "Transparent Process",
    description:
      "No hidden fees or surprises. Everything is clear from application to payout.",
  },
  {
    icon: Smartphone,
    title: "Built for Convenience",
    description:
      "Access and manage everything easily from your phone, wherever you are.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            Why Choose{" "}
            <span className="text-gray-400">QuestFunds</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Built to make financing and investing simple, secure, and accessible for everyone.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-md transition-all duration-300"
            >

              {/* ICON */}
              <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="w-5 h-5 text-black" />
              </div>

              {/* TITLE */}
              <h3 className="text-base font-semibold mb-1">
                {benefit.title}
              </h3>

              {/* DESC */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}