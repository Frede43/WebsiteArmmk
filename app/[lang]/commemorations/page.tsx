import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI, getMediaUrl } from "@/lib/api"
import { getDictionary } from "@/lib/get-dictionary"



export default async function CommemorationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const activeLang = lang as 'fr' | 'en' | 'es'
  const programme = await fetchAPI('/programme/') || [];
  const pastEditions = await fetchAPI('/past-editions/') || [];
  const commemSection = await fetchAPI('/commemoration-section/');
  const memorialSite = await fetchAPI('/memorial-site/');

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const t = {
    title: lang === 'en' ? 'Commemorations and Places of Memory' : lang === 'es' ? 'Conmemoraciones y Lugares de Memoria' : 'Commémoration et Lieux de Mémoire',
    subtitle: lang === 'en'
      ? 'Each year, from December 30 to January 2, ARMMK gathers the entire community to honor the victims and renew the commitment to peace.'
      : lang === 'es'
      ? 'Cada año, del 30 de diciembre al 2 de enero, ARMMK reúne a toda la comunidad para honrar a las víctimas y renovar el compromiso con la paz.'
      : 'Chaque année, du 30 décembre au 2 janvier, l\'ARMMK rassemble toute la communauté pour honorer les victimes et renouveler l\'engagement pour la paix.',
    upcoming: lang === 'en' ? 'Upcoming' : lang === 'es' ? 'Próximos' : 'À venir',
    openToAll: lang === 'en' ? 'Open to all – free entry' : lang === 'es' ? 'Abierto a todos – entrada libre' : 'Ouvert à toutes et tous – entrée libre',
    participate: lang === 'en' ? 'I participate' : lang === 'es' ? 'Participaré' : 'Je participe',
    programTitle: lang === 'en' ? 'Indicative program' : lang === 'es' ? 'Programa indicativo' : 'Programme indicatif',
    memorialTitle: lang === 'en' ? 'The Makobola Memorial Site' : lang === 'es' ? 'El sitio mémorial de Makobola' : 'Le site mémorial de Makobola',
    memorialBadge: lang === 'en' ? 'Place of memory' : lang === 'es' ? 'Lugar de memoria' : 'Lieu de mémoire',
    memorialDesc: lang === 'en'
      ? 'The Makobola memorial site, located in the very village where the massacre took place, is the symbolic heart of our action. A commemorative stele was inaugurated there in 2020 in memory of the victims.'
      : lang === 'es'
      ? 'El sitio mémorial de Makobola, situado en el mismo pueblo donde tuvo lugar la masacre, es el corazón simbólico de nuestra acción. En 2020 se inauguró allí una estela conmemorativa en memoria de las víctimas.'
      : 'Le site mémorial de Makobola, situé dans le village même où le massacre a eu lieu, est le cœur symbolique de notre action. Une stèle commémorative y a été inaugurée en 2020 à la mémoire des victimes.',
    pastEditionsTitle: lang === 'en' ? 'Past Editions' : lang === 'es' ? 'Ediciones pasadas' : 'Éditions passées',
    pastEditionsBadge: lang === 'en' ? 'Looking back' : lang === 'es' ? 'Mirada atrás' : 'Regards en arrière',
    participants: lang === 'en' ? 'participants' : lang === 'es' ? 'participantes' : 'participants',
  }

  return (
    <>
      <PageShell
        title={t.title}
        subtitle={t.subtitle}
        image={commemSection?.image ? getMediaUrl(commemSection.image) : "/images/commemoration.jpg"}
        breadcrumbs={[{ label: lang === 'en' ? 'Commemorations' : lang === 'es' ? 'Conmemoraciones' : 'Commémorations' }]}
      />

      {/* Prochaine commémoration */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              {t.upcoming}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62] mb-6">
              {getField(commemSection, 'title') || (lang === 'fr' ? "27e Commémoration du Massacre de Makobola" : "27th Commemoration")}
            </h2>
            <div className="flex flex-col gap-3 mb-7">
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <Calendar size={16} className="text-[#D32F2F] shrink-0" />
                <span>{getField(commemSection, 'date_text')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <MapPin size={16} className="text-[#D32F2F] shrink-0" />
                <span>{getField(commemSection, 'location')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <Users size={16} className="text-[#D32F2F] shrink-0" />
                <span>{t.openToAll}</span>
              </div>
            </div>
            <p className="text-foreground/65 text-sm leading-relaxed mb-8">
              {getField(commemSection, 'description')}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
            >
              {t.participate}
            </Link>
          </div>

          {/* Programme */}
          <div className="bg-[#F8F6F2] rounded-lg border border-border p-8">
            <h3 className="font-serif font-bold text-[#002D62] text-xl mb-6 flex items-center gap-2">
              <Clock size={20} className="text-[#D32F2F]" />
              {t.programTitle}
            </h3>
            <ol className="space-y-4">
              {programme.map((p: any, i: number) => (
                <li key={p.id || i} className="flex gap-4 items-start">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#D32F2F] text-white text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#D32F2F] uppercase tracking-wider">{getField(p, 'time')}</p>
                    <p className="text-sm text-foreground/75 mt-0.5">{getField(p, 'event')}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Lieu de mémoire */}
      <section className="py-16 bg-[#002D62]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
            <Image src={memorialSite?.image ? getMediaUrl(memorialSite.image) : "/images/memorial-site.jpg"} alt={getField(memorialSite, 'title') || "Memorial"} fill className="object-cover" />
          </div>
          <div className="text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              {getField(memorialSite, 'badge') || t.memorialBadge}
            </span>
            <h3 className="font-serif text-2xl font-bold mb-4">{getField(memorialSite, 'title') || t.memorialTitle}</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-5 whitespace-pre-line">
              {getField(memorialSite, 'description') || t.memorialDesc}
            </p>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <MapPin size={14} className="text-[#D32F2F]" />
              <span>{getField(memorialSite, 'location') || (lang === 'en' ? 'Makobola, Fizi Territory, South Kivu, DRC' : 'Makobola, Territoire de Fizi, Sud-Kivu, RDC')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Éditions passées */}
      <section className="py-20 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              {t.pastEditionsBadge}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">{t.pastEditionsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEditions.map((e: any) => (
              <div key={e.id || e.year} className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
                <p className="font-serif text-4xl font-bold text-[#D32F2F] mb-2">{e.year}</p>
                <p className="text-[#002D62] font-semibold text-sm mb-1">{e.count} {t.participants}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{getField(e, 'highlight')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}
