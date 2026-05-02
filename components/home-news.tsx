import Link from "next/link"
import { Calendar, Tag } from "lucide-react"

import { getNews, getMediaUrl } from "@/lib/api"

const tagColors: Record<string, string> = {
  commemoration: "bg-[#D32F2F]/10 text-[#D32F2F]",
  formation: "bg-[#002D62]/10 text-[#002D62]",
  partenariat: "bg-green-100 text-green-700",
}

interface HomeNewsProps {
  lang?: string;
}

export default async function HomeNews({ lang = 'fr' }: HomeNewsProps) {
  const news = await getNews();

  const getField = (obj: any, field: string) => {
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const t = {
    badge: lang === 'en' ? 'Stay Informed' : lang === 'es' ? 'Manténgase informado' : 'Restez informés',
    title: lang === 'en' ? 'Latest News' : lang === 'es' ? 'Últimas noticias' : 'Dernières actualités',
    allNews: lang === 'en' ? 'All news' : lang === 'es' ? 'Todas las noticias' : 'Toutes les actualités',
    readArticle: lang === 'en' ? 'Read article' : lang === 'es' ? 'Leer artículo' : 'Lire l\'article',
  }

  return (
    <section className="py-24 bg-[#fdfcfa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-16 border-b border-[#002D62]/10 pb-8">
          <div>
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-[.3em] text-[#D32F2F] mb-4">
              {t.badge}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#00142d]">
              {t.title}
            </h2>
          </div>
          <Link
            href={`/${lang}/actualites`}
            className="text-xs font-extrabold text-[#00142d] hover:text-[#D32F2F] transition-all uppercase tracking-[.2em] group flex items-center gap-2"
          >
            {t.allNews} 
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {news.map((n: any) => (
            <article
              key={n.id ?? n.href ?? n.title}
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-gray-200 shadow-xl shadow-black/5">
                <div className="absolute inset-0 bg-[#00142d]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={getMediaUrl(n.image) || "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop"} 
                  alt={getField(n, 'title')}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 ${tagColors[n.tag] || 'bg-white/90 text-[#002D62]'}`}>
                    {getField(n, 'category')}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 pl-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center gap-1.5 text-black/40 text-[10px] font-bold uppercase tracking-widest">
                    <Calendar size={12} className="text-[#D32F2F]" />
                    {n.date}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-[#00142d] text-xl leading-tight mb-4 group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                  {getField(n, 'title')}
                </h3>
                <div 
                  className="prose prose-sm max-w-none text-black/50 leading-relaxed mb-6 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: getField(n, 'excerpt') }}
                />
                <Link
                  href={`/${lang}/actualites/${n.slug}`}
                  className="mt-auto text-[10px] font-extrabold uppercase tracking-[.2em] text-[#D32F2F] hover:text-[#00142d] transition-colors flex items-center gap-1 group/btn"
                >
                  {t.readArticle}
                  <span className="group-hover/btn:translate-x-0.5 transition-transform">&rsaquo;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
