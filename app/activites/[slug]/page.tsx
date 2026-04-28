import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  CheckCircle2, Calendar, MapPin, Users, ArrowLeft,
  ChevronRight, ArrowRight, Clock,
} from "lucide-react"
import * as Icons from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { getActivities } from "@/lib/api"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const activities = await getActivities()
  return activities.map((a: any) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const activities = await getActivities()
  const activity = activities.find((a: any) => a.slug === slug)
  if (!activity) return {}
  return {
    title: `${activity.title} – ARMMK`,
    description: activity.shortDesc,
  }
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params
  const activities = await getActivities()
  const activity = activities.find((a: any) => a.slug === slug)
  if (!activity) notFound()

  const Icon = (Icons as any)[activity.icon] || Icons.Circle
  const others = activities.filter((a: any) => a.slug !== slug)

  return (
    <>
      <Navbar />
      <PageShell
        title={activity.title}
        subtitle={activity.shortDesc}
        image={activity.image}
        breadcrumbs={[
          { label: "Nos Activités", href: "/activites" },
          { label: activity.title },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ── Main content ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Back link */}
              <Link
                href="/activites"
                className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-[#002D62] transition-colors"
              >
                <ArrowLeft size={13} />
                Retour aux activités
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
                  {activity.title}
                </h1>
              </div>

              {/* Image */}
              <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/40 to-transparent" />
              </div>

              {/* Description */}
              <div className="prose prose-sm max-w-none">
                <p className="text-base text-foreground/70 leading-loose">{activity.description}</p>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="font-serif text-xl font-bold text-[#002D62] mb-5 flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#D32F2F] inline-block" />
                  Nos réalisations
                </h2>
                <ul className="space-y-4">
                  {activity.achievements?.map((a: string, i: number) => (
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
                  href="/soutenir"
                  className="inline-flex items-center justify-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded transition-colors"
                >
                  Soutenir cette activité
                  <ArrowRight size={13} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-[#002D62]/30 hover:border-[#002D62] text-[#002D62] text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded transition-colors"
                >
                  Devenir volontaire
                </Link>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-6">

              {/* Event info card */}
              <div className="bg-[#002D62] rounded-xl overflow-hidden shadow-lg">
                <div className="h-1 bg-[#D32F2F]" />
                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-base font-bold text-white">Prochain événement</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Calendar size={15} className="text-[#D32F2F] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider">Date</p>
                        <p className="text-white font-semibold">{activity.nextEvent}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={15} className="text-[#D32F2F] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider">Lieu</p>
                        <p className="text-white font-semibold">{activity.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users size={15} className="text-[#D32F2F] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/50 text-xs uppercase tracking-wider">Participants</p>
                        <p className="text-white font-semibold">{activity.participants}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/activites?tab=a-venir"
                    className="block mt-2 text-center bg-[#D32F2F] hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded transition-colors"
                  >
                    Voir tous les événements
                  </Link>
                </div>
              </div>

              {/* Upcoming mini-events */}
              <div className="bg-[#F8F6F2] rounded-xl p-5">
                <h3 className="font-serif text-base font-bold text-[#002D62] mb-4 flex items-center gap-2">
                  <Clock size={15} className="text-[#D32F2F]" />
                  À venir
                </h3>
                <div className="space-y-3">
                  {[
                    { date: "15 Mai", title: "Session Dialogue #41" },
                    { date: "3 Juin", title: "Atelier Formation" },
                    { date: "30 Déc.", title: "27e Commémoration" },
                  ].map((e) => (
                    <div key={e.date} className="flex items-center gap-3 text-sm">
                      <span className="text-[#D32F2F] font-mono font-bold text-xs w-14 shrink-0">{e.date}</span>
                      <span className="text-[#002D62] text-xs leading-snug">{e.title}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/activites?tab=calendrier"
                  className="inline-flex items-center gap-1 text-[#D32F2F] text-xs font-semibold mt-4 hover:underline"
                >
                  Voir le calendrier <ChevronRight size={12} />
                </Link>
              </div>

              {/* Other activities */}
              <div>
                <h3 className="font-serif text-base font-bold text-[#002D62] mb-4">Autres activités</h3>
                <div className="space-y-3">
                  {others.map((o: any) => {
                    const OIcon = (Icons as any)[o.icon] || Icons.Circle
                    return (
                      <Link
                        key={o.slug}
                        href={`/activites/${o.slug}`}
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
                            {o.title}
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

      <Footer />
    </>
  )
}
