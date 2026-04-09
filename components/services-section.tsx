"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Banknote, TrendingUp, Clock, Percent, Shield } from "lucide-react"

export function ServicesSection() {
  return (
    <section id="loans" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            One Platform.{" "}
            <span className="text-gray-400">Two Ways to Grow.</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Access capital when you need it, or grow your money with structured investment returns.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* LOANS */}
          <Card className="group rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-4">

              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <Banknote className="w-6 h-6 text-black" />
              </div>

              <CardTitle className="text-2xl font-semibold">
                Business Loans
              </CardTitle>

              <p className="text-gray-600 text-sm leading-relaxed">
                Get fast access to working capital to grow and scale your business.
              </p>

            </CardHeader>

            <CardContent className="space-y-5">

              <div className="space-y-3 text-sm">

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Approval within 48 hours</span>
                </div>

                <div className="flex items-center gap-3">
                  <Percent className="w-4 h-4 text-gray-500" />
                  <span>Competitive monthly rates</span>
                </div>

                <div className="flex items-center gap-3">
                  <Banknote className="w-4 h-4 text-gray-500" />
                  <span>Up to ₦100M available</span>
                </div>

              </div>

              <Button className="w-full bg-black text-white hover:bg-black/90 rounded-full h-12 text-sm font-medium">
                <a href="https://wa.me/message/HELVKXSF223SK1">Apply for Loan</a>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

            </CardContent>
          </Card>

          {/* INVEST */}
          <Card id="invest" className="group rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-4">

              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-black" />
              </div>

              <CardTitle className="text-2xl font-semibold">
                Invest & Earn
              </CardTitle>

              <p className="text-gray-600 text-sm leading-relaxed">
                Earn structured returns on your money with flexible investment durations.
              </p>

            </CardHeader>

            <CardContent className="space-y-5">

              <div className="space-y-3 text-sm">

                <div className="flex items-center gap-3">
                  <Percent className="w-4 h-4 text-gray-500" />
                  <span>Up to 18% annual returns</span>
                </div>

                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span>Secure and structured plans</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>Flexible durations (60–365 days)</span>
                </div>

              </div>

              <Button
                variant="outline"
                className="w-full rounded-full h-12 text-sm font-medium border border-gray-300 hover:bg-gray-100"
              >
                  <a href="https://wa.me/message/HELVKXSF223SK1">
                  Start Investing
                  
                </a><ArrowRight className="ml-2 w-4 h-4" />
              </Button>

            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  )
}