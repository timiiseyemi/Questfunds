"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Fashion Store Owner",
    location: "Lagos",
    content:
      "I needed capital to expand my store, and QuestFunds made it happen faster than I expected. The process was clear, and I got funded within a day.",
    rating: 5,
    avatar: "AO",
  },
  {
    name: "Chukwuemeka Nwosu",
    role: "Tech Entrepreneur",
    location: "Abuja",
    content:
      "I’ve been investing for months now, and the returns are consistent. What I like most is how transparent everything is from start to finish.",
    rating: 5,
    avatar: "CN",
  },
  {
    name: "Fatima Ibrahim",
    role: "Restaurant Owner",
    location: "Kano",
    content:
      "The whole experience felt simple and reliable. No hidden charges, no confusion — just clear terms and good support when needed.",
    rating: 5,
    avatar: "FI",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            Built for People{" "}
            <span className="text-gray-400">Like You</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            See how individuals and business owners are using QuestFunds to grow their finances.
          </p>
        </div>

        {/* TESTIMONIALS */}
        <div className="grid md:grid-cols-3 gap-6">

          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="rounded-3xl bg-white border border-gray-200 hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-6">

                {/* Quote */}
                <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Quote className="w-4 h-4 text-black" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-gray-700 leading-relaxed mb-6">
                  {testimonial.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {testimonial.avatar}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.role}, {testimonial.location}
                    </p>
                  </div>

                </div>

              </CardContent>
            </Card>
          ))}

        </div>
      </div>
    </section>
  )
}