import { db } from "@/lib/firebaseAdmin"

export async function GET() {
  try {
    const snapshot = await db
      .collection("news")
      .orderBy("publishedAt", "desc")
      .get()

    const news = snapshot.docs.map((doc) => doc.data())

    return Response.json(news)
  } catch (error) {
    console.error(error)
    return Response.json([])
  }
}