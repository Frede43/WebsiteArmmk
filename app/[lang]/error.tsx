'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw, Home, Mail, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()
  const lang = pathname?.split('/')[1] || 'fr'

  useEffect(() => {
    console.error(error)
  }, [error])

  const translations = {
    fr: {
      title: "Oups ! Une erreur s'est glissée",
      subtitle: "Un incident technique perturbe l'affichage de cette page.",
      description: "Nos techniciens ont été prévenus. En attendant, vous pouvez tenter de recharger la page ou retourner à l'accueil.",
      retry: "Réessayer",
      home: "Accueil",
      support: "Contacter le support",
      debug: "Informations techniques (Dev seulement)"
    },
    en: {
      title: "Oops! An error occurred",
      subtitle: "A technical incident is affecting this page.",
      description: "Our team has been notified. In the meantime, you can try refreshing the page or return to the home page.",
      retry: "Try again",
      home: "Home",
      support: "Contact support",
      debug: "Technical info (Dev only)"
    },
    es: {
      title: "¡Ups! Ocurrió un error",
      subtitle: "Un incidente técnico está afectando esta página.",
      description: "Nuestro equipo ha sido notificado. Mientras tanto, puede intentar recargar la página o volver al inicio.",
      retry: "Reintentar",
      home: "Inicio",
      support: "Contactar soporte",
      debug: "Información técnica (Solo Dev)"
    }
  }

  const t = translations[lang as keyof typeof translations] || translations.fr

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dotPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#002D62" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl p-12 md:p-16 text-center relative z-10 border border-white">
        <div className="w-24 h-24 bg-[#D32F2F] rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-[#D32F2F]/20 animate-bounce">
          <ShieldAlert size={48} className="text-white" />
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#002D62] mb-4">
          {t.title}
        </h1>
        <p className="text-[#D32F2F] font-bold text-sm uppercase tracking-widest mb-6">
          {t.subtitle}
        </p>
        <p className="text-gray-500 mb-12 leading-relaxed">
          {t.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white px-8 py-5 rounded-2xl font-bold transition-all shadow-lg hover:shadow-red-700/20"
          >
            <RefreshCcw size={20} />
            {t.retry}
          </button>
          <Link
            href={`/${lang}`}
            className="flex items-center justify-center gap-2 bg-[#002D62] hover:bg-[#002D62]/90 text-white px-8 py-5 rounded-2xl font-bold transition-all shadow-lg hover:shadow-[#002D62]/20"
          >
            <Home size={20} />
            {t.home}
          </Link>
        </div>

        <div className="mt-12 pt-10 border-t border-gray-100">
           <Link 
            href={`/${lang}/contact`} 
            className="text-[#002D62] font-bold hover:text-[#D32F2F] transition-colors flex items-center justify-center gap-2 group"
          >
            <Mail size={18} className="group-hover:rotate-12 transition-transform" />
            {t.support}
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-10 text-left">
            <p className="text-[10px] font-mono text-gray-400 mb-2 uppercase tracking-widest">{t.debug}:</p>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
               <code className="text-[11px] text-red-600 block break-words leading-tight">{error.message}</code>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
