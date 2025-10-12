"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()

  return (
    <header className="relative z-50 flex items-center justify-center p-6 pointer-events-auto">
      <nav className="flex items-center gap-4 pointer-events-auto">
        <button
          onClick={() => router.push("/clinics")}
          className="px-6 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-teal-500 hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          Clinics
        </button>
        <button
          onClick={() => router.push("/insurance")}
          className="px-6 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          Insurance
        </button>
      </nav>
    </header>
  )
}
