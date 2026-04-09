"use client"

import Link from "next/link"
import { TrendingUp, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-3 gap-10 mb-12">

          {/* BRAND */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white text-black rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-lg font-semibold">QuestFunds</span>
            </Link>

            <p className="text-white/60 text-sm max-w-sm">
              Helping individuals and businesses access funding and grow their money with confidence.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-white/80">Explore</h4>

            <div className="flex flex-col gap-2 text-sm text-white/60">
              <Link href="#loans" className="hover:text-white transition">
                Business Loans
              </Link>
              <Link href="#invest" className="hover:text-white transition">
                Investment Plans
              </Link>
              <Link href="#contact" className="hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-white/80">Contact</h4>

            <div className="flex flex-col gap-3 text-sm text-white/60">

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@QuestFunds.ng
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +234 800 123 4567
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">

          <p>
            © {new Date().getFullYear()} QuestFunds. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms
            </Link>
          </div>

        </div>

      </div>
    </footer>
  )
}