import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Crumb {
  label: string
  href?: string
}

interface PageShellProps {
  title: string
  subtitle?: string
  image?: string
  breadcrumbs?: Crumb[]
  lang?: string
}

export default function PageShell({ title, subtitle, image, breadcrumbs = [], lang = 'fr' }: PageShellProps) {
  const homeLabel = lang === 'en' ? 'Home' : lang === 'es' ? 'Inicio' : 'Accueil'
  
  return (
    <section className="relative pt-28 sm:pt-40 pb-16 sm:pb-20 overflow-hidden">
      {image ? (
        <>
          <Image src={image} alt={title} fill className="object-cover transition-transform duration-1000 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002D62] via-[#002D62]/80 to-transparent" />
          <div className="absolute inset-0 bg-[#002D62]/40" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#002D62]" />
      )}
      
      {/* Abstract background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#D32F2F 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
 
      {/* Red accent top line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D32F2F] via-[#D32F2F] to-transparent" />
 
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 mb-8 flex-wrap animate-fade-in">
            <Link href={`/${lang}`} className="text-white/50 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">
              {homeLabel}
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight size={10} className="text-white/20" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-white/50 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#D32F2F] text-[10px] font-bold uppercase tracking-widest">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
 
        <div className="max-w-3xl animate-slide-up">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white text-balance leading-[1.1] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <div 
              className="mt-6 text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed font-medium prose prose-invert prose-sm"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          )}
          <div className="mt-10 flex items-center gap-4">
            <div className="h-1 w-20 bg-[#D32F2F] rounded-full animate-reveal origin-left" />
            <div className="h-1 w-8 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
