export const revalidate = 0

import { fetchNews } from "@/lib/news"
import { openai } from "@/lib/openai"
import { db } from "@/lib/firebaseAdmin"

// 🔥 FALLBACK IMAGES
const fallbackImages = [
  "https://images.unsplash.com/photo-1559526324-593bc073d938",
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
  "https://images.unsplash.com/photo-1565514020179-026b92b2d77b",
  "https://images.unsplash.com/photo-1549421263-5ec394a5ad1c",
]

// 🔥 NORMALIZE TITLE
function normalizeTitle(title: string) {
  return title
    ?.toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .slice(0, 6)
    .join(" ")
}

// 🔥 VALIDATE IMAGE
function isValidImage(img: string | null) {
  if (!img) return false

  return (
    !img.includes("logo") &&
    !img.includes("default") &&
    img.startsWith("http")
  )
}

// 🔥 AI IMAGE GENERATOR
async function generateImage(prompt: string) {
  try {
    const res = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `A realistic financial news image about: ${prompt}, Nigeria economy, professional, no text`,
      size: "1024x1024",
    })

    return res.data?.[0]?.url || null
  } catch (err) {
    console.error("IMAGE ERROR:", err)
    return null
  }
}

export async function GET() {
  try {
    const articles = await fetchNews()

    console.log("RAW ARTICLES:", articles.length)

    // ✅ STEP 1: INTERNAL DEDUPE
    const seenTitles = new Set<string>()

    const uniqueArticles = articles.filter((item: any) => {
      const normalized = normalizeTitle(item.title)
      if (!normalized) return false

      if (seenTitles.has(normalized)) return false

      seenTitles.add(normalized)
      return true
    })

    const selected = uniqueArticles.slice(0, 30)

    let generatedCount = 0

    const processed = await Promise.all(
      selected.map(async (item: any, index: number) => {
        const rawId = item.url || index.toString()
        const id = rawId.replace(/[^a-zA-Z0-9]/g, "_")

        try {
          console.log("PROCESSING:", item.title)

          const existingDoc = await db.collection("news").doc(id).get()

          // ✅ USE EXISTING ONLY IF IMAGE IS GOOD
          if (existingDoc.exists) {
            const data = existingDoc.data()

            if (isValidImage(data?.image)) {
              return data
            }
          }

          // 🔥 IMAGE LOGIC
          let image = isValidImage(item.image) ? item.image : null

          // 🔥 GENERATE ONLY IF NEEDED
          if (!image && generatedCount < 5) {
            generatedCount++
            console.log("GENERATING IMAGE:", item.title)

            const generated = await generateImage(item.title)

            if (generated) image = generated
          }

          // 🔥 FINAL FALLBACK
          if (!image) {
            image = fallbackImages[index % fallbackImages.length]
          }

          // 🔥 AI TEXT
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

          const safeSummary =
            parsed?.summary && parsed.summary.length > 100
              ? parsed.summary
              : item.description ||
                "This financial update highlights key economic developments affecting Nigeria."

          const safeSections =
            parsed?.sections && parsed.sections.length >= 4
              ? parsed.sections
              : [
                  { title: "Overview", content: item.description || "" },
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
            category: (parsed?.category || "General").trim(),
            content: item.content || item.description,
            sourceUrl: item.url,
            publishedAt:
              item.publishedAt || new Date().toISOString(),
            createdAt: new Date().toISOString(),
          }

          await db.collection("news").doc(id).set(article)

          return article
        } catch (err) {
          console.error("MAP ERROR:", err)

          return {
            id,
            title: item.title,
            image: fallbackImages[index % fallbackImages.length],
            summary: item.description || "",
            sections: [],
            category: "General",
            content: item.description,
            sourceUrl: item.url,
            publishedAt:
              item.publishedAt || new Date().toISOString(),
          }
        }
      })
    )

    const clean = processed.filter(Boolean).slice(0, 20)

    console.log("FINAL CLEAN COUNT:", clean.length)

    return Response.json(clean)
  } catch (error) {
    console.error("API ERROR:", error)

    return Response.json([])
  }
}