import Link from "next/link"
import { Calendar, Tag, Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"



const tagColors: Record<string, string> = {
  commemoration: "bg-[#D32F2F]/10 text-[#D32F2F]",
  formation: "bg-[#002D62]/10 text-[#002D62]",
  partenariat: "bg-green-100 text-green-700",
  memoire: "bg-purple-100 text-purple-700",
  plaidoyer: "bg-amber-100 text-amber-700",
}

export default async function ActualitesPage() {
  const articles = await fetchAPI('/articles/') || [];
  return (
    <>
      <Navbar />
      <PageShell
        title="Actualités"
        subtitle="Suivez les activités, événements et publications de l'ARMMK."
        image="/images/activities-dialogue.jpg"
        breadcrumbs={[{ label: "Actualités" }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search / filter bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un article…"
                className="w-full border border-border rounded pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
              />
            </div>
            <select className="border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30">
              <option value="">Toutes les catégories</option>
              <option>Commémoration</option>
              <option>Formation</option>
              <option>Partenariat</option>
              <option>Mémoire</option>
              <option>Plaidoyer</option>
            </select>
          </div>

          {/* Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a: any) => (
              <article
                key={a.href}
                className="bg-[#F8F6F2] rounded-lg border border-border overflow-hidden group hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded flex items-center gap-1 ${tagColors[a.tag] ?? "bg-gray-100 text-gray-600"}`}>
                      <Tag size={10} />
                      {a.category}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Calendar size={11} />
                      {a.date}
                    </span>
                  </div>
                  <h2 className="font-serif font-bold text-[#002D62] text-lg leading-snug mb-3 group-hover:text-[#D32F2F] transition-colors flex-1">
                    {a.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{a.excerpt}</p>
                  <Link
                    href={a.href}
                    className="text-xs font-bold uppercase tracking-wider text-[#D32F2F] hover:text-[#002D62] transition-colors"
                  >
                    Lire la suite &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
