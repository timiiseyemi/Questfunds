"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export function NewsSection() {
  const [news, setNews] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)

  const perPage = 9

  const categories = [
    "All",
    "Business",
    "Economy",
    "Banking",
    "Crypto",
    "Loans",
    "Global",
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/news/db")
        const data = await res.json()

        const formatted = data.map((item: any, index: number) => ({
          id: item.id || index.toString(),
          title: item.title,
          image:
            item.image ||
            `https://source.unsplash.com/600x400/?finance,${index}`,
          summary: item.summary,
          date: item.publishedAt
            ? new Date(item.publishedAt).toDateString()
            : "Today",
          category: item.category || "General",
          isNew:
            new Date(item.publishedAt).toDateString() ===
            new Date().toDateString(),
        }))

        setNews(formatted)
        setFiltered(formatted)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // FILTER LOGIC
  useEffect(() => {
    let temp = [...news]

    if (category !== "All") {
  temp = temp.filter(
    (n) =>
      n.category?.toLowerCase().trim() ===
      category.toLowerCase().trim()
  )
}

    if (search) {
      temp = temp.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFiltered(temp)
    setPage(1)
  }, [search, category, news])

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  )

  const totalPages = Math.ceil(filtered.length / perPage)

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClick = () => setShowDropdown(false)
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6">

      {/* 🔥 SEARCH + FILTER */}
      <div className="sticky top-20 z-10 bg-[#f9fafb] pb-6 space-y-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search insights..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full px-5 py-3 rounded-2xl
            border border-gray-200
            focus:outline-none focus:ring-2 focus:ring-black
            bg-white shadow-sm
          "
        />

        {/* DROPDOWN FILTER */}
        <div className="relative">

          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowDropdown(!showDropdown)
            }}
            className="
              w-full flex justify-between items-center
              px-5 py-3 rounded-2xl
              border border-gray-200
              bg-white shadow-sm
              hover:bg-gray-50 transition
            "
          >
            <span className="text-sm font-medium">{category}</span>
            <span className="text-xs text-gray-500">▼</span>
          </button>

          {showDropdown && (
            <div className="
              absolute z-20 mt-2 w-full
              bg-white border rounded-2xl shadow-lg
              overflow-hidden
            ">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c)
                    setShowDropdown(false)
                  }}
                  className={`
                    w-full text-left px-5 py-3 text-sm
                    hover:bg-gray-100 transition
                    ${category === c ? "bg-gray-100 font-medium" : ""}
                  `}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* 🔄 LOADING */}
      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      )}

      {/* ❌ EMPTY */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No results found
        </div>
      )}

      {/* 📰 CARDS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">

        {paginated.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="
              group rounded-2xl overflow-hidden
              bg-white border border-gray-100
              shadow-sm hover:shadow-xl
              transition duration-300
            "
          >

            {/* IMAGE */}
            <div className="h-48 overflow-hidden relative">

              {item.isNew && (
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
                  NEW
                </span>
              )}

              <img
                src={item.image}
                className="
                  w-full h-full object-cover
                  group-hover:scale-105 transition duration-300
                "
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">

              <span className="text-xs text-gray-400 uppercase tracking-wide">
                {item.category}
              </span>

              <h3 className="font-semibold text-lg leading-snug line-clamp-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-3">
                {item.summary}
              </p>

              <div className="flex justify-between items-center pt-2">
                <p className="text-xs text-gray-400">
                  {item.date}
                </p>

                <Link
                  href={`/insights/${encodeURIComponent(item.id)}`}
                  className="
                    text-sm font-medium
                    text-black hover:underline
                  "
                >
                  Read →
                </Link>
              </div>

            </div>

          </motion.div>
        ))}

      </div>

      {/* 🔥 PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-14 flex-wrap">

          {/* PREV */}
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-2 rounded-lg border text-sm disabled:opacity-30 hover:bg-gray-100"
          >
            ←
          </button>

          {/* NUMBERS */}
          {[...Array(totalPages)].map((_, i) => {
            const pageNumber = i + 1

            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= page - 1 && pageNumber <= page + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`
                    px-4 py-2 rounded-lg text-sm
                    ${
                      page === pageNumber
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  {pageNumber}
                </button>
              )
            }

            if (
              pageNumber === page - 2 ||
              pageNumber === page + 2
            ) {
              return <span key={pageNumber}>...</span>
            }

            return null
          })}

          {/* NEXT */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-2 rounded-lg border text-sm disabled:opacity-30 hover:bg-gray-100"
          >
            →
          </button>

        </div>
      )}

    </div>
  )
}