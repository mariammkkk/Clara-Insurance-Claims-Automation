"use client"

import Link from "next/link"

export default function HeroContent() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 1.5,
      behavior: 'smooth'
    })
  }

  return (
    <>
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

      {/* Double Arrow at Bottom */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer hover:scale-110 transition-transform duration-300 group"
        aria-label="Scroll down"
      >
        <div className="flex flex-col items-center gap-[-8px] animate-pulse">
          <svg
            className="w-6 h-6 text-white/70 group-hover:text-white transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <svg
            className="w-6 h-6 text-white/70 group-hover:text-white transition-colors -mt-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
    </>
  )
}
