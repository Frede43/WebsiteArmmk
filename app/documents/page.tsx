"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  FileText, Download, Search, Filter,
  BookOpen, Archive, Megaphone, FileBarChart2,
  ExternalLink, Calendar, Eye,
} from "lucide-react"
import Navbar from "@/components/navbar"
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

const getCategories = (documents: Document[]) => [
  { id: "tous", label: "Tous les documents", icon: <FileText size={15} />, count: documents.length },
  { id: "rapports", label: "Rapports annuels", icon: <FileBarChart2 size={15} />, count: documents.filter(d => d.category === "rapports").length },
  { id: "communiques", label: "Communiqués", icon: <Megaphone size={15} />, count: documents.filter(d => d.category === "communiques").length },
  { id: "archives", label: "Archives historiques", icon: <Archive size={15} />, count: documents.filter(d => d.category === "archives").length },
  { id: "ressources", label: "Ressources pédagogiques", icon: <BookOpen size={15} />, count: documents.filter(d => d.category === "ressources").length },
] as { id: DocCategory; label: string; icon: React.ReactNode; count: number }[]

const formatColors: Record<string, string> = {
  PDF: "bg-red-50 text-red-600 border-red-100",
  DOC: "bg-blue-50 text-blue-600 border-blue-100",
  XLSX: "bg-emerald-50 text-emerald-600 border-emerald-100",
}

const langLabels: Record<string, string> = { FR: "Français", EN: "English", SW: "Swahili" }

/* ─── PAGE CONTENT ─────────────────────────────────────────── */

function DocumentsContent() {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<DocCategory>("tous")
  const [searchQuery, setSearchQuery] = useState("")
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    fetchAPI('/documents/').then(data => {
      if(data) setDocuments(data)
    })
  }, [])

  const categories = getCategories(documents)

  useEffect(() => {
    const cat = searchParams.get("cat") as DocCategory | null
    if (cat && ["rapports", "communiques", "archives", "ressources"].includes(cat)) {
      setActiveCategory(cat)
    }
  }, [searchParams])

  const filtered = documents.filter((d) => {
    const matchCat = activeCategory === "tous" || d.category === activeCategory
    const matchSearch =
      searchQuery.trim() === "" ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const featured = documents.filter((d) => d.featured).slice(0, 3)

  return (
    <>
      <Navbar />
      <PageShell
        title="Centre de documents"
        subtitle="Rapports annuels, communiqués officiels, archives historiques et ressources pédagogiques de l'ARMMK — tous téléchargeables gratuitement."
        image="/images/documents-banner.jpg"
        breadcrumbs={[{ label: "Documents" }]}
      />

      {/* Featured documents */}
      <section className="py-12 bg-[#F8F6F2] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-lg font-bold text-[#002D62] mb-6 flex items-center gap-2">
            <span className="w-4 h-0.5 bg-[#D32F2F] inline-block" />
            Documents mis en avant
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
                    {doc.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                    {doc.description}
                  </p>
                  <a
                    href={doc.downloadUrl}
                    className="inline-flex items-center justify-center gap-2 bg-[#002D62] hover:bg-[#001a3d] text-white text-[11px] font-semibold uppercase tracking-wider px-4 py-2.5 rounded transition-colors w-full"
                  >
                    <Download size={13} />
                    Télécharger ({doc.size})
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
                  Catégories
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
                <p className="text-xs font-bold text-[#002D62] mb-1">Besoin d&apos;un document ?</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Si vous ne trouvez pas un document spécifique, contactez-nous directement.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-[#D32F2F] text-xs font-semibold hover:underline"
                >
                  Nous contacter <ExternalLink size={11} />
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
                  placeholder="Rechercher un document…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#002D62]/20 focus:border-[#002D62]/40 bg-[#F8F6F2] placeholder:text-gray-400"
                />
              </div>

              {/* Results count */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs text-gray-500">
                  <span className="font-bold text-[#002D62]">{filtered.length}</span> document
                  {filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
                </p>
                {activeCategory !== "tous" && (
                  <button
                    onClick={() => setActiveCategory("tous")}
                    className="text-xs text-[#D32F2F] hover:underline font-semibold"
                  >
                    Effacer le filtre
                  </button>
                )}
              </div>

              {/* Documents grid */}
              {filtered.length === 0 ? (
                <div className="py-20 text-center">
                  <FileText size={40} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-sm text-gray-400">Aucun document ne correspond à votre recherche.</p>
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
                            {langLabels[doc.language]}
                          </span>
                          {doc.featured && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#D32F2F]/8 text-[#D32F2F] border border-[#D32F2F]/15">
                              Mis en avant
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif text-sm font-bold text-[#002D62] leading-snug mb-1.5 group-hover:text-[#D32F2F] transition-colors">
                          {doc.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
                          {doc.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={11} className="text-[#D32F2F]" />
                            {doc.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Eye size={11} className="text-[#D32F2F]" />
                            {doc.pages} pages
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
                          Télécharger
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
            Contribuer à nos archives
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Vous possédez des témoignages, des photos ou des documents relatifs au massacre de
            Makobola ? Partagez-les avec l&apos;ARMMK pour enrichir la mémoire collective.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
          >
            Nous envoyer un document
            <ExternalLink size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

/* ─── PAGE EXPORT ─────────────────────────────────────────── */

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <DocumentsContent />
    </Suspense>
  )
}
