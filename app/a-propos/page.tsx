import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Heart, Shield, Scale, Handshake } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI, getMediaUrl } from "@/lib/api"
import { TeamCarousel } from "@/components/team-carousel"



const iconMap: Record<string, any> = { Heart, Scale, Handshake, Shield }

export default async function AProposPage() {
  const values = await fetchAPI('/values/') || [];
  const team = await fetchAPI('/team/') || [];
  const config = await fetchAPI('/config/');

  return (
    <>
      <Navbar />
      <PageShell
        title="À propos de l'ARMMK"
        subtitle={config?.about_text || "Fondée en 2007 par des rescapés, l'Association des Rescapés des Massacres de Makobola agit pour la mémoire, la justice et la réconciliation à Fizi, Sud-Kivu."}
        image={config?.about_history_image ? getMediaUrl(config.about_history_image) : "/images/about-armmk.jpg"}
        breadcrumbs={[{ label: "À propos" }]}
      />

      {/* Histoire */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              Notre histoire
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62] mb-6 text-balance">
              {config?.about_history_title || "Née de la douleur, portée par la dignité"}
            </h2>
            <div className="space-y-4 text-foreground/75 leading-relaxed text-sm">
              {config?.about_history_content ? (
                <div dangerouslySetInnerHTML={{ __html: config.about_history_content.replace(/\n/g, '<br/>') }} />
              ) : (
                <>
                  <p>
                    Dans la nuit du 30 décembre 1998 au 2 janvier 1999, plus de 500 civils — hommes,
                    femmes, enfants — ont été massacrés à Makobola et dans les villages environnants
                    du territoire de Fizi, au Sud-Kivu, en République Démocratique du Congo. Les
                    victimes étaient principalement d&apos;ethnie Bembé.
                  </p>
                  <p>
                    Face au silence et à l&apos;oubli, un groupe de rescapés a fondé en 2007
                    l&apos;Association des Rescapés des Massacres de Makobola (ARMMK). Leur
                    ambition : ne jamais laisser ces crimes sombrer dans l&apos;indifférence,
                    accompagner les survivants et leurs familles, et promouvoir une réconciliation
                    véritable entre toutes les communautés du territoire de Fizi.
                  </p>
                  <p>
                    En presque deux décennies d&apos;existence, l&apos;ARMMK a organisé plus de
                    25 cérémonies de commémoration, formé des centaines de jeunes à la résolution
                    pacifique des conflits et accompagné des dizaines d&apos;orphelins dans leur
                    reconstruction.
                  </p>
                </>
              )}
            </div>
            <Link
              href="/massacre"
              className="mt-8 inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded transition-colors"
            >
              L&apos;histoire du massacre &rarr;
            </Link>
          </div>
          <div className="relative h-80 lg:h-[440px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={config?.about_history_image ? getMediaUrl(config.about_history_image) : "/images/about-armmk.jpg"}
              alt="Membres de l'ARMMK réunis"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#002D62]/80 to-transparent">
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest">
                Fondée en 2007 · Fizi, Sud-Kivu, RDC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#002D62] text-white rounded-lg p-10">
            <Target size={32} className="text-[#D32F2F] mb-5" />
            <h3 className="font-serif text-2xl font-bold mb-4">Notre Mission</h3>
            <p className="text-white/75 leading-relaxed">
              {config?.mission_text || "Préserver la mémoire des victimes du massacre de Makobola, défendre les droits des rescapés, accompagner les orphelins et promouvoir la réconciliation inter-ethnique durable au sein des communautés de Fizi, Sud-Kivu, pour que de tels crimes ne se reproduisent jamais."}
            </p>
          </div>
          <div className="bg-white border border-border rounded-lg p-10">
            <Eye size={32} className="text-[#D32F2F] mb-5" />
            <h3 className="font-serif text-2xl font-bold text-[#002D62] mb-4">Notre Vision</h3>
            <p className="text-foreground/70 leading-relaxed">
              {config?.vision_text || "Un territoire de Fizi où toutes les communautés cohabitent en paix, où la mémoire des massacres est reconnue et enseignée, et où les rescapés et orphelins vivent dans la dignité, soutenus par une société civile forte et un État de droit effectif."}
            </p>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              Ce en quoi nous croyons
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">Nos valeurs</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v: any) => {
              const Icon = iconMap[v.label] || Heart
              return (
                <div key={v.label} className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[#002D62]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-[#002D62]" />
                  </div>
                  <h4 className="font-serif font-bold text-[#002D62] text-base mb-2">{v.label}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-16 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              Les personnes derrière l&apos;association
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">Notre bureau</h2>
          </div>
          <TeamCarousel team={team} />
        </div>
      </section>

      <Footer />
    </>
  )
}
