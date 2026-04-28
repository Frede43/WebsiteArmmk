"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { X, ZoomIn } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"



export default function GaleriePage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [albums, setAlbums] = useState<any[]>([])

  useEffect(() => {
    fetchAPI('/albums/').then(data => {
      if (data) setAlbums(data)
    })
  }, [])

  const allPhotos = albums.flatMap((a) => a.photos || [])

  return (
    <>
      <Navbar />
      <PageShell
        title="Galerie"
        subtitle="Photos et vidéos des commémorations, ateliers et activités de l'ARMMK."
        image="/images/commemoration.jpg"
        breadcrumbs={[{ label: "Galerie" }]}
      />

      {/* Albums par année */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {albums.map((album) => (
            <div key={album.year}>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] block mb-1">
                    {album.year}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#002D62]">{album.title}</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {album.photos?.map((photo: any) => (
                  <button
                    key={photo.src}
                    onClick={() => setLightbox(photo)}
                    className="relative aspect-video overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-[#002D62]"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <ZoomIn
                        size={32}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs">{photo.alt}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-[#D32F2F] text-white flex items-center justify-center transition-colors z-10"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={800}
              className="object-contain w-full h-auto rounded-lg max-h-[80vh]"
            />
            <p className="text-white/70 text-sm text-center mt-3">{lightbox.alt}</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
