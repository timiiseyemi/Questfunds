import { db } from "@/lib/firebaseAdmin"

export async function GET() {
  const snapshot = await db.collection("news").get()

  const data = snapshot.docs.map(doc => doc.data())

  return Response.json(data)
}