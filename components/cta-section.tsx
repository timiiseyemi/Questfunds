"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"

export function CTASection() {
  const moneyRef = useRef<HTMLDivElement | null>(null)

  // ✅ Smooth cursor follower (no re-renders)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!moneyRef.current) return

      moneyRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">

      {/* 💸 MONEY FOLLOWER */}
      <div
        ref={moneyRef}
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        <div className="text-2xl">💵</div>
      </div>

      {/* 🔥 BACKGROUND (WHITE / GREY) */}
      <div className="absolute inset-0 -z-10">

        {/* clean gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f9fafb] via-[#f3f4f6] to-[#e5e7eb]" />

        {/* soft blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-gray-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-80px] w-[400px] h-[400px] bg-gray-400/20 rounded-full blur-3xl" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* GLASS CARD */}
        <div
          className="
          relative overflow-hidden rounded-[2.5rem] p-8 md:p-16
          bg-white/40 backdrop-blur-xl
          border border-white/30
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        "
        >

          {/* glass edge */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/40 pointer-events-none" />

          <div className="text-center">

            {/* badge */}
            <div className="inline-flex items-center gap-2 
              bg-white/60 backdrop-blur-md 
              px-4 py-2 rounded-full text-sm font-medium mb-6 
              border border-white/40 text-gray-700">
              <TrendingUp className="w-4 h-4" />
              Start building your financial future
            </div>

            {/* headline */}
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6 max-w-3xl mx-auto text-gray-900">
              Ready to take the next step?
            </h2>

            {/* subtext */}
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
              Whether you need funding to grow or want to earn returns on your money, 
              Vestory gives you the tools to move forward with confidence.
            </p>

            {/* ✅ ADDED FUNDQUEST MESSAGE */}
            <p className="text-sm text-gray-500 max-w-xl mx-auto mb-10">
              Powered by Fundquest investment infrastructure.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Button className="bg-black text-white hover:bg-black/90 rounded-full px-8 h-14 text-sm font-medium">
               <a href="https://https://wa.link/myraeu">Apply for Loan</a>
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                className="
                bg-white/50 backdrop-blur-md
                border border-white/40
                text-gray-800
                hover:bg-white/70
                rounded-full px-8 h-14 text-sm font-medium
              "
              >
                <a href="https://https://wa.link/myraeu">Start Investing</a>
              </Button>

            </div>

            {/* trust */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-gray-500 text-xs">

              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                No hidden fees
              </div>

              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                Fast approval process
              </div>

              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                Secure & transparent
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}