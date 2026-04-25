import Parser from "rss-parser"

const parser = new Parser()

function normalizeTitle(title: string = "") {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .slice(0, 7)
    .join(" ")
}

function isFinanceRelated(text: string = "") {
  const t = text.toLowerCase()

  return (
    t.includes("finance") ||
    t.includes("economy") ||
    t.includes("bank") ||
    t.includes("crypto") ||
    t.includes("loan") ||
    t.includes("investment") ||
    t.includes("stock") ||
    t.includes("market") ||
    t.includes("inflation") ||
    t.includes("cbn") ||
    t.includes("naira") ||
    t.includes("business")
  )
}

function cleanImage(img: string | null) {
  if (!img) return null

  if (
    img.includes("logo") ||
    img.includes("default") ||
    img.includes("placeholder")
  ) {
    return null
  }

  return img
}

export async function fetchNews() {
  try {
    const gnewsKey = process.env.GNEWS_API_KEY

    // ✅ SAFE GNEWS (avoid 403)
    const gnewsRes = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=business&lang=en&max=15&token=${gnewsKey}`,
      { cache: "no-store" }
    ).then((res) => res.json())

    const gnewsArticles = (gnewsRes?.articles || []).map((a: any) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.image,
      publishedAt: a.publishedAt,
    }))

    // ✅ RSS (strong Nigerian sources)
    const rssFeeds = [
      "https://businessday.ng/feed/",
      "https://nairametrics.com/feed/",
      "https://guardian.ng/business/feed/",
    ]

    const rssResults = await Promise.all(
      rssFeeds.map(async (url) => {
        try {
          return await parser.parseURL(url)
        } catch {
          return { items: [] }
        }
      })
    )

    const rssArticles = rssResults.flatMap((feed) =>
      (feed.items || []).map((item) => ({
        title: item.title,
        description: item.contentSnippet || "",
        url: item.link,
        image: item.enclosure?.url || null,
        publishedAt: item.pubDate,
      }))
    )

    let all = [...gnewsArticles, ...rssArticles]

    // ✅ FINANCE FILTER
    all = all.filter(
      (a) =>
        isFinanceRelated(a.title) ||
        isFinanceRelated(a.description)
    )

    // ✅ URL DEDUPE
    const byUrl = Array.from(
      new Map(all.map((item) => [item.url, item])).values()
    )

    // ✅ TITLE DEDUPE
    const seen = new Set<string>()
    const unique: any[] = []

    for (const item of byUrl) {
      const key = normalizeTitle(item.title)

      if (!key || seen.has(key)) continue

      seen.add(key)

      unique.push({
        ...item,
        image: cleanImage(item.image),
      })
    }

    // ✅ SORT
    unique.sort(
      (a, b) =>
        new Date(b.publishedAt || 0).getTime() -
        new Date(a.publishedAt || 0).getTime()
    )

    // ✅ LIMIT PER SOURCE
    const limited: any[] = []
    const domainCount: Record<string, number> = {}

    for (const item of unique) {
      try {
        const domain = new URL(item.url).hostname

        domainCount[domain] = (domainCount[domain] || 0) + 1

        if (domainCount[domain] <= 3) {
          limited.push(item)
        }
      } catch {
        limited.push(item)
      }

      if (limited.length >= 25) break
    }

    return limited
  } catch (error) {
    console.error("FETCH NEWS ERROR:", error)
    return []
  }
}