"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Quote, X, Send } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI, getMediaUrl } from "@/lib/api"


export default function TemoignagesPage() {
  const [selected, setSelected] = useState<any | null>(null)
  const [formSent, setFormSent] = useState(false)
  const [testimonies, setTestimonies] = useState<any[]>([])

  // Form states
  const [name, setName] = useState("")
  const [contactInfo, setContactInfo] = useState("")
  const [relation, setRelation] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetchAPI('/submissions/', {
      method: 'POST',
      body: JSON.stringify({
        name,
        contact_info: contactInfo,
        relation,
        message,
      })
    })
    if (res) {
      setFormSent(true)
    }
  }

  useEffect(() => {
    // We fetch from /stories/ as defined in urls.py
    fetchAPI('/stories/').then(data => {
      if(data) setTestimonies(data)
    })
  }, [])

  return (
    <>
      <Navbar />
      <PageShell
        title="Témoignages"
        subtitle="Leurs mots portent la vérité de Makobola. Écouter, c'est déjà résister à l'oubli."
        image="/images/hero-makobola.jpg"
        breadcrumbs={[{ label: "Témoignages" }]}
      />

      {/* Grid témoignages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              Ils ont vécu
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">Voix des rescapés</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Ces témoignages sont publiés avec l&apos;accord explicite des personnes concernées,
              dans un objectif de mémoire et de vérité historique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonies.map((t: any) => (
              <div
                key={t.name}
                className="bg-[#F8F6F2] rounded-lg overflow-hidden border border-border group flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={getMediaUrl(t.image)}
                    alt={`Portrait de ${t.name}`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold text-sm">{t.name}, {t.age} ans</p>
                    <p className="text-white/65 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <Quote size={20} className="text-[#D32F2F] mb-3 shrink-0" />
                  <p className="text-foreground/70 text-sm leading-relaxed italic flex-1">
                    &ldquo;{t.excerpt}&rdquo;
                  </p>
                  <button
                    onClick={() => setSelected(t)}
                    className="mt-5 text-xs font-bold uppercase tracking-wider text-[#002D62] hover:text-[#D32F2F] transition-colors text-left"
                  >
                    Lire le témoignage complet &rarr;
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
                <p className="text-white font-serif text-xl font-bold">{selected.name}</p>
                <p className="text-white/70 text-xs">{selected.age} ans · {selected.role}</p>
              </div>
            </div>
            <div className="p-8">
              <Quote size={28} className="text-[#D32F2F] mb-4" />
              <p className="text-foreground/80 leading-relaxed text-sm italic">{selected.full_text}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
