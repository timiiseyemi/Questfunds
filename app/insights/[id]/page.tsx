"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()

  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch("/api/news/db")
        const data = await res.json()

        const decodedId = decodeURIComponent(params.id as string)

        const found = data.find((n: any) => n.id === decodedId)

        setArticle(found || null)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [params.id])

  const toggle = (index: number) => {
    setOpen(open === index ? null : index)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading article...
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Article not found</p>
        <button onClick={() => router.push("/insights")} className="underline">
          Go back
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">

        {/* BACK */}
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-black mb-6"
        >
          ← Back
        </button>

        {/* IMAGE */}
        <motion.img
          src={article.image}
          alt={article.title}
          className="
  w-full h-80 object-cover rounded-3xl mb-12

  shadow-[0_20px_60px_rgba(0,0,0,0.15)]
"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-4">
          {article.title}
        </h1>

        {/* DATE */}
        <p className="text-gray-400 text-sm mb-12">
          {new Date(article.publishedAt).toDateString()}
        </p>

        {/* SUMMARY */}
        <div
  className="
    rounded-3xl p-8 mb-12

    bg-white/70 backdrop-blur-xl
    border border-gray-200/50

    shadow-[0_10px_40px_rgba(0,0,0,0.06)]
  "
>
  <h2 className="font-semibold text-2xl mb-4">
    Summary
  </h2>

  <p className="text-gray-700 leading-relaxed text-lg">
    {article.summary}
  </p>
</div>

        {/* ✅ DYNAMIC AI SECTIONS */}
        <div className="space-y-4 mt-6">

  {article.sections?.map((section: any, index: number) => (
    <motion.div
      key={index}
      layout
      className="
        rounded-2xl
        bg-white/70 backdrop-blur-xl
        border border-gray-200/50
        shadow-sm
        hover:shadow-md
        transition-all
      "
    >

      {/* HEADER */}
      <button
        onClick={() => toggle(index)}
        className="w-full flex justify-between items-center p-5 text-left"
      >
        <span className="font-medium text-gray-900">
          {section.title}
        </span>

        {/* 🔥 PLUS / MINUS */}
        <motion.span
          initial={false}
          animate={{ rotate: open === index ? 180 : 0 }}
          className="
            text-xl font-semibold
            text-gray-700
            transition-all
          "
        >
          {open === index ? "−" : "+"}
        </motion.span>
      </button>

      {/* CONTENT */}
      <motion.div
        initial={false}
        animate={{
          height: open === index ? "auto" : 0,
          opacity: open === index ? 1 : 0,
        }}
        transition={{ duration: 0.8 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-gray-600 leading-relaxed">
          {section.content}
        </div>
      </motion.div>

    </motion.div>
  ))}

</div>

        {/* CTA */}
        <div className="mt-12 flex gap-4">
          <Button
  className="
    bg-black text-white
    rounded-full px-8 py-6 text-base

    hover:scale-105
    transition-all
  "
>
            <a href="https://wa.me/message/HELVKXSF223SK1">
              Get a Loan
            </a>
          </Button>
        </div>

      </div>

      <Footer />
    </div>
  )
}