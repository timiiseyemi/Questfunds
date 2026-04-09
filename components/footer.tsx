"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { TrendingUp, Phone } from "lucide-react"

export function Footer() {
  const pathname = usePathname()

  const handleCalculatorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we're already on the home page, prevent the Link navigation and smooth-scroll
    if (pathname === "/") {
      e.preventDefault()
      const el = document.getElementById("calculator")
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      } else {
        // fallback to navigating to the anchor
        window.location.href = "/#calculator"
      }
    }
  }
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
              <span className="text-lg font-semibold">Vestory</span>
            </Link>

            <p className="text-white/60 text-sm max-w-sm">
              Helping individuals and businesses access funding and grow their money with confidence.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-white/80">Explore</h4>

            <div className="flex flex-col gap-2 text-sm text-white/60">
              <Link href="/#calculator" onClick={handleCalculatorClick} className="text-gray-600 hover:text-black transition">
                Calculator
              </Link>
              
              <Link href="https://wa.me/2348163886181?text=Hello%20I%20am%20interested%20in%20your%20loan%20or%20investment%20services" className="hover:text-white transition">
                Contact
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-white/80">Contact</h4>

            <div className="flex flex-col gap-3 text-sm text-white/60">

              
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +234 816 388 6181
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">

          <p>
            © {new Date().getFullYear()} Vestory. All rights reserved.
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