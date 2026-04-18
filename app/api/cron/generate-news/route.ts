export const revalidate = 0

import { fetchNews } from "@/lib/news"
import { openai } from "@/lib/openai"
import { db } from "@/lib/firebaseAdmin"

export async function GET() {
  try {
    const articles = await fetchNews()

    console.log("CRON FETCHED:", articles.length)

    let createdCount = 0
    const LIMIT = 20

    for (let index = 0; index < articles.length; index++) {
      if (createdCount >= LIMIT) break

      const item = articles[index]

      const rawId = item.url || index.toString()
      const id = rawId.replace(/[^a-zA-Z0-9]/g, "_")

      // 🔥 CHECK IF EXISTS
      const existing = await db.collection("news").doc(id).get()

      if (existing.exists) {
        continue // skip duplicates
      }

      console.log("CREATING:", item.title)

      // 🔥 IMAGE FALLBACK (UNIQUE)
      const image =
        item.image && item.image !== "null"
          ? item.image
          : `https://source.unsplash.com/600x400/?finance,${Date.now()}_${index}`

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

Rewrite this news into a FULL, detailed article Nigerians understand.

Title: ${item.title}
Content: ${item.content || item.description}

Return ONLY JSON:

{
  "summary": "Minimum 150 words",
  "category": "Business | Economy | Banking | Crypto | Loans | Global",
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
      }

      const article = {
        id,
        title: item.title,
        image,
        summary:
          parsed?.summary && parsed.summary.length > 100
            ? parsed.summary
            : item.description ||
              "Financial update affecting Nigeria’s economy.",

        sections:
          parsed?.sections && parsed.sections.length >= 4
            ? parsed.sections
            : [
                {
                  title: "Overview",
                  content:
                    item.description ||
                    "This may impact financial conditions.",
                },
              ],

        category: parsed?.category || "General",
        content: item.content || item.description,
        sourceUrl: item.url,
        publishedAt:
          item.publishedAt || new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }

      await db.collection("news").doc(id).set(article)

      createdCount++
    }

    console.log("CREATED TODAY:", createdCount)

    return Response.json({
      success: true,
      created: createdCount,
    })
  } catch (error) {
    console.error("CRON ERROR:", error)

    return Response.json({
      success: false,
      error: "Cron failed",
    })
  }
}