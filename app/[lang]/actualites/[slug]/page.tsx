import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Tag, ArrowLeft, Clock, Share2, Facebook, Twitter, Link2 } from "lucide-react"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI, getMediaUrl } from "@/lib/api"

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
  const articles = await fetchAPI('/articles/') || []
  const langs = ['fr', 'en', 'es']
  const params: { lang: string; slug: string }[] = []
  
  langs.forEach(lang => {
    articles.forEach((a: any) => {
      params.push({ lang, slug: a.slug })
    })
  })
  
  return params
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params
  const articles = await fetchAPI('/articles/') || []
  const article = articles.find((a: any) => a.slug === slug)
  if (!article) return {}
  
  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  return {
    title: `${getField(article, 'title')} – ARMMK`,
    description: getField(article, 'excerpt'),
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { lang, slug } = await params
  const articles = await fetchAPI('/articles/') || []
  const article = articles.find((a: any) => a.slug === slug)
  if (!article) notFound()

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const otherArticles = articles.filter((a: any) => a.slug !== slug).slice(0, 3)

  const t = {
    news: lang === 'en' ? 'News' : lang === 'es' ? 'Noticias' : 'Actualités',
    back: lang === 'en' ? 'Back to news' : lang === 'es' ? 'Volver a noticias' : 'Retour aux actualités',
    share: lang === 'en' ? 'Share' : lang === 'es' ? 'Compartir' : 'Partager',
    readAlso: lang === 'en' ? 'Read also' : lang === 'es' ? 'Leer también' : 'À lire aussi',
    recentPosts: lang === 'en' ? 'Recent posts' : lang === 'es' ? 'Artículos recientes' : 'Articles récents',
    allNews: lang === 'en' ? 'View all news' : lang === 'es' ? 'Ver todas les noticias' : 'Voir toutes les actualités',
  }

  return (
    <>
      <PageShell
        title={getField(article, 'title')}
        subtitle={getField(article, 'category')}
        image={getMediaUrl(article.image) || "/images/activities-dialogue.jpg"}
        breadcrumbs={[
          { label: t.news, href: `/${lang}/actualites` },
          { label: getField(article, 'title') },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ── Main content ── */}
            <div className="lg:col-span-2 space-y-10">

              {/* Back link */}
              <Link
                href={`/${lang}/actualites`}
                className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-[#002D62] transition-colors"
              >
                <ArrowLeft size={13} />
                {t.back}
              </Link>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-100">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <Calendar size={15} className="text-[#D32F2F]" />
                  {article.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <Clock size={15} className="text-[#D32F2F]" />
                  5 min de lecture
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <Tag size={15} className="text-[#D32F2F]" />
                  {getField(article, 'category')}
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#002D62] leading-tight">
                {getField(article, 'title')}
              </h1>

              {/* Featured Image */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={getMediaUrl(article.image) || "/images/activities-dialogue.jpg"}
                  alt={getField(article, 'title')}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#002D62] prose-a:text-[#D32F2F] prose-strong:text-[#002D62]"
                dangerouslySetInnerHTML={{ __html: getField(article, 'content') || getField(article, 'excerpt') }}
              />

              {/* Video Section */}
              {article.video_url && (
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h2 className="font-serif text-2xl font-bold text-[#002D62]">
                    {lang === 'en' ? 'Video Report' : lang === 'es' ? 'Reportaje de video' : 'Reportage vidéo'}
                  </h2>
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl bg-black">
                    <iframe
                      src={getEmbedUrl(article.video_url)}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{t.share} :</span>
                  <div className="flex gap-2">
                    <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white transition-colors">
                      <Facebook size={16} />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#1DA1F2] hover:text-white transition-colors">
                      <Twitter size={16} />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#D32F2F] hover:text-white transition-colors">
                      <Link2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-10">
              
              {/* Recent posts */}
              <div className="bg-[#F8F6F2] rounded-xl p-8">
                <h3 className="font-serif text-xl font-bold text-[#002D62] mb-6">{t.recentPosts}</h3>
                <div className="space-y-6">
                  {otherArticles.map((o: any) => (
                    <Link key={o.slug} href={`/${lang}/actualites/${o.slug}`} className="group block">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                          <Image
                            src={getMediaUrl(o.image) || "/images/activities-dialogue.jpg"}
                            alt={getField(o, 'title')}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-[#D32F2F] uppercase tracking-wider mb-1">{getField(o, 'category')}</p>
                          <h4 className="text-sm font-bold text-[#002D62] leading-snug group-hover:text-[#D32F2F] transition-colors line-clamp-2">
                            {getField(o, 'title')}
                          </h4>
                          <p className="text-[10px] text-muted-foreground mt-2">{o.date}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/${lang}/actualites`}
                  className="block mt-8 text-center text-xs font-bold uppercase tracking-wider text-[#002D62] hover:text-[#D32F2F] transition-colors"
                >
                  {t.allNews} &rarr;
                </Link>
              </div>

              {/* Newsletter or CTA */}
              <div className="bg-[#002D62] rounded-xl p-8 text-white">
                <Share2 size={32} className="text-[#D32F2F] mb-4" />
                <h3 className="font-serif text-xl font-bold mb-3">Rejoignez le mouvement</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Inscrivez-vous pour recevoir nos dernières actualités et rapports d&apos;activité directement par email.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full bg-white/10 border border-white/20 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                  />
                  <button className="w-full bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors">
                    S&apos;abonner
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}
