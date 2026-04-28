import Link from "next/link"
import { Calendar, Tag, Search } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"
import { getDictionary } from "@/lib/get-dictionary"

const tagColors: Record<string, string> = {
  commemoration: "bg-[#D32F2F]/10 text-[#D32F2F]",
  formation: "bg-[#002D62]/10 text-[#002D62]",
  partenariat: "bg-green-100 text-green-700",
  memoire: "bg-purple-100 text-purple-700",
  plaidoyer: "bg-amber-100 text-amber-700",
}

export default async function ActualitesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const activeLang = lang as 'fr' | 'en' | 'es'
  const articles = await fetchAPI('/articles/') || [];

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const t = {
    title: lang === 'en' ? 'News' : lang === 'es' ? 'Noticias' : 'Actualités',
    subtitle: lang === 'en' ? 'Follow ARMMK activities, events and publications.' : lang === 'es' ? 'Siga las actividades, eventos y publicaciones de ARMMK.' : 'Suivez les activités, événements et publications de l\'ARMMK.',
    searchPlaceholder: lang === 'en' ? 'Search an article...' : lang === 'es' ? 'Buscar un artículo...' : 'Rechercher un article…',
    allCategories: lang === 'en' ? 'All categories' : lang === 'es' ? 'Todas las categorías' : 'Toutes les catégories',
    readMore: lang === 'en' ? 'Read more' : lang === 'es' ? 'Leer más' : 'Lire la suite',
    categories: {
      commemoration: lang === 'en' ? 'Commemoration' : lang === 'es' ? 'Conmemoración' : 'Commémoration',
      formation: lang === 'en' ? 'Training' : lang === 'es' ? 'Formación' : 'Formation',
      partenariat: lang === 'en' ? 'Partnership' : lang === 'es' ? 'Partenariado' : 'Partenariat',
      memoire: lang === 'en' ? 'Memory' : lang === 'es' ? 'Memoria' : 'Mémoire',
      plaidoyer: lang === 'en' ? 'Advocacy' : lang === 'es' ? 'Plaidoyer' : 'Plaidoyer',
    }
  }

  return (
    <>
      <PageShell
        title={t.title}
        subtitle={t.subtitle}
        image="/images/activities-dialogue.jpg"
        breadcrumbs={[{ label: t.title }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search / filter bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full border border-border rounded pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30"
              />
            </div>
            <select className="border border-border rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D62]/30">
              <option value="">{t.allCategories}</option>
              <option>{t.categories.commemoration}</option>
              <option>{t.categories.formation}</option>
              <option>{t.categories.partenariat}</option>
              <option>{t.categories.memoire}</option>
              <option>{t.categories.plaidoyer}</option>
            </select>
          </div>

          {/* Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a: any) => (
              <article
                key={a.slug || a.id}
                className="bg-[#F8F6F2] rounded-lg border border-border overflow-hidden group hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded flex items-center gap-1 ${tagColors[a.tag] ?? "bg-gray-100 text-gray-600"}`}>
                      <Tag size={10} />
                      {getField(a, 'category')}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Calendar size={11} />
                      {a.date}
                    </span>
                  </div>
                  <h2 className="font-serif font-bold text-[#002D62] text-lg leading-snug mb-3 group-hover:text-[#D32F2F] transition-colors flex-1">
                    {getField(a, 'title')}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">{getField(a, 'excerpt')}</p>
                  <Link
                    href={`/${lang}/actualites/${a.slug}`}
                    className="text-xs font-bold uppercase tracking-wider text-[#D32F2F] hover:text-[#002D62] transition-colors"
                  >
                    {t.readMore} &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}
