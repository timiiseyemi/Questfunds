"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ✅ INCREASED NAVBAR HEIGHT */}
        <div className="flex items-center justify-between h-20">

          {/* ✅ LOGO FIXED */}
          <Link href="/" className="flex items-center gap-0.5">
            <img
              src="/1.png"
              alt="Vestory logo"
              className="h-23 w-23 object-contain flex-shrink-0"
            />
            {/* <span className="text-base font-medium tracking-tight">
              Vestory
            </span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/" className="text-gray-600 hover:text-black transition">
              Home
            </Link>
            <Link href="/#calculator" className="text-gray-600 hover:text-black transition">
              Calculator
            </Link>
            
            <Link href="/#leadform" className="text-gray-600 hover:text-black transition">
              Contact
            </Link>
            <Link href="/insights" className="text-gray-600 hover:text-black transition">
              News
            </Link>
             <Link href='/games/hangman' className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                Play Hangman
              </Link>

          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Button className="border border-black text-black bg-transparent hover:bg-black hover:text-white rounded-full px-5 text-sm">
              <a href="https://wa.me/2348163886181?text=Hello%20I%20am%20interested%20in%20your%20loan%20or%20investment%20services">Get Started</a>
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
              <Link href="/" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                Home
              </Link>

              <Link href="/#calculator" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                Calculator
              </Link>

              <Link href="/#leadform" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                Contact
              </Link>
              <Link href="/insights" className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                News
              </Link>
              <Link href='/games/hangman' className="px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                Play Hangman
              </Link>

              <Button className="mt-3 border border-black text-black bg-transparent hover:bg-black hover:text-white rounded-full w-full">
                <a href="https://wa.me/2348163886181?text=Hello%20I%20am%20interested%20in%20your%20loan%20or%20investment%20services">Get Started</a>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}