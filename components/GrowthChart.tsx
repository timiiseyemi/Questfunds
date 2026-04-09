"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type Props = {
  amount: number
  rate: number
  duration: number
}

export function GrowthChart({ amount, rate, duration }: Props) {
  // ✅ SAFE + PREMIUM DATA GENERATION (COMPOUND CURVE)
  const data = Array.from({ length: duration }, (_, i) => {
    const day = i + 1

    const dailyRate = rate / 365

    const value = amount * Math.pow(1 + dailyRate, day)

    return {
      day,
      value,
    }
  })

  const format = (num: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(num)

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          
          {/* Gradient for premium feel */}
          <defs>
            <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#000" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <XAxis dataKey="day" hide />
          <YAxis hide domain={["auto", "auto"]} />

          <Tooltip
            formatter={(value: number) => format(value)}
            labelFormatter={(label) => `Day ${label}`}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #eee",
              fontSize: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#000"
            strokeWidth={3}
            dot={false}
            fill="url(#growth)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}