"use client"

import Image from "next/image"
import { Quote, X } from "lucide-react"
import { useState } from "react"
import { getMediaUrl } from "@/lib/api"

export default function HomeTestimoniesClient({ testimonies, lang = 'fr' }: { testimonies: any[]; lang?: string }) {
  const [selected, setSelected] = useState<any | null>(null)

  const getField = (obj: any, field: string) => {
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const t = {
    readMore: lang === 'en' ? 'Read full testimony' : lang === 'es' ? 'Leer testimonio completo' : 'Lire le témoignage complet',
    yearsOld: lang === 'en' ? 'years old' : lang === 'es' ? 'años' : 'ans',
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonies.map((t_item: any) => (
          <div
            key={t_item.id || t_item.name}
            className="bg-[#F8F6F2] rounded-lg overflow-hidden border border-border group hover:shadow-lg transition-shadow flex flex-col"
          >
            {/* Photo */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src={getMediaUrl(t_item.image)} 
                alt={`Portrait de ${t_item.name}`}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-semibold text-sm">{t_item.name}</p>
                <p className="text-white/70 text-xs">{t_item.age} {t.yearsOld}</p>
              </div>
            </div>

            {/* Quote */}
            <div className="p-6 flex flex-col flex-1">
              <Quote size={24} className="text-[#D32F2F] mb-3 shrink-0" />
              <p className="text-foreground/75 text-sm leading-relaxed italic flex-1">
                &ldquo;{getField(t_item, 'excerpt')}&rdquo;
              </p>
              <button
                onClick={() => setSelected(t_item)}
                className="mt-5 text-xs font-bold uppercase tracking-wider text-[#002D62] hover:text-[#D32F2F] transition-colors inline-flex items-center gap-1 text-left"
              >
                {t.readMore} &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

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
                <p className="text-white font-serif text-xl font-bold">{selected.name}</p>
                <p className="text-white/70 text-xs">{selected.age} {t.yearsOld} · {getField(selected, 'role')}</p>
              </div>
            </div>
            <div className="p-8">
              <Quote size={28} className="text-[#D32F2F] mb-4" />
              <p className="text-foreground/80 leading-relaxed text-sm italic">{getField(selected, 'full_text')}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
