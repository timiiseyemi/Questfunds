"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Calculator } from "lucide-react"
import { GrowthChart } from "@/components/GrowthChart"

type CalculatorType = "loan" | "investment"

const investmentTiers = [
  { min: 50000, max: 999999, rates: { 60: 0.14, 90: 0.145, 180: 0.15, 365: 0.1525 } },
  { min: 1000000, max: 9999999, rates: { 60: 0.15, 90: 0.1525, 180: 0.16, 365: 0.1675 } },
  { min: 10000000, max: 49999999, rates: { 60: 0.17, 90: 0.175, 180: 0.1825, 365: 0.19 } },
  { min: 50000000, max: 99999999, rates: { 60: 0.185, 90: 0.195, 180: 0.20, 365: 0.2025 } },
  { min: 100000000, max: 249999999, rates: { 60: 0.20, 90: 0.2075, 180: 0.21, 365: 0.215 } },
  { min: 250000000, max: 499999999, rates: { 60: 0.21, 90: 0.215, 180: 0.22, 365: 0.225 } },
]

export function CalculatorSection() {
  const [type, setType] = useState<CalculatorType>("investment")

  // ✅ FIX: loanAmount now number (not slider array)
  const [loanAmount, setLoanAmount] = useState(500000)

  const [loanMonths, setLoanMonths] = useState([6])

  const [amount, setAmount] = useState(100000)
  const [duration, setDuration] = useState(90)

  // INVESTMENT (UNCHANGED)
  const tier = investmentTiers.find(
    (t) => amount >= t.min && amount <= t.max
  )

  let rate = tier?.rates[duration as 60 | 90 | 180 | 365] || 0

  if (amount >= 500000000) {
    rate = 0.23
  }

  const profit = amount * rate * (duration / 365)
  const total = amount + profit

  const format = (num: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(num)

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-NG").format(num)

  const handleWhatsApp = () => {
    const msg = `Hello, I want to invest ₦${formatNumber(amount)} for ${duration} days. Expected return: ${format(profit)}`
    window.open(`https://wa.me/234XXXXXXXXXX?text=${encodeURIComponent(msg)}`)
  }

  // =========================
  // LOAN CALCULATION FIXES
  // =========================

  const isReducing = loanAmount > 10000000

  let monthly = 0
  let totalLoan = 0
  let totalInterest = 0
  let schedule: any[] = []

  if (!isReducing) {
    const interest = loanAmount * 0.04 * loanMonths[0]
    totalLoan = loanAmount + interest
    monthly = totalLoan / loanMonths[0]
    totalInterest = interest
  } else {
    const r = 0.04
    const n = loanMonths[0]

    const emi =
      (loanAmount * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1)

    let balance = loanAmount

    for (let i = 1; i <= n; i++) {
      const interest = balance * r
      const principal = emi - interest
      balance -= principal

      schedule.push({
        month: i,
        balance: Math.max(balance, 0),
      })
    }

    monthly = emi
    totalLoan = emi * n
    totalInterest = totalLoan - loanAmount
  }

  return (
    <section id="calculator" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full text-sm mb-4 backdrop-blur-md">
            <Calculator className="w-4 h-4" />
            Smart Calculator
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold">
            Plan Your{" "}
            <span className="text-gray-400">
              {type === "loan" ? "Loan" : "Investment"}
            </span>
          </h2>
        </div>

        <Card className="rounded-3xl border border-white/20 bg-white/60 backdrop-blur-xl shadow-xl">
          <CardContent className="p-8">

            {/* TOGGLE */}
            <div className="flex mb-10 rounded-full bg-gray-100/70 backdrop-blur p-1">
              {["loan", "investment"].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t as CalculatorType)}
                  className={`flex-1 py-2 rounded-full text-sm transition ${
                    type === t
                      ? "bg-black text-white shadow"
                      : "text-gray-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {type === "investment" ? (
              /* 🔒 UNTOUCHED */
              <div className="grid md:grid-cols-2 gap-10 items-stretch">
                {/* EXACT SAME AS YOUR CODE */}
                <div className="space-y-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm">Amount</label>
                      <input
                        type="text"
                        value={formatNumber(amount)}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/,/g, "")
                          if (!isNaN(Number(raw))) setAmount(Number(raw))
                        }}
                        className="w-full mt-2 h-14 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/40 backdrop-blur focus:ring-2 focus:ring-black outline-none text-lg font-semibold shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="text-sm">Duration</label>
                      <div className="flex gap-2 mt-2">
                        {[60, 90, 180, 365].map((d) => (
                          <button
                            key={d}
                            onClick={() => setDuration(d)}
                            className={`px-4 py-2 rounded-full text-sm transition ${
                              duration === d
                                ? "bg-black text-white shadow"
                                : "bg-white/40 backdrop-blur"
                            }`}
                          >
                            {d} days
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/50 backdrop-blur-lg border border-white/20 shadow-sm space-y-3">
                    <p className="text-gray-500 text-sm">Quick Summary</p>

                    <div className="flex justify-between">
                      <span>Rate</span>
                      <span className="text-xl font-bold">
                        {(rate * 100).toFixed(2)}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span className="text-lg font-bold">
                        {duration} days
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Profit</span>
                      <span className="font-semibold">
                        {format(profit)}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  key={amount + duration}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col justify-between rounded-2xl p-6 space-y-6 border border-white/20 bg-white/60 backdrop-blur-xl shadow-lg"
                >
                  <div>
                    <h3 className="text-sm text-gray-500 mb-4">
                      Investment Projection
                    </h3>

                    <GrowthChart
                      amount={amount}
                      rate={rate}
                      duration={duration}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between pt-4 border-t">
                      <span>Profit</span>
                      <span className="text-lg font-semibold">
                        {format(profit)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Total</span>
                      <span className="font-bold">
                        {format(total)}
                      </span>
                    </div>
                  </div>

                  <Button onClick={handleWhatsApp}>
                    <a href="https://wa.me/2348163886181?text=Hello%20I%20am%20interested%20in%20your%20loan%20or%20investment%20services">Continue on WhatsApp</a>
                  </Button>
                </motion.div>
              </div>
            ) : (
              /* 🔥 ONLY LOAN SECTION FIXED */
              <div className="grid md:grid-cols-2 gap-10 items-stretch">

                <div className="space-y-8 flex flex-col justify-between">

                  <div className="space-y-8">

                    {/* ✅ INPUT INSTEAD OF SLIDER */}
                    <div>
                      <p className="text-sm">Amount</p>
                      <input
                        type="text"
                        value={formatNumber(loanAmount)}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/,/g, "")
                          if (!isNaN(Number(raw))) setLoanAmount(Number(raw))
                        }}
                        className="w-full mt-2 h-14 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/40 backdrop-blur text-lg font-semibold outline-none shadow-sm"
                      />
                    </div>

                    {/* ✅ START FROM 1 */}
                    <div>
                      <p className="text-sm">Duration</p>
                      <p className="text-xl font-semibold">
                        {loanMonths[0]} months
                      </p>
                      <Slider
                        value={loanMonths}
                        onValueChange={setLoanMonths}
                        min={1}
                        max={24}
                      />
                    </div>

                  </div>

                  <div className="p-5 rounded-2xl bg-white/50 backdrop-blur-lg border border-white/20 shadow-sm text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Interest Type</span>
                      <span className="font-semibold">
                        {isReducing ? "Reducing" : "Flat"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate</span>
                      <span className="font-semibold">4% monthly</span>
                    </div>
                  </div>

                </div>

                <motion.div
                  key={loanAmount + loanMonths[0]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col justify-between bg-white/60 backdrop-blur-xl p-6 rounded-2xl space-y-5 border border-white/20 shadow"
                >

                  <div>
                    <p className="text-sm">Monthly Payment</p>
                    <p className="text-2xl font-bold">{format(monthly)}</p>
                  </div>

                  <div className="flex justify-between">
                    <span>Total Interest</span>
                    <span>{format(totalInterest)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Total Repayment</span>
                    <span className="font-semibold">{format(totalLoan)}</span>
                  </div>

                  {/* ✅ AMORTIZATION */}
                  {isReducing && (
                    <div className="max-h-40 overflow-auto text-xs border-t pt-3 space-y-1">
                      {schedule.map((m) => (
                        <div key={m.month} className="flex justify-between">
                          <span>Month {m.month}</span>
                          <span>{format(m.balance)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button><a href="https://wa.me/2348163886181?text=Hello%20I%20am%20interested%20in%20your%20loan%20or%20investment%20services">Apply for Loan</a></Button>

                </motion.div>

              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </section>
  )
}