import Image from "next/image"
import Link from "next/link"
import { Quote } from "lucide-react"

import { getTestimonies, getMediaUrl } from "@/lib/api"
import HomeTestimoniesClient from "./home-testimonies-client"

interface HomeTestimoniesProps {
  lang?: string;
}

export default async function HomeTestimonies({ lang = 'fr' }: HomeTestimoniesProps) {
  const testimonies = await getTestimonies();

  const t = {
    badge: lang === 'en' ? 'They lived it' : lang === 'es' ? 'Ellos lo vivieron' : 'Ils ont vécu',
    title: lang === 'en' ? 'Survivor testimonies' : lang === 'es' ? 'Testimonios de sobrevivientes' : 'Témoignages de rescapés',
    desc: lang === 'en' 
      ? 'Their words carry the truth of Makobola. Listening is already resisting oblivion.'
      : lang === 'es'
      ? 'Sus palabras llevan la verdad de Makobola. Escuchar es ya resistir al olvido.'
      : 'Leurs mots portent la vérité de Makobola. Écouter, c\'est déjà résister à l\'oubli.',
    allTestimonies: lang === 'en' ? 'All testimonies' : lang === 'es' ? 'Todos los testimonios' : 'Tous les témoignages',
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3">
            {t.badge}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#002D62] text-balance">
            {t.title}
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#D32F2F]" />
            <div className="w-2 h-2 rounded-full bg-[#D32F2F]" />
            <div className="h-px w-12 bg-[#D32F2F]" />
          </div>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t.desc}
          </p>
        </div>

        <HomeTestimoniesClient testimonies={testimonies} lang={lang} />

        <div className="text-center mt-12">
          <Link
            href={`/${lang}/temoignages`}
            className="inline-flex items-center gap-2 bg-[#002D62] hover:bg-[#001a3d] text-white font-semibold text-sm uppercase tracking-wider px-8 py-3.5 rounded transition-colors"
          >
            {t.allTestimonies}
          </Link>
        </div>
      </div>
    </section>
  )
}
