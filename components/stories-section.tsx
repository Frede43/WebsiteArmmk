"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { fetchAPI, getMediaUrl } from "@/lib/api"



export default function StoriesSection() {
  const [selected, setSelected] = useState<any | null>(null)
  const [stories, setStories] = useState<any[]>([])

  useEffect(() => {
    fetchAPI('/stories/').then(data => {
      if(data) setStories(data)
    })
  }, [])

  return (
    <section id="stories" className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--gold)] font-sans text-xs uppercase tracking-[0.3em] font-semibold">
            Témoignages
          </span>
          <h2 className="font-serif text-foreground text-3xl md:text-4xl font-bold mt-3">
            100 Histoires
          </h2>
          <p className="text-muted-foreground font-sans text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Nous nous souvenons. Nous pleurons. Nous pardonnons. Nous espérons. Nous surmontons. Nous prospérons.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-0.5 bg-[var(--gold)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
            <div className="w-12 h-0.5 bg-[var(--gold)]" />
          </div>
        </div>

        {/* Story cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group flex flex-col sm:flex-row gap-6 bg-card border border-border rounded-sm p-6 hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg"
            >
              {/* Portrait */}
              <div className="relative w-full sm:w-32 h-44 sm:h-auto flex-shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={getMediaUrl(story.image)}
                  alt={`Portrait de ${story.name}`}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              {/* Content */}
              <div className="flex flex-col justify-between gap-3">
                <div>
                  <div className="w-8 h-0.5 bg-[var(--gold)] mb-3" />
                  <h3 className="font-serif text-foreground text-xl font-bold mb-1">
                    {story.name}
                  </h3>
                  <p className="font-sans text-[var(--gold)] text-xs italic mb-2">
                    &ldquo;{story.teaser}&rdquo;
                  </p>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(story)}
                  className="self-start text-[var(--gold)] text-xs font-sans uppercase tracking-widest border border-[var(--gold)]/40 px-4 py-2 rounded-sm hover:bg-[var(--gold)] hover:text-[var(--navy)] transition-all duration-200 font-semibold"
                >
                  Lire la suite...
                </button>
              </div>
            </div>
          ))}

          {/* Read more card */}
          <div className="flex items-center justify-center border-2 border-dashed border-border rounded-sm p-10 text-center hover:border-[var(--gold)] transition-colors group">
            <div>
              <div className="w-12 h-12 mx-auto border border-[var(--gold)]/40 rounded-full flex items-center justify-center mb-4 group-hover:bg-[var(--gold)]/10 transition-colors">
                <span className="text-[var(--gold)] font-serif text-xl">+</span>
              </div>
              <h3 className="font-serif text-foreground text-lg font-bold mb-2">
                En lire davantage
              </h3>
              <p className="text-muted-foreground font-sans text-sm">
                sur les <strong>100 Histoires</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card rounded-sm max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[var(--gold)]">
                <Image
                  src={getMediaUrl(selected.image)}
                  alt={`Portrait de ${selected.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="w-8 h-0.5 bg-[var(--gold)] mb-2" />
                <h3 className="font-serif text-foreground text-2xl font-bold">
                  {selected.name}
                </h3>
                <p className="text-[var(--gold)] font-sans text-xs italic">
                  &ldquo;{selected.teaser}&rdquo;
                </p>
              </div>
            </div>

            <div className="w-full h-0.5 bg-border mb-6" />

            <div className="font-sans text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {selected.full}
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-8 bg-[var(--navy)] text-white font-sans text-xs uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-[var(--gold)] transition-colors duration-200"
            >
              Fermer le témoignage
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
