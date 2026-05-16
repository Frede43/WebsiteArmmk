'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ArrowLeft, MessageCircle } from "lucide-react"

export default function NotFound() {
  const pathname = usePathname()
  const lang = pathname?.split('/')[1] || 'fr'
  
  const translations = {
    fr: {
      title: "Page introuvable",
      subtitle: "Il semble que le chemin vers cette mémoire ait été égaré.",
      description: "La page que vous recherchez n'existe plus ou a été déplacée. Nous vous invitons à retourner vers la lumière de notre accueil.",
      backHome: "Retour à l'accueil",
      goBack: "Page précédente",
      contact: "Nous contacter",
      popular: "Pages populaires :"
    },
    en: {
      title: "Page Not Found",
      subtitle: "It seems the path to this memory has been lost.",
      description: "The page you are looking for no longer exists or has been moved. We invite you to return to our home page.",
      backHome: "Back to Home",
      goBack: "Go back",
      contact: "Contact us",
      popular: "Popular pages:"
    },
    es: {
      title: "Página no encontrada",
      subtitle: "Parece que el camino a este recuerdo se ha perdido.",
      description: "La página que busca ya no existe o ha sido movida. Le invitamos a volver a nuestra página de inicio.",
      backHome: "Volver al inicio",
      goBack: "Regresar",
      contact: "Contáctenos",
      popular: "Páginas populares:"
    }
  }

  const t = translations[lang as keyof typeof translations] || translations.fr

  return (
    <div className="min-h-[90vh] bg-white flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F8F6F2] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D32F2F]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 opacity-50" />

      <div className="max-w-3xl w-full text-center relative z-10">
        <div className="relative inline-block mb-12">
          <span className="font-serif text-[180px] md:text-[240px] font-bold text-[#002D62]/5 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-white shadow-2xl rounded-3xl flex items-center justify-center rotate-12 border border-gray-100">
               <Search size={48} className="text-[#D32F2F] -rotate-12" />
            </div>
          </div>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#002D62] mb-6 leading-tight">
          {t.title}
        </h1>
        <p className="text-[#D32F2F] font-medium text-lg md:text-xl mb-4 italic">
          "{t.subtitle}"
        </p>
        <p className="text-gray-500 mb-12 max-w-lg mx-auto leading-relaxed">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
          <Link
            href={`/${lang}`}
            className="group relative inline-flex items-center gap-3 bg-[#002D62] hover:bg-[#D32F2F] text-white font-bold text-sm uppercase tracking-widest px-10 py-5 rounded-full transition-all duration-500 shadow-xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home size={18} />
              {t.backHome}
            </span>
            <div className="absolute inset-0 bg-[#D32F2F] transition-transform duration-500 translate-y-full group-hover:translate-y-0" />
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#002D62] hover:text-[#D32F2F] transition-colors"
          >
            <ArrowLeft size={18} />
            {t.goBack}
          </button>
        </div>

        <div className="pt-12 border-t border-gray-100">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-8">
            {t.popular}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { label: 'Activités', href: `/${lang}/activites` },
              { label: 'Le Massacre', href: `/${lang}/massacre` },
              { label: 'Témoignages', href: `/${lang}/temoignages` },
              { label: 'Contact', href: `/${lang}/contact` },
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href}
                className="text-xs font-bold text-[#002D62]/60 hover:text-[#D32F2F] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
