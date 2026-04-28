import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"



export default async function CommemorationsPage() {
  const programme = await fetchAPI('/programme/') || [];
  const pastEditions = await fetchAPI('/past-editions/') || [];
  const commemSection = await fetchAPI('/commemoration-section/');

  return (
    <>
      <Navbar />
      <PageShell
        title="Commémorations et Lieux de Mémoire"
        subtitle="Chaque année, du 30 décembre au 2 janvier, l'ARMMK rassemble toute la communauté pour honorer les victimes et renouveler l'engagement pour la paix."
        image={commemSection?.image || "/images/commemoration.jpg"}
        breadcrumbs={[{ label: "Commémorations" }]}
      />

      {/* Prochaine commémoration */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              À venir
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62] mb-6">
              {commemSection?.title || "27e Commémoration du Massacre de Makobola"}
            </h2>
            <div className="flex flex-col gap-3 mb-7">
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <Calendar size={16} className="text-[#D32F2F] shrink-0" />
                <span>{commemSection?.date_text || "30 Décembre 2025 – 2 Janvier 2026"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <MapPin size={16} className="text-[#D32F2F] shrink-0" />
                <span>{commemSection?.location || "Makobola et Bangwe, Territoire de Fizi, Sud-Kivu"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <Users size={16} className="text-[#D32F2F] shrink-0" />
                <span>Ouvert à toutes et tous – entrée libre</span>
              </div>
            </div>
            <p className="text-foreground/65 text-sm leading-relaxed mb-8">
              {commemSection?.description || "Rescapés, familles de victimes, autorités, organisations de la société civile et tous les citoyens épris de paix sont invités à participer."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
            >
              Je participe
            </Link>
          </div>

          {/* Programme */}
          <div className="bg-[#F8F6F2] rounded-lg border border-border p-8">
            <h3 className="font-serif font-bold text-[#002D62] text-xl mb-6 flex items-center gap-2">
              <Clock size={20} className="text-[#D32F2F]" />
              Programme indicatif
            </h3>
            <ol className="space-y-4">
              {programme.map((p: any, i: number) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#D32F2F] text-white text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#D32F2F] uppercase tracking-wider">{p.time}</p>
                    <p className="text-sm text-foreground/75 mt-0.5">{p.event}</p>
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
            <Image src="/images/memorial-site.jpg" alt="Site mémorial de Makobola" fill className="object-cover" />
          </div>
          <div className="text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              Lieu de mémoire
            </span>
            <h3 className="font-serif text-2xl font-bold mb-4">Le site mémorial de Makobola</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Le site mémorial de Makobola, situé dans le village même où le massacre a eu lieu,
              est le cœur symbolique de notre action. Une stèle commémorative y a été inaugurée
              en 2020 à la mémoire des victimes. C&apos;est ici que chaque commémoration
              débute par le dépôt de gerbes.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <MapPin size={14} className="text-[#D32F2F]" />
              <span>Makobola, Territoire de Fizi, Sud-Kivu, RDC</span>
            </div>
          </div>
        </div>
      </section>

      {/* Éditions passées */}
      <section className="py-20 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              Regards en arrière
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">Éditions passées</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEditions.map((e: any) => (
              <div key={e.year} className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
                <p className="font-serif text-4xl font-bold text-[#D32F2F] mb-2">{e.year}</p>
                <p className="text-[#002D62] font-semibold text-sm mb-1">{e.count} participants</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{e.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
