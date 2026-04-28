"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getMediaUrl } from "@/lib/api"



export default function HeroSlider({ slides = [] }: { slides?: any[] }) {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  if (!slides || slides.length === 0) return null;

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return
      setTransitioning(true)
      setTimeout(() => {
        setCurrent((index + slides.length) % slides.length)
        setTransitioning(false)
      }, 300)
    },
    [transitioning]
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    const interval = setInterval(next, 6500)
    return () => clearInterval(interval)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative w-full h-screen min-h-[580px] overflow-hidden">
      {/* Red top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#D32F2F] z-10" />

      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={getMediaUrl(s.image)} alt={s.title} fill priority={i === 0} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
        </div>
      ))}

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ${
          transitioning ? "opacity-0 translate-y-8 blur-sm" : "opacity-100 translate-y-0 blur-0"
        }`}
      >
        <div className="inline-flex items-center gap-2 bg-[#D32F2F]/90 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-8 shadow-lg shadow-[#D32F2F]/20 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-white inline-block animate-pulse" />
          ARMMK · Mémoire et Paix
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white max-w-5xl text-balance leading-[1.05] tracking-tight">
          {slide.title}
        </h1>
        <p className="mt-8 text-white/80 text-lg sm:text-xl max-w-2xl leading-relaxed text-balance font-medium">
          {slide.subtitle}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-5">
          <Link
            href={slide.cta1?.href || "/a-propos"}
            className="bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-[0.15em] px-10 py-4 rounded-full transition-all duration-300 shadow-xl shadow-[#D32F2F]/30 hover:scale-105 active:scale-95"
          >
            {slide.cta1?.label || "En savoir plus"}
          </Link>
          <Link
            href={slide.cta2?.href || "/contact"}
            className="glass hover:bg-white hover:text-[#002D62] text-white font-bold text-xs uppercase tracking-[0.15em] px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {slide.cta2?.label || "Nous contacter"}
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Précédent"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full glass hover:bg-[#D32F2F] hover:border-[#D32F2F] text-white flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 active:scale-90"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        aria-label="Suivant"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full glass hover:bg-[#D32F2F] hover:border-[#D32F2F] text-white flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 active:scale-90"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3 px-6 py-3 rounded-full glass">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Aller à la diapositive ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === current ? "w-10 bg-[#D32F2F]" : "w-2.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-9 right-6 z-20 text-white/40 text-xs font-mono">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  )
}
