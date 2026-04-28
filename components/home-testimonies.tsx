import Image from "next/image"
import Link from "next/link"
import { Quote } from "lucide-react"

import { getTestimonies, getMediaUrl } from "@/lib/api"
import HomeTestimoniesClient from "./home-testimonies-client"

export default async function HomeTestimonies() {
  const testimonies = await getTestimonies();
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3">
            Ils ont vécu
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#002D62] text-balance">
            Témoignages de rescapés
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#D32F2F]" />
            <div className="w-2 h-2 rounded-full bg-[#D32F2F]" />
            <div className="h-px w-12 bg-[#D32F2F]" />
          </div>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Leurs mots portent la vérité de Makobola. Écouter, c&apos;est déjà résister à l&apos;oubli.
          </p>
        </div>

        <HomeTestimoniesClient testimonies={testimonies} />

        <div className="text-center mt-12">
          <Link
            href="/temoignages"
            className="inline-flex items-center gap-2 bg-[#002D62] hover:bg-[#001a3d] text-white font-semibold text-sm uppercase tracking-wider px-8 py-3.5 rounded transition-colors"
          >
            Tous les témoignages
          </Link>
        </div>
      </div>
    </section>
  )
}
