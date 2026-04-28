import Image from "next/image"
import Link from "next/link"
import { AlertTriangle, Clock, MapPin, Users } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"



export default async function MassacrePage() {
  const timeline = await fetchAPI('/timeline/') || [];
  const config = await fetchAPI('/config/');
  const stats = await fetchAPI('/stats/') || [];

  return (
    <>
      <Navbar />
      <PageShell
        title="Le Massacre de Makobola"
        subtitle={config?.massacre_intro_title || "30 décembre 1998 – 2 janvier 1999 · Plus de 500 victimes civiles · Fizi, Sud-Kivu, RDC"}
        image={config?.massacre_intro_image || "/images/memorial-site.jpg"}
        breadcrumbs={[{ label: "Le Massacre de Makobola" }]}
      />

      {/* Avertissement */}
      <div className="bg-amber-50 border-y border-amber-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-amber-800 text-sm leading-relaxed">
            Cette page contient des informations sur un massacre de masse. Le contenu est traité
            avec respect et sobriété, dans un objectif de mémoire et de vérité historique.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-5 text-foreground/75 leading-relaxed text-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] block">
              Ce qui s&apos;est passé
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62] text-balance">
              {config?.massacre_intro_title || "Un crime contre l'humanité en plein cœur du Congo"}
            </h2>
            <div className="space-y-4">
              {config?.massacre_intro_content ? (
                <div dangerouslySetInnerHTML={{ __html: config.massacre_intro_content.replace(/\n/g, '<br/>') }} />
              ) : (
                <>
                  <p>
                    Dans la nuit du 30 décembre 1998, le village de Makobola et plusieurs localités
                    environnantes du territoire de Fizi, au bord du lac Tanganyika, ont été le théâtre
                    d&apos;un massacre de masse. En l&apos;espace de quatre jours, plus de 500 civils
                    appartenant principalement à la communauté Bembé ont été tués par des éléments
                    armés identifiés.
                  </p>
                  <p>
                    Ce crime, perpétré en pleine guerre du Congo, a sombré dans un silence quasi total.
                    Aucune poursuite judiciaire sérieuse n&apos;a abouti. Aucune reconnaissance
                    officielle à la hauteur du drame n&apos;a été accordée aux victimes et à leurs
                    familles.
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="relative h-80 lg:h-[420px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={config?.massacre_intro_image || "/images/memorial-site.jpg"}
              alt="Site mémorial de Makobola"
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
              <div key={s.label} className="border-r border-white/10 last:border-0 px-2">
                <p className="font-serif text-3xl font-bold text-white">{s.value}</p>
                <p className="text-white/60 text-xs mt-1 uppercase tracking-wider">{s.label}</p>
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
              Déroulement des faits
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">Chronologie</h2>
          </div>
          <ol className="relative border-l-2 border-[#D32F2F]/30 space-y-0">
            {timeline.map((item: any, i: number) => (
              <li key={i} className="ml-8 pb-10 last:pb-0 relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-2 border-[#D32F2F] bg-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#D32F2F]" />
                </div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-2">
                  {item.date}
                </span>
                <h3 className="font-serif font-bold text-[#002D62] text-lg mb-2">{item.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA témoignages */}
      <section className="py-14 bg-white border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl font-bold text-[#002D62] mb-4">
            Les rescapés témoignent
          </h3>
          <p className="text-foreground/65 leading-relaxed mb-7">
            Au-delà des chiffres, ce sont des vies, des familles, des histoires. Lisez les
            témoignages directs des survivants du massacre de Makobola.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/temoignages"
              className="bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
            >
              Lire les témoignages
            </Link>
            <Link
              href="/commemorations"
              className="border-2 border-[#002D62] text-[#002D62] hover:bg-[#002D62] hover:text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
            >
              Les commémorations
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
