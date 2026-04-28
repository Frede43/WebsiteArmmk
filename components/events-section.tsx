"use client"

import { useState, useEffect } from "react"
import { X, Calendar } from "lucide-react"
import { fetchAPI } from "@/lib/api"


export default function EventsSection() {
  const [selected, setSelected] = useState<any | null>(null)
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    fetchAPI('/events/').then(data => {
      if(data) setEvents(data)
    })
  }, [])

  return (
    <section id="events" className="bg-secondary py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--gold)] font-sans text-xs uppercase tracking-[0.3em] font-semibold">
            Notre calendrier
          </span>
          <h2 className="font-serif text-foreground text-3xl md:text-4xl font-bold mt-3">
            Événements
          </h2>
          <p className="text-muted-foreground font-sans text-sm mt-2">
            Quelques-uns des événements organisés par IBUKA.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-0.5 bg-[var(--gold)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
            <div className="w-12 h-0.5 bg-[var(--gold)]" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelected(event)}
              className={`group relative rounded-sm overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${event.color}`}
            >
              <div className="p-8">
                <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-white/60 mb-4 border border-white/20 px-2 py-0.5 rounded-sm">
                  {event.tag}
                </span>
                <h3 className="font-serif text-white text-2xl font-bold mb-3">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-white/70 text-xs font-sans">
                  <Calendar size={12} />
                  <span>{event.date}</span>
                </div>
                <div className="mt-6 flex items-center gap-2 text-white/60 text-xs font-sans group-hover:text-white/90 transition-colors">
                  <span>Lire plus</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 group-hover:bg-white/50 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card rounded-sm max-w-2xl w-full p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
            <span className="inline-block text-[var(--gold)] font-sans text-xs uppercase tracking-[0.25em] font-semibold border border-[var(--gold)]/30 px-2 py-0.5 rounded-sm mb-4">
              {selected.tag}
            </span>
            <h3 className="font-serif text-foreground text-2xl font-bold mb-2">
              {selected.title}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-sans mb-6">
              <Calendar size={12} />
              <span>Date : {selected.date}</span>
            </div>
            <div className="w-12 h-0.5 bg-[var(--gold)] mb-6" />
            <p className="text-muted-foreground font-sans text-sm leading-relaxed">
              {selected.description}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="mt-8 bg-[var(--navy)] text-white font-sans text-xs uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-[var(--gold)] transition-colors duration-200"
            >
              Fermer l&apos;événement
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
