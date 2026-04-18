export const revalidate = 0

import { fetchNews } from "@/lib/news"
import { openai } from "@/lib/openai"
import { db } from "@/lib/firebaseAdmin"

// 🔥 MOVE THIS OUTSIDE (important)
const fallbackImages = [
  "https://images.unsplash.com/photo-1559526324-593bc073d938",
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
  "https://images.unsplash.com/photo-1565514020179-026b92b2d77b",
  "https://images.unsplash.com/photo-1549421263-5ec394a5ad1c",
]

export async function GET() {
  try {
    const articles = await fetchNews()

    console.log("ARTICLES COUNT:", articles.length)

    const processed = await Promise.all(
      articles.slice(0, 20).map(async (item: any, index: number) => {
        const rawId = item.url || index.toString()
        const id = rawId.replace(/[^a-zA-Z0-9]/g, "_")

        const image =
  item.image && item.image !== "null"
    ? item.image
    : `https://source.unsplash.com/600x400/?finance,${index}`

        try {
          console.log("PROCESSING:", item.title)

          // ✅ CHECK EXISTING (SAFE VERSION)
          const existingDoc = await db.collection("news").doc(id).get()
          const existingData = existingDoc.exists
            ? existingDoc.data()
            : null

          // ✅ ONLY USE EXISTING IF IT'S GOOD
          if (existingData && existingData.summary?.length > 100) {
            return existingData
          }

          // 🔥 AI GENERATION
          let parsed: any = null

          try {
            const completion = await openai.chat.completions.create({
              model: "gpt-4.1-mini",
              messages: [
                {
                  role: "user",
                  content: `
You are a Nigerian financial expert.

Rewrite this news into a FULL, detailed article Nigerians can understand.

Title: ${item.title}
Content: ${item.content || item.description}

Return ONLY JSON:

{
  "summary": "Minimum 150 words",
  "category": "Banking | Crypto | Loans | Economy | Business | Global",
  "sections": [
    { "title": "What this means", "content": "..." },
    { "title": "Impact on Nigerians", "content": "..." },
    { "title": "Business implications", "content": "..." },
    { "title": "Opportunities", "content": "..." },
    { "title": "Risks", "content": "..." }
  ]
}
`,
                },
              ],
            })

            const raw = completion.choices[0].message.content || "{}"
            const cleaned = raw.replace(/```json|```/g, "").trim()

            parsed = JSON.parse(cleaned)
          } catch (err) {
            console.error("AI ERROR:", err)
            parsed = null
          }

          // ✅ ALWAYS SAFE SUMMARY
          const safeSummary =
            parsed?.summary && parsed.summary.length > 100
              ? parsed.summary
              : item.description ||
                "This financial update highlights key economic developments affecting Nigeria."

          // ✅ ALWAYS SAFE SECTIONS
          const safeSections =
            parsed?.sections && parsed.sections.length >= 4
              ? parsed.sections
              : [
                  {
                    title: "Overview",
                    content:
                      item.description ||
                      "This development may affect financial conditions.",
                  },
                  {
                    title: "Impact on Nigerians",
                    content:
                      "It may influence cost of living and financial decisions.",
                  },
                  {
                    title: "Opportunities",
                    content:
                      "There may be opportunities depending on the situation.",
                  },
                  {
                    title: "Risks",
                    content:
                      "There are risks depending on how things unfold.",
                  },
                ]

          const article = {
            id,
            title: item.title,
            image,
            summary: safeSummary,
            sections: safeSections,
            category: parsed?.category || "General",
            content: item.content || item.description,
            sourceUrl: item.url,
            publishedAt:
              item.publishedAt || new Date().toISOString(),
            createdAt: new Date().toISOString(),
          }

          // ✅ SAVE (NON-BLOCKING)
          try {
            await db.collection("news").doc(id).set(article)
          } catch (err) {
            console.error("FIREBASE ERROR:", err)
          }

          return article
        } catch (err) {
          console.error("MAP ERROR:", err)

          // ✅ HARD FALLBACK (NEVER FAIL)
          return {
            id,
            title: item.title,
            image,
            summary:
              item.description ||
              "Financial update affecting markets and economy.",
            sections: [
              {
                title: "Quick update",
                content:
                  item.description ||
                  "This development may impact financial conditions.",
              },
            ],
            category: "General",
            content: item.description,
            sourceUrl: item.url,
            publishedAt:
              item.publishedAt || new Date().toISOString(),
          }
        }
      })
    )

    console.log("FINAL COUNT:", processed.length)

    return Response.json(processed)
  } catch (error) {
    console.error("API ERROR:", error)

    return Response.json([
      {
        id: "fallback",
        title: "Financial update unavailable",
        image:
          "https://images.unsplash.com/photo-1559526324-593bc073d938",
        summary:
          "We’re currently unable to load financial insights. Please try again shortly.",
        sections: [
          {
            title: "Notice",
            content: "Temporary issue fetching financial news.",
          },
        ],
        category: "General",
        content: "",
        sourceUrl: "",
        publishedAt: new Date().toISOString(),
      },
    ])
  }
}