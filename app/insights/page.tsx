"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { NewsSection } from "@/components/NewsSection"

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb]">

      <Navbar />

      {/* HERO */}
      <div className="text-center pt-32 pb-10 px-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Vestory <span className="text-gray-400">Insights</span>
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Smart financial updates, simplified for you
        </p>
      </div>

      <NewsSection />

      <div className="mt-12">
        <Footer />
      </div>

    </div>
  )
}