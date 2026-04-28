import Link from "next/link"
import { ExternalLink, Globe } from "lucide-react"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"

export default async function PartenairesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const activeLang = lang as 'fr' | 'en' | 'es'
  const partners = await fetchAPI('/partners/') || [];

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const t = {
    title: lang === 'en' ? 'Our Partners' : lang === 'es' ? 'Nuestros Socios' : 'Nos Partenaires',
    subtitle: lang === 'en'
      ? 'ARMMK works in a network with local, national and international organizations sharing its values of memory, justice and reconciliation.'
      : lang === 'es'
      ? 'ARMMK trabaja en red con organizaciones locales, nacionales e internacionales que comparten sus valores de memoria, justicia y reconciliación.'
      : 'L\'ARMMK œuvre en réseau avec des organisations locales, nationales et internationales partageant ses valeurs de mémoire, justice et réconciliation.',
    breadcrumb: lang === 'en' ? 'Partners' : lang === 'es' ? 'Socios' : 'Partenaires',
    visitSite: lang === 'en' ? 'Visit website' : lang === 'es' ? 'Visitar sitio web' : 'Visiter le site',
    becomePartner: lang === 'en' ? 'Become a partner of ARMMK' : lang === 'es' ? 'Hacerse socio de ARMMK' : 'Devenez partenaire de l\'ARMMK',
    becomeText: lang === 'en'
      ? 'Are you an organization, institution or company that shares our values of memory, justice and reconciliation? We are open to any form of partnership — financial, technical or advocacy.'
      : lang === 'es'
      ? '¿Es usted una organización, institución o empresa que comparte nuestros valores de memoria, justicia y reconciliación? Estamos abiertos a cualquier forma de asociación — financiera, técnica o de defensa.'
      : 'Vous êtes une organisation, une institution ou une entreprise qui partage nos valeurs de mémoire, de justice et de réconciliation ? Nous sommes ouverts à toute forme de partenariat — financier, technique ou de plaidoyer.',
    contactUs: lang === 'en' ? 'Contact us' : lang === 'es' ? 'Contáctenos' : 'Nous contacter',
  }

  return (
    <>
      <PageShell
        title={t.title}
        subtitle={t.subtitle}
        image="/images/activities-dialogue.jpg"
        breadcrumbs={[{ label: t.breadcrumb }]}
      />

      {/* Partenaires grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((p: any) => (
              <div
                key={p.id || p.name}
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
                <p className="text-foreground/65 text-sm leading-relaxed flex-1">{getField(p, 'description')}</p>
                {p.href && p.href !== "#" && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#002D62] hover:text-[#D32F2F] transition-colors"
                  >
                    {t.visitSite}
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
            {t.becomePartner}
          </h3>
          <p className="text-white/65 mb-7 text-sm leading-relaxed">
            {t.becomeText}
          </p>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-7 py-3.5 rounded transition-colors"
          >
            {t.contactUs}
          </Link>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}
