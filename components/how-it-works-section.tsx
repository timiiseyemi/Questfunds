"use client"

import { UserPlus, FileCheck, Banknote } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Set Up Your Profile",
    description:
      "Create your account in minutes and get verified quickly. No long forms or unnecessary steps.",
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Choose What You Need",
    description:
      "Apply for a loan or select an investment plan based on your financial goals and timeline.",
  },
  {
    icon: Banknote,
    number: "03",
    title: "Access Funds or Earn Returns",
    description:
      "Get funded fast or start earning returns on your investment with clear, structured payouts.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            How It{" "}
            <span className="text-gray-400">Works</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            A simple, transparent process designed to help you move forward faster.
          </p>
        </div>

        {/* STEPS */}
        <div className="grid md:grid-cols-3 gap-8 relative">

          {/* Subtle connection line */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-px bg-gray-200" />

          {steps.map((step, index) => (
            <div key={index} className="relative">

              <div className="bg-white rounded-3xl p-8 h-full border border-gray-200 hover:shadow-md transition-all duration-300">

                {/* Number */}
                <div className="absolute -top-4 left-8 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 mt-4">
                  <step.icon className="w-6 h-6 text-black" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>

              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}