import Link from "next/link"
import * as LucideIcons from "lucide-react"
import { getHomeCTAActions } from "@/lib/api"

interface HomeCtaProps {
  lang?: string;
}

export default async function HomeCta({ lang = 'fr' }: HomeCtaProps) {
  const actions = await getHomeCTAActions();

  if (!actions || actions.length === 0) return null;

  const getField = (obj: any, field: string) => {
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const t = {
    badge: lang === 'en' ? 'Take action today' : lang === 'es' ? 'Actúe hoy' : 'Agissez aujourd\'hui',
    title: lang === 'en' ? 'How to support us?' : lang === 'es' ? '¿Cómo apoyarnos?' : 'Comment nous soutenir ?',
    quote: lang === 'en'
      ? '"Three concrete ways to join our mission of memory and carry the hope of lasting peace."'
      : lang === 'es'
      ? '"Tres formas concretas de unirse a nuestra misión de memoria y llevar la esperanza de una paz duradera."'
      : '"Trois façons concrètes de rejoindre notre mission de mémoire et de porter l\'espoir d\'une paix durable."',
    discover: lang === 'en' ? 'Discover' : lang === 'es' ? 'Descubrir' : 'Découvrir',
  }

  return (
    <section className="py-16 md:py-24 bg-[#00142d] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" 
           style={{ backgroundImage: `radial-gradient(#D32F2F 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-[10px] font-extrabold uppercase tracking-[.3em] text-[#D32F2F] mb-4">
            {t.badge}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white text-balance leading-tight">
            {t.title}
          </h2>
          <div className="h-1 w-20 bg-[#D32F2F] mx-auto mt-6 rounded-full" />
          <p className="mt-8 text-white/50 max-w-2xl mx-auto leading-relaxed text-lg italic">
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {actions.map((a: any) => {
            const Icon = (LucideIcons as any)[a.icon_name] || LucideIcons.HelpCircle
            return (
              <div
                key={a.id}
                className={`group relative rounded-2xl p-10 flex flex-col gap-6 transition-all duration-500 border ${
                  a.is_primary
                    ? "bg-[#D32F2F] border-[#D32F2F] shadow-2xl shadow-red-900/40 hover:-translate-y-2"
                    : "bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-2xl shadow-black/40"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                    a.is_primary ? "bg-white/20" : "bg-[#D32F2F]/10 border border-[#D32F2F]/20 shadow-lg shadow-red-900/20"
                  }`}
                >
                  <Icon size={24} className={a.is_primary ? "text-white" : "text-[#D32F2F]"} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-white text-2xl mb-3 tracking-tight">{getField(a, 'title')}</h3>
                  <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">{getField(a, 'description')}</p>
                </div>
                <Link
                  href={`/${lang}${a.href}` || "#"}
                  className={`mt-8 inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 rounded-xl transition-all duration-300 ${
                    a.is_primary
                      ? "bg-white text-[#D32F2F] hover:shadow-xl hover:shadow-white/20 active:scale-95"
                      : "bg-[#D32F2F] text-white hover:bg-red-700 shadow-lg shadow-red-900/20 active:scale-95"
                  }`}
                >
                  {t.discover}
                  <LucideIcons.ArrowRight size={14} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
