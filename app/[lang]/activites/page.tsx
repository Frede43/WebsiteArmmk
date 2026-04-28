"use client"

import { useState, useEffect, Suspense, use } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import * as Icons from "lucide-react"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"

/* ─── DATA ─────────────────────────────────────────────────── */

const typeColors: Record<string, string> = {
  dialogue: "bg-[#002D62] text-white",
  formation: "bg-amber-600 text-white",
  soutien: "bg-emerald-700 text-white",
  commemoration: "bg-[#D32F2F] text-white",
  gouvernance: "bg-gray-600 text-white",
}

type Tab = "toutes" | "a-venir" | "calendrier"

/* ─── PAGE CONTENT ─────────────────────────────────────────── */

function ActivitesContent({ lang }: { lang: string }) {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<Tab>("toutes")
  const [activities, setActivities] = useState<any[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [calendarMonths, setCalendarMonths] = useState<any[]>([])

  useEffect(() => {
    Promise.all([
      fetchAPI('/activities/'),
      fetchAPI('/upcoming-events/'),
      fetchAPI('/calendar/')
    ]).then(([acts, evts, cal]) => {
      if (acts) setActivities(acts)
      if (evts) setUpcomingEvents(evts)
      if (cal) setCalendarMonths(cal)
    })
  }, [])

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab === "a-venir") setActiveTab("a-venir")
    else if (tab === "calendrier") setActiveTab("calendrier")
    else setActiveTab("toutes")
  }, [searchParams])

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const typeLabels: Record<string, string> = {
    dialogue: lang === 'en' ? 'Dialogue' : lang === 'es' ? 'Diálogo' : 'Dialogue',
    formation: lang === 'en' ? 'Training' : lang === 'es' ? 'Formación' : 'Formation',
    soutien: lang === 'en' ? 'Support' : lang === 'es' ? 'Apoyo' : 'Soutien',
    commemoration: lang === 'en' ? 'Commemoration' : lang === 'es' ? 'Conmemoración' : 'Commémoration',
    gouvernance: lang === 'en' ? 'Governance' : lang === 'es' ? 'Gobernanza' : 'Gouvernance',
  }

  const t = {
    title: lang === 'en' ? 'Our Activities' : lang === 'es' ? 'Nuestras Actividades' : 'Nos Activités',
    subtitle: lang === 'en' 
      ? 'ARMMK acts on four complementary axes to honor the victims, support the survivors and reconcile the communities of Fizi.'
      : lang === 'es'
      ? 'ARMMK actúa en cuatro ejes complementarios para honrar a las víctimas, apoyar a los sobrevivientes y reconciliar a las comunidades de Fizi.'
      : 'L\'ARMMK agit sur quatre axes complémentaires pour honorer les victimes, accompagner les survivants et réconcilier les communautés de Fizi.',
    tabs: {
      toutes: lang === 'en' ? 'All activities' : lang === 'es' ? 'Todas las actividades' : 'Toutes les activités',
      aVenir: lang === 'en' ? 'Upcoming' : lang === 'es' ? 'Próximos' : 'À venir',
      calendrier: lang === 'en' ? 'Calendar' : lang === 'es' ? 'Calendario' : 'Calendrier',
    },
    upcomingTitle: lang === 'en' ? 'Upcoming events' : lang === 'es' ? 'Próximos eventos' : 'Événements à venir',
    upcomingSub: lang === 'en' ? 'Future activities planned by ARMMK' : lang === 'es' ? 'Próximas actividades planeadas por ARMMK' : 'Prochaines activités planifiées par l\'ARMMK',
    calendarTitle: lang === 'en' ? 'Calendar 2025' : lang === 'es' ? 'Calendario 2025' : 'Calendrier 2025',
    calendarSub: lang === 'en' ? 'Monthly planning of ARMMK activities' : lang === 'es' ? 'Planificación mensual de las actividades de ARMMK' : 'Planning mensuel des activités de l\'ARMMK',
    next: lang === 'en' ? 'Next' : lang === 'es' ? 'Próximo' : 'Prochain',
    participants: lang === 'en' ? 'participants' : lang === 'es' ? 'participantes' : 'participants',
    viewDetail: lang === 'en' ? 'View details' : lang === 'es' ? 'Ver detalle' : 'Voir le détail',
    viewActivity: lang === 'en' ? 'View activity' : lang === 'es' ? 'Ver actividad' : 'Voir l\'activité',
    newsletterTitle: lang === 'en' ? 'Receive calendar updates' : lang === 'es' ? 'Recibir actualizaciones del calendario' : 'Recevoir les mises à jour du calendrier',
    newsletterText: lang === 'en' ? 'Subscribe to our newsletter to be informed of every new event.' : lang === 'es' ? 'Suscríbase a nuestro boletín para estar informado de cada nuevo evento.' : 'Inscrivez-vous à notre newsletter pour être informé de chaque nouvel événement.',
    subscribe: lang === 'en' ? 'Subscribe to newsletter' : lang === 'es' ? 'Suscribirse al boletín' : 'S\'inscrire à la newsletter',
    supportTitle: lang === 'en' ? 'Support our activities' : lang === 'es' ? 'Apoye nuestras actividades' : 'Soutenez nos activités',
    supportText: lang === 'en' 
      ? 'Each of these actions has a cost. Your financial support or volunteering allows us to continue working for memory and peace in Fizi.'
      : lang === 'es'
      ? 'Cada una de estas acciones tiene un costo. Su apoyo financiero o voluntariado nos permite seguir trabajando por la memoria y la paz en Fizi.'
      : 'Chacune de ces actions a un coût. Votre soutien financier ou en bénévolat nous permet de continuer à œuvrer pour la mémoire et la paix à Fizi.',
    donate: lang === 'en' ? 'Donate' : lang === 'es' ? 'Donar' : 'Faire un don',
    volunteer: lang === 'en' ? 'Become a volunteer' : lang === 'es' ? 'Ser voluntario' : 'Devenir volontaire',
    loading: lang === 'en' ? 'Loading...' : lang === 'es' ? 'Cargando...' : 'Chargement...',
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "toutes", label: t.tabs.toutes, icon: <Icons.Users size={15} /> },
    { id: "a-venir", label: t.tabs.aVenir, icon: <Icons.Clock size={15} /> },
    { id: "calendrier", label: t.tabs.calendrier, icon: <Icons.CalendarDays size={15} /> },
  ]

  return (
    <>
      <PageShell
        title={t.title}
        subtitle={t.subtitle}
        image="/images/activities-dialogue.jpg"
        breadcrumbs={[{ label: t.title }]}
        lang={lang}
      />

      {/* Tab bar */}
      <div className="sticky top-[66px] z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "border-[#D32F2F] text-[#D32F2F]"
                    : "border-transparent text-gray-500 hover:text-[#002D62] hover:border-gray-300"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB: TOUTES ── */}
      {activeTab === "toutes" && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-20">
            {activities.map((d, i) => {
              const Icon = (Icons as any)[d.icon] || Icons.Circle
              const isEven = i % 2 === 0
              return (
                <div
                  key={d.slug}
                  id={d.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    isEven ? "" : "lg:[&>*:first-child]:order-2"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: d.color }}
                      >
                        <Icon size={20} className="text-white" />
                      </div>
                      <span
                        className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{ backgroundColor: d.color + "18", color: d.color }}
                      >
                        {getField(d, 'tag')}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#002D62] mb-4 text-balance">
                      {getField(d, 'title')}
                    </h2>
                    <p className="text-foreground/65 leading-relaxed mb-6 text-sm">{getField(d, 'description')}</p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-6 border-t border-gray-100 pt-4">
                      <span className="flex items-center gap-1.5">
                        <Icons.Calendar size={13} className="text-[#D32F2F]" />
                        {t.next} : <strong className="text-[#002D62]">{getField(d, 'next_event')}</strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icons.MapPin size={13} className="text-[#D32F2F]" />
                        {getField(d, 'location')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icons.Users size={13} className="text-[#D32F2F]" />
                        {d.participants} {t.participants}
                      </span>
                    </div>

                    <ul className="space-y-2.5 mb-7">
                      {(getField(d, 'achievements_list') || []).map((a: string, ai: number) => (
                        <li key={ai} className="flex items-start gap-2.5 text-sm text-foreground/70">
                          <Icons.CheckCircle2 size={15} className="text-[#D32F2F] shrink-0 mt-0.5" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/${lang}/activites/${d.slug}`}
                      className="inline-flex items-center gap-2 bg-[#002D62] hover:bg-[#001a3d] text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded transition-colors"
                    >
                      {t.viewDetail}
                      <Icons.ArrowRight size={13} />
                    </Link>
                  </div>
                  <div className="relative h-64 lg:h-[380px] rounded-xl overflow-hidden shadow-xl">
                    <Image src={d.image} alt={getField(d, 'title')} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/15 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-white/20">
                        {getField(d, 'tag')}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── TAB: À VENIR ── */}
      {activeTab === "a-venir" && (
        <section className="py-16 bg-[#F8F6F2]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-[#002D62]">{t.upcomingTitle}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {t.upcomingSub}
              </p>
            </div>
            <div className="space-y-5">
              {upcomingEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row"
                >
                  {/* Date block */}
                  <div className="sm:w-24 bg-[#002D62] flex flex-row sm:flex-col items-center justify-center gap-2 sm:gap-0 p-4 shrink-0">
                    <span className="text-[#D32F2F] font-mono font-black text-3xl sm:text-4xl leading-none">
                      {evt.date?.day}
                    </span>
                    <span className="text-white/80 font-sans text-xs uppercase tracking-widest sm:mt-1">
                      {evt.date?.month}
                    </span>
                    <span className="text-white/40 font-sans text-[10px] hidden sm:block">
                      {evt.date?.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-base font-bold text-[#002D62] leading-tight">
                        {getField(evt, 'title')}
                      </h3>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0 ${typeColors[evt.type] || "bg-gray-500 text-white"}`}
                      >
                        {typeLabels[evt.type] || evt.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{getField(evt, 'description')}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Icons.Clock size={12} className="text-[#D32F2F]" />
                        {getField(evt, 'time')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icons.MapPin size={12} className="text-[#D32F2F]" />
                        {getField(evt, 'location')}
                      </span>
                      {evt.activitySlug && (
                        <Link
                          href={`/${lang}/activites/${evt.activitySlug}`}
                          className="flex items-center gap-1 text-[#002D62] hover:text-[#D32F2F] font-semibold transition-colors ml-auto"
                        >
                          {t.viewActivity} <Icons.ChevronRight size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: CALENDRIER ── */}
      {activeTab === "calendrier" && (
        <section className="py-16 bg-[#F8F6F2]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-[#002D62]">{t.calendarTitle}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {t.calendarSub}
              </p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-8">
              {Object.entries(typeLabels).map(([type, label]) => (
                <span
                  key={type}
                  className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${typeColors[type]}`}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {calendarMonths.map((m, mi) => (
                <div
                  key={mi}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  {/* Month header */}
                  <div className="bg-[#002D62] px-5 py-3">
                    <h3 className="font-serif text-base font-bold text-white">{m.month}</h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {m.events?.map((ev: any, ei: number) => (
                      <div key={ei} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-[#002D62]/8 flex items-center justify-center shrink-0">
                          <span className="text-[#002D62] font-black text-sm font-mono">{ev.day}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#002D62] truncate">{getField(ev, 'title')}</p>
                        </div>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shrink-0 ${typeColors[ev.type] || "bg-gray-500 text-white"}`}
                        >
                          {typeLabels[ev.type] || ev.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-white rounded-xl border border-gray-100 text-center">
              <Icons.CalendarDays size={28} className="mx-auto text-[#D32F2F] mb-3" />
              <p className="text-sm text-gray-600 font-medium mb-1">{t.newsletterTitle}</p>
              <p className="text-xs text-gray-400 mb-4">{t.newsletterText}</p>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded transition-colors"
              >
                {t.subscribe}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-14 bg-[#002D62]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl font-bold text-white mb-4">{t.supportTitle}</h3>
          <p className="text-white/60 mb-7 leading-relaxed text-sm">
            {t.supportText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/soutenir`}
              className="bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
            >
              {t.donate}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="border border-white/30 hover:border-white text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
            >
              {t.volunteer}
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}

/* ─── PAGE EXPORT ─────────────────────────────────────────── */

export default function ActivitesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const t_loading = lang === 'en' ? 'Loading...' : lang === 'es' ? 'Cargando...' : 'Chargement...'

  return (
    <Suspense fallback={<div>{t_loading}</div>}>
      <ActivitesContent lang={lang} />
    </Suspense>
  )
}
