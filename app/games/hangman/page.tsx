"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

export default function HangmanPage() {
  const [word, setWord] = useState("")
  const [category, setCategory] = useState("")
  const [explanation, setExplanation] = useState("")
  const [guessed, setGuessed] = useState<string[]>([])
  const [lives, setLives] = useState(6)
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing")
  const [shake, setShake] = useState(false)

  const fetchAIWord = async () => {
    const res = await fetch("/api/hangman-word", { cache: "no-store" })
    return await res.json()
  }

  const startGame = async () => {
    const data = await fetchAIWord()

    setWord(data.word.toLowerCase())
    setCategory(data.category)
    setExplanation(data.explanation)

    setGuessed([])
    setLives(6)
    setStatus("playing")
  }

  useEffect(() => {
    startGame()
  }, [])

  const handleGuess = (letter: string) => {
    if (guessed.includes(letter) || status !== "playing") return

    setGuessed((prev) => [...prev, letter])

    if (!word.includes(letter)) {
      setLives((prev) => prev - 1)
      setShake(true)
      setTimeout(() => setShake(false), 300)
    }
  }

  useEffect(() => {
    if (!word) return

    const isWon = word.split("").every((l) => guessed.includes(l))

    if (isWon) {
      setStatus("won")
      confetti({ particleCount: 100, spread: 60 })
    }

    if (lives <= 0) setStatus("lost")
  }, [guessed, lives, word])

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
  const wrongGuesses = 6 - lives

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#f3f4f6",
        backgroundImage: `
          linear-gradient(to right, #d1d5db 1px, transparent 1px),
          linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <Navbar />

      <motion.div
        animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
        className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16"
      >

        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <img
              src="/images/mon.png"
              alt="money bag"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Hangman: Finance Edition
            </h1>
          </div>

          <p className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-base max-w-md mx-auto">
            Test your financial knowledge. Guess the word before your portfolio crashes
          </p>
        </div>

        {/* CARD */}
        <div className="
          rounded-2xl sm:rounded-3xl
          p-6 sm:p-10
          bg-white/90 backdrop-blur
          border border-gray-200
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        ">

          {/* CATEGORY */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <span className="px-4 py-1 rounded-full text-xs bg-black text-white">
              {category}
            </span>
          </div>

          {/* HANGMAN */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <svg width="180" height="220" className="stroke-black sm:w-[200px] sm:h-[250px]">
              <line x1="10" y1="210" x2="150" y2="210" strokeWidth="4" />
              <line x1="40" y1="210" x2="40" y2="20" strokeWidth="4" />
              <line x1="40" y1="20" x2="120" y2="20" strokeWidth="4" />

              {wrongGuesses >= 1 && <line x1="120" y1="20" x2="120" y2="50" strokeWidth="4" />}
              {wrongGuesses >= 2 && <circle cx="120" cy="70" r="20" strokeWidth="4" fill="none" />}
              {wrongGuesses >= 3 && <line x1="120" y1="90" x2="120" y2="150" strokeWidth="4" />}
              {wrongGuesses >= 4 && <line x1="120" y1="110" x2="90" y2="130" strokeWidth="4" />}
              {wrongGuesses >= 5 && <line x1="120" y1="110" x2="150" y2="130" strokeWidth="4" />}
              {wrongGuesses >= 6 && (
                <>
                  <line x1="120" y1="150" x2="95" y2="190" strokeWidth="4" />
                  <line x1="120" y1="150" x2="145" y2="190" strokeWidth="4" />
                </>
              )}
            </svg>
          </div>

          {/* WORD */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 flex-wrap">
            {word.split("").map((letter, i) => (
              <motion.div
                key={i}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="
                  w-10 h-12 sm:w-14 sm:h-16
                  flex items-center justify-center
                  rounded-lg sm:rounded-xl
                  bg-gray-50 border
                  text-lg sm:text-xl font-semibold shadow-sm
                "
              >
                {guessed.includes(letter) || status !== "playing" ? letter : ""}
              </motion.div>
            ))}
          </div>

          {/* LIVES */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {[...Array(6)].map((_, i) => (
              <motion.img
                key={i}
                src="/images/heart.png"
                alt="life"
                className={`w-5 h-5 sm:w-6 sm:h-6 ${i < lives ? "opacity-100" : "opacity-20 grayscale"}`}
                animate={{ scale: i < lives ? 1 : 0.8 }}
              />
            ))}
          </div>

          {/* STATUS */}
          <div className="text-center mb-6 sm:mb-8">
            {status === "won" && (
              <p className="text-green-600 font-semibold">
                🎉 Correct!
              </p>
            )}

            {status === "lost" && (
              <p className="text-red-600 font-semibold">
                💀 The word was "{word}"
              </p>
            )}
          </div>

          {/* EXPLANATION */}
          {status !== "playing" && explanation && (
            <div className="p-4 sm:p-5 mb-6 sm:mb-8 rounded-xl bg-gray-50 border text-gray-700 text-sm">
              <strong>What it means:</strong> {explanation}
            </div>
          )}

          {/* KEYBOARD */}
          <div className="grid grid-cols-7 sm:grid-cols-9 gap-2 sm:gap-3 mb-8 sm:mb-10">
            {alphabet.map((letter) => (
              <motion.button
                key={letter}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleGuess(letter)}
                className={`
                  py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base
                  font-medium border shadow-sm transition
                  ${
                    guessed.includes(letter)
                      ? "bg-gray-200 text-gray-400"
                      : "bg-white hover:bg-black hover:text-white"
                  }
                `}
              >
                {letter}
              </motion.button>
            ))}
          </div>

          {/* NEW GAME */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={startGame}
              className="px-8 sm:px-10 py-3 rounded-full bg-black text-white shadow-lg"
            >
              New Game
            </motion.button>
          </div>

        </div>

      </motion.div>

      <Footer />
    </div>
  )
}