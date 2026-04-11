"use client"

import { useState } from "react"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function LeadForm() {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    phone: "",
    amount: "",
    type: "loan",
  })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, "leads"), {
        ...form,
        createdAt: serverTimestamp(),
      })

      const message = `Hello, I just submitted a request on Vestory.

Name: ${form.name}
Phone: ${form.phone}
Type: ${form.type}
Amount: ₦${form.amount}`

      window.location.href = `https://wa.me/2348163886181?text=${encodeURIComponent(message)}`
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }

    setLoading(false)
  }

  return (
  <section id="leadform" className="py-24 relative scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4">

        {/* 🔥 GLASS CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            rounded-[2rem] p-8 md:p-12
            bg-white/60 backdrop-blur-xl
            border border-white/30
            shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          "
        >

          {/* HEADER */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Get Started with Vestory
            </h2>
            <p className="text-gray-600 mt-3">
              Fill in your details and we’ll reach out immediately.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                name="name"
                required
                onChange={handleChange}
                placeholder="John Doe"
                className="
                  w-full h-14 px-4 rounded-xl
                  bg-white/70 backdrop-blur
                  border border-gray-200
                  focus:ring-2 focus:ring-black
                  outline-none transition
                "
              />
            </div>

            {/* PHONE */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                name="phone"
                required
                onChange={handleChange}
                placeholder="08123456789"
                className="
                  w-full h-14 px-4 rounded-xl
                  bg-white/70 backdrop-blur
                  border border-gray-200
                  focus:ring-2 focus:ring-black
                  outline-none transition
                "
              />
            </div>

            {/* AMOUNT */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Amount (₦)</label>
              <input
                name="amount"
                required
                onChange={handleChange}
                placeholder="500,000"
                className="
                  w-full h-14 px-4 rounded-xl
                  bg-white/70 backdrop-blur
                  border border-gray-200
                  focus:ring-2 focus:ring-black
                  outline-none transition
                "
              />
            </div>

            {/* TYPE */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600">Select Option</label>
              <select
                name="type"
                onChange={handleChange}
                className="
                  w-full h-14 px-4 rounded-xl
                  bg-white/70 backdrop-blur
                  border border-gray-200
                  focus:ring-2 focus:ring-black
                  outline-none transition
                "
              >
                <option value="loan">Loan</option>
                <option value="investment">Investment</option>
              </select>
            </div>

            {/* CTA BUTTON */}
            <Button
              type="submit"
              className="
                w-full h-14 rounded-full
                bg-black text-white
                hover:scale-[1.02]
                transition font-medium
              "
            >
              {loading ? "Processing..." : "Get Started"}
            </Button>

          </form>

          {/* TRUST TEXT */}
          <p className="text-center text-xs text-gray-500 mt-6">
            100% secure • We’ll respond quickly • No spam
          </p>

        </motion.div>
      </div>
    </section>
  )
}