export async function fetchNews() {
  try {
    const apiKey = process.env.GNEWS_API_KEY

    const queries = [
      "finance Nigeria",
      "Nigeria economy",
      "Nigeria business",
      "banking Nigeria",
      "crypto Nigeria",
      "global finance",
      "stock market",
    ]

    const requests = queries.map((q) =>
      fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          q
        )}&lang=en&max=10&token=${apiKey}`,
        { cache: "no-store" }
      ).then((res) => res.json())
    )

    const responses = await Promise.all(requests)

    // 🔥 FLATTEN ALL ARTICLES
    const allArticles = responses.flatMap((r) => r.articles || [])

    // 🔥 REMOVE DUPLICATES
    const unique = Array.from(
      new Map(allArticles.map((item) => [item.url, item])).values()
    )

    console.log("TOTAL FETCHED:", unique.length)

    return unique
  } catch (error) {
    console.error("GNEWS FAILED:", error)
    return []
  }
}