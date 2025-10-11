"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-center p-6">
      <nav className="flex items-center gap-4">
        <Link
          href="/clinics"
          className="px-6 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition-all duration-200"
        >
          Clinics
        </Link>
        <Link
          href="/insurance"
          className="px-6 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-white/90 transition-all duration-200"
        >
          Insurance
        </Link>
      </nav>
    </header>
  )
}
