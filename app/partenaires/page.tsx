import Link from "next/link"
import { ExternalLink, Globe } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"



export default async function PartenairesPage() {
  const partners = await fetchAPI('/partners/') || [];
  return (
    <>
      <Navbar />
      <PageShell
        title="Nos Partenaires"
        subtitle="L'ARMMK œuvre en réseau avec des organisations locales, nationales et internationales partageant ses valeurs de mémoire, justice et réconciliation."
        image="/images/activities-dialogue.jpg"
        breadcrumbs={[{ label: "Partenaires" }]}
      />

      {/* Partenaires grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((p: any) => (
              <div
                key={p.name}
                className="bg-[#F8F6F2] rounded-lg border border-border p-7 flex flex-col hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-full bg-[#002D62] flex items-center justify-center mb-5">
                  <Globe size={22} className="text-white" />
                </div>
                <h3 className="font-serif font-bold text-[#002D62] text-xl mb-1 group-hover:text-[#D32F2F] transition-colors">
                  {p.name}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D32F2F] bg-[#D32F2F]/10 px-2.5 py-1 rounded">
                    {p.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.country}</span>
                </div>
                <p className="text-foreground/65 text-sm leading-relaxed flex-1">{p.description}</p>
                {p.href !== "#" && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#002D62] hover:text-[#D32F2F] transition-colors"
                  >
                    Visiter le site
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Devenir partenaire */}
      <section className="py-16 bg-[#002D62]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl font-bold text-white mb-4">
            Devenez partenaire de l&apos;ARMMK
          </h3>
          <p className="text-white/65 mb-7 text-sm leading-relaxed">
            Vous êtes une organisation, une institution ou une entreprise qui partage nos valeurs
            de mémoire, de justice et de réconciliation ? Nous sommes ouverts à toute forme de
            partenariat — financier, technique ou de plaidoyer.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
