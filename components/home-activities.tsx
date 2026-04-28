import Link from "next/link"
import { MessageCircle, BookOpen, Heart, Flame } from "lucide-react"

import { getActivities } from "@/lib/api"

const iconMap: Record<string, any> = {
  "Dialogue inter-ethnique": MessageCircle,
  "Formation à la paix": BookOpen,
  "Soutien aux orphelins": Heart,
  "Commémorations": Flame,
}

export default async function HomeActivities() {
  const activities = await getActivities();
  return (
    <section className="py-20 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3">
            Ce que nous faisons
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#002D62] text-balance">
            Nos activités principales
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#D32F2F]" />
            <div className="w-2 h-2 rounded-full bg-[#D32F2F]" />
            <div className="h-px w-12 bg-[#D32F2F]" />
          </div>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            L&apos;ARMMK agit sur quatre axes complémentaires pour honorer les victimes,
            accompagner les survivants et réconcilier les communautés de Fizi.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((a: any) => {
            const Icon = iconMap[a.title] || MessageCircle
            return (
              <div
                key={a.title}
                className="bg-white rounded-lg border border-border overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className={`${a.color} p-5 flex items-center justify-center`}>
                  <Icon size={32} className="text-white" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-[#002D62] text-lg mb-3 group-hover:text-[#D32F2F] transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {a.description}
                  </p>
                  <Link
                    href={a.href || "#"}
                    className="text-xs font-bold uppercase tracking-wider text-[#D32F2F] hover:text-[#002D62] transition-colors inline-flex items-center gap-1"
                  >
                    En savoir plus &rarr;
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/activites"
            className="inline-flex items-center gap-2 border-2 border-[#002D62] text-[#002D62] hover:bg-[#002D62] hover:text-white font-semibold text-sm uppercase tracking-wider px-8 py-3 rounded transition-colors"
          >
            Toutes nos activités
          </Link>
        </div>
      </div>
    </section>
  )
}
