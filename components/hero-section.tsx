"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Wallet } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">

      {/* 🔥 APPLE-STYLE BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        {/* Soft gradient glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-8">

            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
              <Shield className="w-4 h-4" />
              Trusted by growing businesses & professionals
            </div>

            {/* HEADLINE */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
              Finance Your Growth.{" "}
              <span className="text-gray-400">
                Invest Your Future.
              </span>
            </h1>

            {/* SUBTEXT */}
            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              Get access to fast, flexible loans or grow your money with competitive investment returns — all in one place.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">

              <Button className="bg-black text-white hover:bg-black/90 rounded-full px-8 h-14 text-base font-medium">
                <a href="https://wa.me/2348163886181?text=Hello%20I%20am%20interested%20in%20your%20loan%20or%20investment%20services">Get a Loan</a>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                className="rounded-full px-8 h-14 text-base font-medium border border-gray-300 hover:bg-gray-100"
              >
                <a href="https://wa.me/2348163886181?text=Hello%20I%20am%20interested%20in%20your%20loan%20or%20investment%20services">Start Investing</a>
                <TrendingUp className="ml-2 w-5 h-5" />
              </Button>

            </div>

            {/* ✅ FUNDQUEST TRUST LINE (ADDED) */}
            <p className="text-sm text-gray-500">
              Powered by <span className="font-medium text-gray-700"><a href="https://fundquestnigeria.com/">Fundquest</a></span> • We partner with Fundquest to provide structured investment opportunities
            </p>

            {/* STATS */}
            <div className="flex gap-8 pt-6">

              <div>
                <p className="text-2xl font-semibold">₦5B+</p>
                <p className="text-sm text-gray-500">Loans disbursed</p>
              </div>

              <div className="h-10 w-px bg-gray-200" />

              <div>
                <p className="text-2xl font-semibold">18%+</p>
                <p className="text-sm text-gray-500">Avg returns</p>
              </div>

              <div className="h-10 w-px bg-gray-200" />

              <div>
                <p className="text-2xl font-semibold">24hrs</p>
                <p className="text-sm text-gray-500">Approval time</p>
              </div>

            </div>

          </div>

          {/* RIGHT (DASHBOARD) */}
          <div className="relative lg:pl-8">

            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-200">

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Total Balance</p>
                  <p className="text-3xl font-semibold">₦2,450,000</p>
                </div>

                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-black" />
                </div>
              </div>

              {/* Chart bars */}
              <div className="h-40 bg-gray-50 rounded-2xl mb-6 flex items-end justify-around px-4 pb-4">
                {[40, 60, 45, 80, 65, 90, 75].map((h, i) => (
                  <div
                    key={i}
                    className="bg-black/80 rounded-t-lg w-6 transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Portfolio Growth
                </span>
                <span className="text-black font-medium">
                  +18.5% this month
                </span>
              </div>

            </div>

            {/* Floating cards */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden sm:block bg-white border border-gray-200 rounded-xl p-3 shadow-md">
              <p className="text-xs text-gray-500">Returns</p>
              <p className="font-semibold">₦125,400</p>
            </div>

            <div className="absolute -right-6 bottom-10 hidden sm:block bg-white border border-gray-200 rounded-xl p-3 shadow-md">
              <p className="text-xs text-gray-500">Loan Approved</p>
              <p className="font-semibold">₦500,000</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}