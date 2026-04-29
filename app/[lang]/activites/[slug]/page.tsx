import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  CheckCircle2, Calendar, MapPin, Users, ArrowLeft,
  ChevronRight, ArrowRight, Clock,
} from "lucide-react"
import * as Icons from "lucide-react"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { getActivities } from "@/lib/api"
import { notFound } from "next/navigation"

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop();
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes('vimeo.com')) {
    const id = url.split('/').pop();
    return `https://player.vimeo.com/video/${id}`;
  }
  return url;
}

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const activities = await getActivities()
  const langs = ['fr', 'en', 'es']
  const params: { lang: string; slug: string }[] = []
  
  langs.forEach(lang => {
    activities.forEach((a: any) => {
      params.push({ lang, slug: a.slug })
    })
  })
  
  return params
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params
  const activities = await getActivities()
  const activity = activities.find((a: any) => a.slug === slug)
  if (!activity) return {}
  
  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  return {
    title: `${getField(activity, 'title')} – ARMMK`,
    description: getField(activity, 'shortDesc'),
  }
}

export default async function ActivityDetailPage({ params }: Props) {
  const { lang, slug } = await params
  const activities = await getActivities()
  const activity = activities.find((a: any) => a.slug === slug)
  if (!activity) notFound()

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const Icon = (Icons as any)[activity.icon] || Icons.Circle
  const others = activities.filter((a: any) => a.slug !== slug)

  const t = {
    allActivities: lang === 'en' ? 'Our Activities' : lang === 'es' ? 'Nuestras Actividades' : 'Nos Activités',
    back: lang === 'en' ? 'Back to activities' : lang === 'es' ? 'Volver a actividades' : 'Retour aux activités',
    achievements: lang === 'en' ? 'Our achievements' : lang === 'es' ? 'Nuestros logros' : 'Nos réalisations',
    supportActivity: lang === 'en' ? 'Support this activity' : lang === 'es' ? 'Apoyar esta actividad' : 'Soutenir cette activité',
    becomeVolunteer: lang === 'en' ? 'Become a volunteer' : lang === 'es' ? 'Hacerse voluntario' : 'Devenir volontaire',
    nextEvent: lang === 'en' ? 'Next event' : lang === 'es' ? 'Próximo evento' : 'Prochain événement',
    viewAllEvents: lang === 'en' ? 'See all events' : lang === 'es' ? 'Ver todos los eventos' : 'Voir tous les événements',
    upcoming: lang === 'en' ? 'Upcoming' : lang === 'es' ? 'Próximamente' : 'À venir',
    viewCalendar: lang === 'en' ? 'See calendar' : lang === 'es' ? 'Ver el calendario' : 'Voir le calendrier',
    otherActivities: lang === 'en' ? 'Other activities' : lang === 'es' ? 'Otras actividades' : 'Autres activités',
    dateLabel: lang === 'en' ? 'Date' : lang === 'es' ? 'Fecha' : 'Date',
    locationLabel: lang === 'en' ? 'Location' : lang === 'es' ? 'Lugar' : 'Lieu',
    participantsLabel: lang === 'en' ? 'Participants' : lang === 'es' ? 'Participantes' : 'Participants',
  }

  return (
    <>
      <PageShell
        title={getField(activity, 'title')}
        subtitle={getField(activity, 'shortDesc')}
        image={activity.image}
        breadcrumbs={[
          { label: t.allActivities, href: `/${lang}/activites` },
          { label: getField(activity, 'title') },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ── Main content ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Back link */}
              <Link
                href={`/${lang}/activites`}
                className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-[#002D62] transition-colors"
              >
                <ArrowLeft size={13} />
                {t.back}
              </Link>

              {/* Tag + title */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow"
                    style={{ backgroundColor: activity.color }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ backgroundColor: activity.color + "15", color: activity.color }}
                  >
                    {activity.tag}
                  </span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#002D62] text-balance leading-tight">
                  {getField(activity, 'title')}
                </h1>
              </div>

              {/* Image */}
              <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={activity.image}
                  alt={getField(activity, 'title')}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/40 to-transparent" />
              </div>

              {/* Description */}
              <div className="prose prose-sm max-w-none">
                <p className="text-base text-foreground/70 leading-loose">{getField(activity, 'description')}</p>
              </div>

              {/* Video Section */}
              {activity.video_url && (
                <div className="space-y-4 pt-6">
                  <h2 className="font-serif text-xl font-bold text-[#002D62] flex items-center gap-2">
                    <Icons.Video size={20} className="text-[#D32F2F]" />
                    {lang === 'en' ? 'Video Presentation' : lang === 'es' ? 'Presentación de video' : 'Vidéo de présentation'}
                  </h2>
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl bg-black">
                    <iframe
                      src={getEmbedUrl(activity.video_url)}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Achievements */}
              <div>
                <h2 className="font-serif text-xl font-bold text-[#002D62] mb-5 flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#D32F2F] inline-block" />
                  {t.achievements}
                </h2>
                <ul className="space-y-4">
                  {(getField(activity, 'achievements_list') || []).map((a: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 bg-[#F8F6F2] rounded-lg px-5 py-4">
                      <CheckCircle2 size={17} className="text-[#D32F2F] shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/75 leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/${lang}/soutenir`}
                  className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded transition-colors"
                >
                  {t.supportActivity}
                  <ArrowRight size={13} />
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center gap-2 border border-[#002D62]/30 hover:border-[#002D62] text-[#002D62] text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded transition-colors"
                >
                  {t.becomeVolunteer}
                </Link>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-6">

              {/* Event info card */}
              <div className="bg-[#002D62] rounded-xl overflow-hidden shadow-lg">
                <div className="h-1 bg-[#D32F2F]" />
                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-base font-bold text-white">{t.nextEvent}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Calendar size={15} className="text-[#D32F2F] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider">{t.dateLabel}</p>
                        <p className="text-white font-semibold">{getField(activity, 'nextEvent')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={15} className="text-[#D32F2F] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider">{t.locationLabel}</p>
                        <p className="text-white font-semibold">{getField(activity, 'location')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users size={15} className="text-[#D32F2F] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider">{t.participantsLabel}</p>
                        <p className="text-white font-semibold">{getField(activity, 'participants')}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/${lang}/activites?tab=a-venir`}
                    className="block mt-2 text-center bg-[#D32F2F] hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded transition-colors"
                  >
                    {t.viewAllEvents}
                  </Link>
                </div>
              </div>

              {/* Upcoming mini-events */}
              <div className="bg-[#F8F6F2] rounded-xl p-5">
                <h3 className="font-serif text-base font-bold text-[#002D62] mb-4 flex items-center gap-2">
                  <Clock size={15} className="text-[#D32F2F]" />
                  {t.upcoming}
                </h3>
                <div className="space-y-3">
                  {[
                    { date: lang === 'en' ? "May 15" : lang === 'es' ? "15 May" : "15 Mai", title: "Session Dialogue #41" },
                    { date: lang === 'en' ? "June 3" : lang === 'es' ? "3 Jun" : "3 Juin", title: "Atelier Formation" },
                    { date: lang === 'en' ? "Dec 30" : lang === 'es' ? "30 Dic" : "30 Déc.", title: "27e Commémoration" },
                  ].map((e) => (
                    <div key={e.date} className="flex items-center gap-3 text-sm">
                      <span className="text-[#D32F2F] font-mono font-bold text-xs w-14 shrink-0">{e.date}</span>
                      <span className="text-[#002D62] text-xs leading-snug">{e.title}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/${lang}/activites?tab=calendrier`}
                  className="inline-flex items-center gap-1 text-[#D32F2F] text-xs font-semibold mt-4 hover:underline"
                >
                  {t.viewCalendar} <ChevronRight size={12} />
                </Link>
              </div>

              {/* Other activities */}
              <div>
                <h3 className="font-serif text-base font-bold text-[#002D62] mb-4">{t.otherActivities}</h3>
                <div className="space-y-3">
                  {others.map((o: any) => {
                    const OIcon = (Icons as any)[o.icon] || Icons.Circle
                    return (
                      <Link
                        key={o.slug}
                        href={`/${lang}/activites/${o.slug}`}
                        className="flex items-start gap-3 p-3.5 rounded-lg border border-gray-100 hover:border-[#002D62]/20 hover:bg-[#F8F6F2] transition-all group"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: o.color }}
                        >
                          <OIcon size={14} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#002D62] group-hover:text-[#D32F2F] transition-colors leading-snug line-clamp-2">
                            {getField(o, 'title')}
                          </p>
                        </div>
                        <ChevronRight size={13} className="text-gray-300 group-hover:text-[#D32F2F] shrink-0 mt-0.5 transition-colors" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}
