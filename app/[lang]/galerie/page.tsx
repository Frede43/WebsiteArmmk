"use client"

import { useState, useEffect, Suspense, use } from "react"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"

function GalerieContent({ lang }: { lang: string }) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [albums, setAlbums] = useState<any[]>([])

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  useEffect(() => {
    fetchAPI('/albums/').then(data => {
      if (data) setAlbums(data)
    })
  }, [])

  const t = {
    title: lang === 'en' ? 'Gallery' : lang === 'es' ? 'Galería' : 'Galerie',
    subtitle: lang === 'en' 
      ? 'Photos and videos of commemorations, workshops and activities of ARMMK.'
      : lang === 'es'
      ? 'Fotos y videos de conmemoraciones, talleres y actividades de ARMMK.'
      : 'Photos et vidéos des commémorations, ateliers et activités de l\'ARMMK.',
    close: lang === 'en' ? 'Close' : lang === 'es' ? 'Cerrar' : 'Fermer',
  }

  return (
    <>
      <PageShell
        title={t.title}
        subtitle={t.subtitle}
        image="/images/commemoration.jpg"
        breadcrumbs={[{ label: t.title }]}
        lang={lang}
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
                  <h2 className="font-serif text-2xl font-bold text-[#002D62]">{getField(album, 'title')}</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {album.photos?.map((photo: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setLightbox(photo)}
                    className="relative aspect-video overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-[#002D62]"
                  >
                    <Image
                      src={photo.src}
                      alt={getField(photo, 'alt')}
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
                      <p className="text-white text-xs">{getField(photo, 'alt')}</p>
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
            aria-label={t.close}
          >
            <X size={20} />
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={getField(lightbox, 'alt')}
              width={1200}
              height={800}
              className="object-contain w-full h-auto rounded-lg max-h-[80vh]"
            />
            <p className="text-white/70 text-sm text-center mt-3">{getField(lightbox, 'alt')}</p>
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </>
  )
}

export default function GaleriePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const t_loading = lang === 'en' ? 'Loading...' : lang === 'es' ? 'Cargando...' : 'Chargement...'

  return (
    <Suspense fallback={<div>{t_loading}</div>}>
      <GalerieContent lang={lang} />
    </Suspense>
  )
}
