"use client"

import { useEffect, useState } from "react"
import { db, auth } from "@/lib/firebase"
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function AdminPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // 🔐 PROTECT ROUTE
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin/login")
      }
    })

    return () => unsub()
  }, [])

  // 📊 FETCH LEADS
  useEffect(() => {
    const fetchLeads = async () => {
      const q = query(collection(db, "leads"), orderBy("createdAt", "desc"))
      const snapshot = await getDocs(q)

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      setLeads(data)
      setLoading(false)
    }

    fetchLeads()
  }, [])

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">Vestory Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage your leads</p>
          </div>

          <button
            onClick={() => {
              signOut(auth)
              router.push("/admin/login")
            }}
            className="text-sm border px-4 py-2 rounded-full hover:bg-black hover:text-white"
          >
            Logout
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white p-4 rounded-xl border">
            <p className="text-xs text-gray-500">Total Leads</p>
            <p className="text-xl font-semibold">{leads.length}</p>
          </div>

          <div className="bg-white p-4 rounded-xl border">
            <p className="text-xs text-gray-500">Loan Requests</p>
            <p className="text-xl font-semibold">
              {leads.filter(l => l.type === "loan").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border">
            <p className="text-xs text-gray-500">Investments</p>
            <p className="text-xl font-semibold">
              {leads.filter(l => l.type === "investment").length}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border">
            <p className="text-xs text-gray-500">Total Volume</p>
            <p className="text-xl font-semibold">
              ₦{leads.reduce((acc, l) => acc + Number(l.amount || 0), 0).toLocaleString()}
            </p>
          </div>

        </div>

        {/* LEADS */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">

            {leads.map((lead, i) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white p-5 rounded-2xl border shadow-sm"
              >

                <div className="flex justify-between items-center">

                  <div>
                    <p className="font-semibold">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.phone}</p>
                    <p className="text-xs text-gray-400 capitalize">{lead.type}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ₦{Number(lead.amount).toLocaleString()}
                    </p>

                    <a
                      href={`https://wa.me/${lead.phone}`}
                      target="_blank"
                      className="text-xs text-blue-500"
                    >
                      Contact
                    </a>
                  </div>

                </div>

              </motion.div>
            ))}

          </div>
        )}
      </div>
    </section>
  )
}