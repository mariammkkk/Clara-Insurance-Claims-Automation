"use client"

import Link from "next/link"

export default function HeroContent() {
  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="text-center">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10">AI-Powered Healthcare Solutions</span>
        </div>

        <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
          <span className="font-medium italic orpheus">Clara</span>
          <br />
          <span className="font-light tracking-tight text-white text-xl md:text-2xl">Bridging women's health clinics and insurers with AI</span>
        </h1>

      </div>
    </main>
  )
}
