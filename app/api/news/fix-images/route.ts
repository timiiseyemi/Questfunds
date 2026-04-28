export const revalidate = 0

import { db } from "@/lib/firebaseAdmin"
import { openai } from "@/lib/openai"
import cloudinary from "@/lib/cloudinary"

// 🔥 CONFIG (VERY IMPORTANT — prevents overuse)
const LIMIT = 15 // max images per run
const DELAY = 1200 // ms between requests

// 🔥 VALIDATE IMAGE (STRONGER)
function isValidImage(img: string | null) {
  if (!img) return false

  if (
    img.includes("logo") ||
    img.includes("default") ||
    img.includes("placeholder")
  ) {
    return false
  }

  if (img.length < 80) return false

  return true
}

// 🔥 GENERATE IMAGE (BASE64)
async function generateImage(prompt: string) {
  try {
    const res = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `A clean, professional financial news image about: ${prompt}. Nigerian economy, business charts, modern newsroom style, no text`,
      size: "1024x1024",
    })

    return res.data?.[0]?.b64_json || null
  } catch (err) {
    console.error("❌ IMAGE GENERATION ERROR:", err)
    return null
  }
}

// 🔥 UPLOAD TO CLOUDINARY
async function uploadToCloudinary(base64: string, id: string) {
  try {
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64}`,
      {
        public_id: `news/${id}`,
        overwrite: true,
      }
    )

    return result.secure_url
  } catch (err) {
    console.error("❌ CLOUDINARY ERROR:", err)
    return null
  }
}

export async function GET() {
  try {
    const snapshot = await db.collection("news").get()

    console.log("📊 TOTAL ARTICLES:", snapshot.size)

    let fixedCount = 0
    let processed = 0

    for (const doc of snapshot.docs) {
      if (processed >= LIMIT) break

      const data = doc.data()

      // 🔥 DETECT BROKEN IMAGES (MORE AGGRESSIVE)
      const isBroken =
        !data.image ||
        data.image.includes("placeholder") ||
        data.image.includes("logo") ||
        data.image.length < 80

      if (!isBroken) continue

      console.log("🔧 FIXING:", data.title)

      // 🔥 GENERATE IMAGE
      const base64 = await generateImage(data.title)

      if (!base64) {
        console.log("❌ GENERATION FAILED:", data.title)
        continue
      }

      // 🔥 UPLOAD TO CLOUDINARY
      const uploaded = await uploadToCloudinary(base64, data.id)

      if (!uploaded) {
        console.log("❌ UPLOAD FAILED:", data.title)
        continue
      }

      // 🔥 UPDATE FIREBASE
      await db.collection("news").doc(data.id).update({
        image: uploaded,
      })

      console.log("✅ FIXED:", data.title)

      fixedCount++
      processed++

      // 🔥 DELAY (avoid rate limits)
      await new Promise((res) => setTimeout(res, DELAY))
    }

    console.log("🎉 DONE. FIXED:", fixedCount)

    return Response.json({
      success: true,
      fixed: fixedCount,
    })
  } catch (error) {
    console.error("❌ FIX ERROR:", error)

    return Response.json({
      success: false,
      error: "Failed to fix images",
    })
  }
}