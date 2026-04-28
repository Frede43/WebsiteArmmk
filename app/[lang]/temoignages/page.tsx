"use client"

import { useState, useEffect, Suspense, use } from "react"
import Image from "next/image"
import { Quote, X } from "lucide-react"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI, getMediaUrl } from "@/lib/api"

function TemoignagesContent({ lang }: { lang: string }) {
  const [selected, setSelected] = useState<any | null>(null)
  const [testimonies, setTestimonies] = useState<any[]>([])

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  useEffect(() => {
    fetchAPI('/stories/').then(data => {
      if(data) setTestimonies(data)
    })
  }, [])

  const t = {
    title: lang === 'en' ? 'Testimonies' : lang === 'es' ? 'Testimonios' : 'Témoignages',
    subtitle: lang === 'en' 
      ? 'Their words carry the truth of Makobola. Listening is already resisting oblivion.'
      : lang === 'es'
      ? 'Sus palabras llevan la verdad de Makobola. Escuchar es ya resistir al olvido.'
      : 'Leurs mots portent la vérité de Makobola. Écouter, c\'est déjà résister à l\'oubli.',
    badge: lang === 'en' ? 'They lived it' : lang === 'es' ? 'Ellos lo vivieron' : 'Ils ont vécu',
    sectionTitle: lang === 'en' ? 'Survivor voices' : lang === 'es' ? 'Voces de los sobrevivientes' : 'Voix des rescapés',
    disclaimer: lang === 'en'
      ? 'These testimonies are published with the explicit agreement of the persons concerned, for a goal of memory and historical truth.'
      : lang === 'es'
      ? 'Estos testimonios se publican con el acuerdo explícito de las personas interesadas, con un objetivo de memoria y verdad histórica.'
      : 'Ces témoignages sont publiés avec l\'accord explicite des personnes concernées, dans un objectif de mémoire et de vérité historique.',
    readFull: lang === 'en' ? 'Read full testimony' : lang === 'es' ? 'Leer el testimonio completo' : 'Lire le témoignage complet',
    yearsOld: lang === 'en' ? 'years old' : lang === 'es' ? 'años' : 'ans',
  }

  return (
    <>
      <PageShell
        title={t.title}
        subtitle={t.subtitle}
        image="/images/hero-makobola.jpg"
        breadcrumbs={[{ label: t.title }]}
        lang={lang}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              {t.badge}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">{t.sectionTitle}</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              {t.disclaimer}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonies.map((t_item: any) => (
              <div
                key={t_item.id || t_item.name}
                className="bg-[#F8F6F2] rounded-lg overflow-hidden border border-border group flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={getMediaUrl(t_item.image)}
                    alt={`Portrait`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold text-sm">{getField(t_item, 'name')}, {t_item.age} {t.yearsOld}</p>
                    <p className="text-white/65 text-xs">{getField(t_item, 'role')}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <Quote size={20} className="text-[#D32F2F] mb-3 shrink-0" />
                  <p className="text-foreground/70 text-sm leading-relaxed italic flex-1 line-clamp-4">
                    &ldquo;{getField(t_item, 'excerpt')}&rdquo;
                  </p>
                  <button
                    onClick={() => setSelected(t_item)}
                    className="mt-5 text-xs font-bold uppercase tracking-wider text-[#002D62] hover:text-[#D32F2F] transition-colors text-left"
                  >
                    {t.readFull} &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Modal témoignage complet */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-48">
              <Image src={getMediaUrl(selected.image)} alt={selected.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-[#D32F2F] text-white flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-5">
                <p className="text-white font-serif text-xl font-bold">{getField(selected, 'name')}</p>
                <p className="text-white/70 text-xs">{selected.age} {t.yearsOld} · {getField(selected, 'role')}</p>
              </div>
            </div>
            <div className="p-8">
              <Quote size={28} className="text-[#D32F2F] mb-4" />
              <p className="text-foreground/80 leading-relaxed text-sm italic whitespace-pre-line">{getField(selected, 'full_text')}</p>
            </div>
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </>
  )
}

export default function TemoignagesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const t_loading = lang === 'en' ? 'Loading...' : lang === 'es' ? 'Cargando...' : 'Chargement...'

  return (
    <Suspense fallback={<div>{t_loading}</div>}>
      <TemoignagesContent lang={lang} />
    </Suspense>
  )
}
