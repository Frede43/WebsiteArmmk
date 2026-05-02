"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getMediaUrl } from "@/lib/api"



interface HeroSliderProps {
  slides?: any[];
  lang?: string;
}

export default function HeroSlider({ slides = [], lang = 'fr' }: HeroSliderProps) {
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
    [transitioning, slides.length]
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    const interval = setInterval(next, 6500)
    return () => clearInterval(interval)
  }, [next])

  const slide = slides[current]

  // Translation helpers
  const getField = (obj: any, field: string) => {
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const t = {
    learnMore: lang === 'en' ? 'Learn more' : lang === 'es' ? 'Saber más' : 'En savoir plus',
    contactUs: lang === 'en' ? 'Contact us' : lang === 'es' ? 'Contáctenos' : 'Nous contacter',
    prev: lang === 'en' ? 'Previous' : lang === 'es' ? 'Anterior' : 'Précédent',
    next: lang === 'en' ? 'Next' : lang === 'es' ? 'Siguiente' : 'Suivant',
  }

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
          <Image src={getMediaUrl(s.image)} alt={getField(s, 'title')} fill priority={i === 0} className="object-cover" />
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
          ARMMK · {lang === 'en' ? 'Memory and Peace' : lang === 'es' ? 'Memoria y Paz' : 'Mémoire et Paix'}
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white max-w-5xl text-balance leading-[1.1] tracking-tight">
          {getField(slide, 'title')}
        </h1>
        <div 
          className="mt-6 text-white/80 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed text-balance font-medium px-4 sm:px-0"
          dangerouslySetInnerHTML={{ __html: getField(slide, 'subtitle') }}
        />
        <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto px-10 sm:px-0">
          <Link
            href={`/${lang}/a-propos`}
            className="bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-[10px] sm:text-xs uppercase tracking-[0.15em] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-xl shadow-[#D32F2F]/30 hover:scale-105 active:scale-95 text-center"
          >
            {t.learnMore}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="glass hover:bg-white hover:text-[#002D62] text-white font-bold text-[10px] sm:text-xs uppercase tracking-[0.15em] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-center"
          >
            {t.contactUs}
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label={t.prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass hover:bg-[#D32F2F] hover:border-[#D32F2F] text-white hidden sm:flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 active:scale-90"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label={t.next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass hover:bg-[#D32F2F] hover:border-[#D32F2F] text-white hidden sm:flex items-center justify-center transition-all duration-300 shadow-2xl hover:scale-110 active:scale-90"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3 px-6 py-3 rounded-full glass">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`${lang === 'en' ? 'Go to slide' : 'Aller à la diapositive'} ${i + 1}`}
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
