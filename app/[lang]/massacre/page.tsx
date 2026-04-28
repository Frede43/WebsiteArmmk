import Image from "next/image"
import Link from "next/link"
import { AlertTriangle, Clock, MapPin, Users } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"



export default async function MassacrePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const activeLang = lang as 'fr' | 'en' | 'es'
  const timeline = await fetchAPI('/timeline/') || [];
  const config = await fetchAPI('/config/');
  const stats = await fetchAPI('/stats/') || [];

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const t = {
    title: lang === 'en' ? 'The Makobola Massacre' : lang === 'es' ? 'La Masacre de Makobola' : 'Le Massacre de Makobola',
    warning: lang === 'en' 
      ? 'This page contains information about a mass massacre. The content is handled with respect and sobriety, for memory and historical truth.'
      : lang === 'es'
      ? 'Esta página contiene información sobre una masacre masiva. El contenido se trata con respeto y sobriedad, con el objetivo de memoria y verdad histórica.'
      : 'Cette page contient des informations sur un massacre de masse. Le contenu est traité avec respect et sobriété, dans un objectif de mémoire et de vérité historique.',
    whatHappened: lang === 'en' ? 'What happened' : lang === 'es' ? 'Lo que pasó' : 'Ce qui s\'est passé',
    introDefaultTitle: lang === 'en' ? 'A crime against humanity in the heart of Congo' : lang === 'es' ? 'Un crimen contra la humanidad en el corazón del Congo' : 'Un crime contre l\'humanité en plein cœur du Congo',
    timelineTitle: lang === 'en' ? 'Timeline' : lang === 'es' ? 'Cronología' : 'Chronologie',
    timelineBadge: lang === 'en' ? 'How it unfolded' : lang === 'es' ? 'Cómo se desarrolló' : 'Déroulement des faits',
    survivorsSpeak: lang === 'en' ? 'Survivors speak out' : lang === 'es' ? 'Los sobrevivientes hablan' : 'Les rescapés témoignent',
    survivorsText: lang === 'en'
      ? 'Beyond the numbers, these are lives, families, stories. Read the direct testimonies of the survivors of the Makobola massacre.'
      : lang === 'es'
      ? 'Más allá de las cifras, se trata de vidas, familias, historias. Lea los testimonios directos de los sobrevivientes de la masacre de Makobola.'
      : 'Au-delà des chiffres, ce sont des vies, des familles, des histoires. Lisez les témoignages directs des survivants du massacre de Makobola.',
    readTestimonies: lang === 'en' ? 'Read testimonies' : lang === 'es' ? 'Leer testimonios' : 'Lire les témoignages',
    commemorations: lang === 'en' ? 'Commemorations' : lang === 'es' ? 'Conmemoraciones' : 'Les commémorations',
    introSubtitle: lang === 'en' 
      ? 'December 30, 1998 – January 2, 1999 · Over 500 civilian victims · Fizi, South Kivu, DRC'
      : lang === 'es'
      ? '30 de diciembre de 1998 – 2 de enero de 1999 · Más de 500 víctimas civiles · Fizi, Kivu del Sur, RDC'
      : '30 décembre 1998 – 2 janvier 1999 · Plus de 500 victimes civiles · Fizi, Sud-Kivu, RDC',
  }

  return (
    <>
      <PageShell
        title={t.title}
        subtitle={getField(config, 'massacre_intro_title') || t.introSubtitle}
        image={config?.massacre_intro_image || "/images/memorial-site.jpg"}
        breadcrumbs={[{ label: t.title }]}
      />

      {/* Avertissement */}
      <div className="bg-amber-50 border-y border-amber-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm leading-relaxed">
            {t.warning}
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-5 text-foreground/75 leading-relaxed text-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] block">
              {t.whatHappened}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62] text-balance">
              {getField(config, 'massacre_intro_title') || t.introDefaultTitle}
            </h2>
            <div className="space-y-4">
              {getField(config, 'massacre_intro_content') ? (
                <div dangerouslySetInnerHTML={{ __html: getField(config, 'massacre_intro_content').replace(/\n/g, '<br/>') }} />
              ) : (
                <p>Default history content in {lang} placeholder...</p>
              )}
            </div>
          </div>
          <div className="relative h-80 lg:h-[420px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={config?.massacre_intro_image || "/images/memorial-site.jpg"}
              alt="Makobola"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="py-14 bg-[#002D62]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.slice(0, 4).map((s: any) => {
            return (
              <div key={s.id || s.label} className="border-r border-white/10 last:border-0 px-2">
                <p className="font-serif text-3xl font-bold text-white">{s.value}</p>
                <p className="text-white/60 text-xs mt-1 uppercase tracking-wider">{getField(s, 'label')}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Chronologie */}
      <section className="py-20 bg-[#F8F6F2]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              {t.timelineBadge}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">{t.timelineTitle}</h2>
          </div>
          <ol className="relative border-l-2 border-[#D32F2F]/30 space-y-0">
            {timeline.map((item: any, i: number) => (
              <li key={item.id || i} className="ml-8 pb-10 last:pb-0 relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-2 border-[#D32F2F] bg-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                </div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-2">
                  {getField(item, 'date')}
                </span>
                <h3 className="font-serif font-bold text-[#002D62] text-lg mb-2">{getField(item, 'title')}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{getField(item, 'text')}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA témoignages */}
      <section className="py-14 bg-white border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl font-bold text-[#002D62] mb-4">
            {t.survivorsSpeak}
          </h3>
          <p className="text-foreground/65 leading-relaxed mb-7">
            {t.survivorsText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/temoignages`}
              className="bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
            >
              {t.readTestimonies}
            </Link>
            <Link
              href={`/${lang}/commemorations`}
              className="border-2 border-[#002D62] text-[#002D62] hover:bg-[#002D62] hover:text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
            >
              {t.commemorations}
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}
