"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, TrendingUp } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              QuestFunds
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="#" className="text-gray-600 hover:text-black transition">
              Home
            </Link>
            <Link href="#loans" className="text-gray-600 hover:text-black transition">
              Loans
            </Link>
            <Link href="#invest" className="text-gray-600 hover:text-black transition">
              Invest
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-black transition">
              Contact
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Button className="transparent text-black hover:bg-black/90 rounded-full px-5 text-sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-4 shadow-sm">

            <div className="flex flex-col gap-2 text-sm">

              <Link href="#" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                Home
              </Link>

              <Link href="#loans" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                Loans
              </Link>

              <Link href="#invest" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                Invest
              </Link>

              <Link href="#contact" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                Contact
              </Link>

              <Button className="mt-3 bg-grey text-black rounded-full w-full">
                Get Started
              </Button>

            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}