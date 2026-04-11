"use client"

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/admin")
    } catch {
      alert("Invalid login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow w-[350px] space-y-4">
        <h2 className="text-xl font-semibold">Admin Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 px-4 border rounded-xl"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 border rounded-xl"
        />

        <button className="w-full h-12 bg-black text-white rounded-full">
          Login
        </button>
      </form>
    </div>
  )
}