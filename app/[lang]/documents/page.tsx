"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useState, useEffect, use } from "react"
import Link from "next/link"
import {
  FileText, Download, Search, Filter,
  BookOpen, Archive, Megaphone, FileBarChart2,
  ExternalLink, Calendar, Eye,
} from "lucide-react"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"

/* ─── DATA ─────────────────────────────────────────────────── */

type DocCategory = "tous" | "rapports" | "communiques" | "archives" | "ressources"

interface Document {
  id: number
  title: string
  description: string
  category: DocCategory
  date: string
  size: string
  pages: number
  format: "PDF" | "DOC" | "XLSX"
  language: "FR" | "EN" | "SW"
  downloadUrl: string
  featured?: boolean
}

const formatColors: Record<string, string> = {
  PDF: "bg-red-50 text-red-600 border-red-100",
  DOC: "bg-blue-50 text-blue-600 border-blue-100",
  XLSX: "bg-emerald-50 text-emerald-600 border-emerald-100",
}

/* ─── PAGE CONTENT ─────────────────────────────────────────── */

function DocumentsContent({ lang }: { lang: string }) {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<DocCategory>("tous")
  const [searchQuery, setSearchQuery] = useState("")
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    fetchAPI('/documents/').then(data => {
      if(data) setDocuments(data)
    })
  }, [])

  const t = {
    title: lang === 'en' ? 'Document Center' : lang === 'es' ? 'Centro de documentos' : 'Centre de documents',
    subtitle: lang === 'en'
      ? 'Annual reports, official communiqués, historical archives and educational resources of ARMMK — all downloadable for free.'
      : lang === 'es'
      ? 'Informes anuales, comunicados oficiales, archivos históricos y recursos pedagógicos de ARMMK — todos descargables gratuitamente.'
      : 'Rapports annuels, communiqués officiels, archives historiques et ressources pédagogiques de l\'ARMMK — tous téléchargeables gratuitement.',
    breadcrumb: 'Documents',
    featuredTitle: lang === 'en' ? 'Featured documents' : lang === 'es' ? 'Documentos destacados' : 'Documents mis en avant',
    download: lang === 'en' ? 'Download' : lang === 'es' ? 'Descargar' : 'Télécharger',
    categories: lang === 'en' ? 'Categories' : lang === 'es' ? 'Categorías' : 'Catégories',
    allDocs: lang === 'en' ? 'All documents' : lang === 'es' ? 'Todos los documentos' : 'Tous les documents',
    annualReports: lang === 'en' ? 'Annual reports' : lang === 'es' ? 'Informes anuales' : 'Rapports annuels',
    communiques: lang === 'en' ? 'Communiqués' : lang === 'es' ? 'Comunicados' : 'Communiqués',
    historicalArchives: lang === 'en' ? 'Historical archives' : lang === 'es' ? 'Archivos históricos' : 'Archives historiques',
    educationalResources: lang === 'en' ? 'Educational resources' : lang === 'es' ? 'Recursos pedagógicos' : 'Ressources pédagogiques',
    needDoc: lang === 'en' ? 'Need a document?' : lang === 'es' ? '¿Necesita un documento?' : 'Besoin d\'un document ?',
    needDocText: lang === 'en' 
      ? 'If you cannot find a specific document, contact us directly.'
      : lang === 'es'
      ? 'Si no encuentra un documento específico, contáctenos directamente.'
      : 'Si vous ne trouvez pas un document spécifique, contactez-nous directement.',
    contactUs: lang === 'en' ? 'Contact us' : lang === 'es' ? 'Contáctenos' : 'Nous contacter',
    searchPlaceholder: lang === 'en' ? 'Search for a document...' : lang === 'es' ? 'Buscar un documento...' : 'Rechercher un document…',
    found: lang === 'en' ? 'found' : lang === 'es' ? 'encontrado' : 'trouvé',
    foundPlural: lang === 'en' ? 'found' : lang === 'es' ? 'encontrados' : 'trouvés',
    clearFilter: lang === 'en' ? 'Clear filter' : lang === 'es' ? 'Limpiar filtro' : 'Effacer le filtre',
    noResults: lang === 'en' ? 'No documents match your search.' : lang === 'es' ? 'Ningún documento coincide con su búsqueda.' : 'Aucun document ne correspond à votre recherche.',
    pages: 'pages',
    featuredBadge: lang === 'en' ? 'Featured' : lang === 'es' ? 'Destacado' : 'Mis en avant',
    contribTitle: lang === 'en' ? 'Contribute to our archives' : lang === 'es' ? 'Contribuir a nuestros archivos' : 'Contribuer à nos archives',
    contribText: lang === 'en'
      ? 'Do you possess testimonies, photos or documents relating to the Makobola massacre? Share them with ARMMK to enrich the collective memory.'
      : lang === 'es'
      ? '¿Posee testimonios, fotos o documentos relacionados con la masacre de Makobola? Compártalos con ARMMK para enriquecer la memoria colectiva.'
      : 'Vous possédez des témoignages, des photos ou des documents relatifs au massacre de Makobola ? Partagez-les avec l\'ARMMK pour enrichir la mémoire collective.',
    sendDoc: lang === 'en' ? 'Send us a document' : lang === 'es' ? 'Enviarnos un documento' : 'Nous envoyer un document',
    langLabels: { FR: "Français", EN: "English", SW: "Swahili" }
  }

  const getCategories = (docs: Document[]) => [
    { id: "tous", label: t.allDocs, icon: <FileText size={15} />, count: docs.length },
    { id: "rapports", label: t.annualReports, icon: <FileBarChart2 size={15} />, count: docs.filter(d => d.category === "rapports").length },
    { id: "communiques", label: t.communiques, icon: <Megaphone size={15} />, count: docs.filter(d => d.category === "communiques").length },
    { id: "archives", label: t.historicalArchives, icon: <Archive size={15} />, count: docs.filter(d => d.category === "archives").length },
    { id: "ressources", label: t.educationalResources, icon: <BookOpen size={15} />, count: docs.filter(d => d.category === "ressources").length },
  ] as { id: DocCategory; label: string; icon: React.ReactNode; count: number }[]

  const categories = getCategories(documents)

  useEffect(() => {
    const cat = searchParams.get("cat") as DocCategory | null
    if (cat && ["rapports", "communiques", "archives", "ressources"].includes(cat)) {
      setActiveCategory(cat)
    }
  }, [searchParams])

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const filtered = documents.filter((d) => {
    const matchCat = activeCategory === "tous" || d.category === activeCategory
    const matchSearch =
      searchQuery.trim() === "" ||
      getField(d, 'title').toLowerCase().includes(searchQuery.toLowerCase()) ||
      getField(d, 'description').toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = documents.filter((d) => d.featured).slice(0, 3)

  return (
    <>
      <PageShell
        title={t.title}
        subtitle={t.subtitle}
        image="/images/documents-banner.jpg"
        breadcrumbs={[{ label: t.breadcrumb }]}
        lang={lang}
      />

      {/* Featured documents */}
      <section className="py-12 bg-[#F8F6F2] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-lg font-bold text-[#002D62] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-[#D32F2F] inline-block" />
            {t.featuredTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featured.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                <div className="h-1 bg-[#D32F2F]" />
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${formatColors[doc.format]}`}>
                      {doc.format}
                    </span>
                    <span className="text-[10px] text-gray-400">{doc.date}</span>
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#002D62] leading-snug mb-2 flex-1">
                    {getField(doc, 'title')}
                  </h3>
                  <div 
                    className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: getField(doc, 'description') }}
                  />
                  <a
                    href={doc.downloadUrl}
                    className="inline-flex items-center justify-center gap-2 bg-[#002D62] hover:bg-[#001a3d] text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5 rounded transition-colors w-full"
                  >
                    <Download size={13} />
                    {t.download} ({doc.size})
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main library */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ── Sidebar filters ── */}
            <aside className="lg:w-60 shrink-0 space-y-6">
              <div>
                <h3 className="font-serif text-base font-bold text-[#002D62] mb-3 flex items-center gap-2">
                  <Filter size={14} className="text-[#D32F2F]" />
                  {t.categories}
                </h3>
                <nav className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${
                        activeCategory === cat.id
                          ? "bg-[#002D62] text-white shadow-sm"
                          : "text-gray-600 hover:bg-[#F8F6F2] hover:text-[#002D62]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {cat.icon}
                        {cat.label}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          activeCategory === cat.id
                            ? "bg-white/20 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Info box */}
              <div className="bg-[#F8F6F2] rounded-xl p-5 border border-gray-100">
                <p className="text-xs font-bold text-[#002D62] mb-1">{t.needDoc}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  {t.needDocText}
                </p>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-1 text-[#D32F2F] text-xs font-semibold hover:underline"
                >
                  {t.contactUs} <ExternalLink size={11} />
                </Link>
              </div>
            </aside>

            {/* ── Document list ── */}
            <div className="flex-1 min-w-0">
              {/* Search bar */}
              <div className="relative mb-7">
                <Search
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 focus:border-[#002D62]/40 bg-[#F8F6F2] placeholder:text-gray-400"
                />
              </div>

              {/* Results count */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs text-gray-500">
                  <span className="font-bold text-[#002D62]">{filtered.length}</span> {filtered.length === 1 ? 'document' : 'documents'} {filtered.length === 1 ? t.found : t.foundPlural}
                </p>
                {activeCategory !== "tous" && (
                  <button
                    onClick={() => setActiveCategory("tous")}
                    className="text-xs text-[#D32F2F] hover:underline font-semibold"
                  >
                    {t.clearFilter}
                  </button>
                )}
              </div>

              {/* Documents grid */}
              {filtered.length === 0 ? (
                <div className="py-20 text-center">
                  <FileText size={40} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-sm text-gray-400">{t.noResults}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex flex-col sm:flex-row gap-5 bg-white border border-gray-100 rounded-xl p-5 hover:border-[#002D62]/20 hover:shadow-sm transition-all group"
                    >
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-[#002D62]/6 flex items-center justify-center shrink-0">
                        <FileText size={22} className="text-[#002D62]" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${formatColors[doc.format]}`}
                          >
                            {doc.format}
                          </span>
                          <span className="text-[10px] text-gray-400 border border-gray-100 px-2 py-0.5 rounded">
                            {(t.langLabels as any)[doc.language]}
                          </span>
                          {doc.featured && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#D32F2F]/8 text-[#D32F2F] border border-[#D32F2F]/15">
                              {t.featuredBadge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-sm font-bold text-[#002D62] leading-snug mb-1.5 group-hover:text-[#D32F2F] transition-colors">
                          {getField(doc, 'title')}
                        </h3>
                        <div 
                          className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: getField(doc, 'description') }}
                        />
                        <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={11} className="text-[#D32F2F]" />
                            {doc.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Eye size={11} className="text-[#D32F2F]" />
                            {doc.pages} {t.pages}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FileText size={11} className="text-[#D32F2F]" />
                            {doc.size}
                          </span>
                        </div>
                      </div>

                      {/* Download button */}
                      <div className="flex sm:flex-col items-center gap-2 shrink-0">
                        <a
                          href={doc.downloadUrl}
                          className="inline-flex items-center gap-2 bg-[#002D62] hover:bg-[#D32F2F] text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5 rounded transition-colors whitespace-nowrap"
                        >
                          <Download size={13} />
                          {t.download}
                        </a>
                        <span className="text-[10px] text-gray-400 text-center">{doc.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#002D62]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="font-serif text-xl font-bold text-white mb-3">
            {t.contribTitle}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            {t.contribText}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
          >
            {t.sendDoc}
            <ExternalLink size={14} />
          </Link>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}

/* ─── PAGE EXPORT ─────────────────────────────────────────── */

export default function DocumentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const t_loading = lang === 'en' ? 'Loading...' : lang === 'es' ? 'Cargando...' : 'Chargement...'

  return (
    <Suspense fallback={<div>{t_loading}</div>}>
      <DocumentsContent lang={lang} />
    </Suspense>
  )
}
