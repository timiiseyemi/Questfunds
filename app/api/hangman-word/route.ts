import { NextResponse } from "next/server"
import OpenAI from "openai"
import { db } from "@/lib/firebaseAdmin"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function GET() {
  try {
    console.log("📡 Fetching words from Firebase...")

    const snapshot = await db.collection("hangmanWords").get()

    const words: any[] = []
    snapshot.forEach((doc: any) => {
      words.push(doc.data())
    })

    console.log("📊 WORD COUNT:", words.length)

    // 🔥 IF WE HAVE ENOUGH WORDS → RETURN RANDOM
    if (words.length > 10) {
      const random = words[Math.floor(Math.random() * words.length)]

      console.log("🎯 Returning random word:", random.word)

      // 🔥 BACKGROUND GROWTH
      if (words.length < 100) {
        generateMoreWords().catch(console.error)
      }

      return NextResponse.json(random)
    }

    // 🚀 FORCE GENERATION IF LOW WORDS
    console.log("⚠️ Not enough words, generating batch...")

    const generated = await generateBatch()

    const random =
      generated[Math.floor(Math.random() * generated.length)]

    console.log("✅ Returning generated word:", random.word)

    return NextResponse.json(random)

  } catch (error) {
    console.error("❌ API ERROR:", error)

    return NextResponse.json({
      word: "bank",
      category: "basics",
      explanation: "A bank is where people store and manage money.",
    })
  }
}


// 🔥 GENERATE 20 WORDS
async function generateBatch() {
  console.log("🚀 Calling OpenAI...")

  const prompt = `
Generate 20 unique finance-related words for a hangman game.

Return ONLY JSON array (no markdown):
[
  {
    "word": "inflation",
    "category": "advanced",
    "explanation": "Simple explanation"
  }
]

Rules:
- 4–12 letters
- No spaces
- lowercase only
- mix categories (basics, advanced, crypto, business)
- explanation must be 1 short sentence
`

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  })

  const text = completion.choices?.[0]?.message?.content

  console.log("🔥 RAW TEXT:", text)

  if (!text) {
    throw new Error("No response from OpenAI")
  }

  // 🔥 CLEAN RESPONSE
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim()

  let generated: any[] = []

  try {
    generated = JSON.parse(cleaned)
  } catch (err) {
    console.error("❌ JSON parse failed:", cleaned)

    return [
      {
        word: "money",
        category: "basics",
        explanation: "Money is used to buy goods and services.",
      },
    ]
  }

  console.log("✅ Parsed words:", generated.length)

  // 🔥 SAVE TO FIREBASE
  const batch = db.batch()

  generated.forEach((item) => {
    if (!item?.word) return

    const word = item.word.toLowerCase().trim()
    const ref = db.collection("hangmanWords").doc(word)

    batch.set(
      ref,
      {
        word,
        category: item.category || "general",
        explanation: item.explanation || "",
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    )
  })

  await batch.commit()

  console.log("💾 Saved words to Firebase")

  return generated
}


// 🔥 BACKGROUND GENERATION (SAFE)
let isGenerating = false

async function generateMoreWords() {
  if (isGenerating) return

  try {
    isGenerating = true
    console.log("🔄 Background generating more words...")
    await generateBatch()
  } catch (err) {
    console.error("❌ Background generation failed:", err)
  } finally {
    isGenerating = false
  }
}