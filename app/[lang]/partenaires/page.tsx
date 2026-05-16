import Link from "next/link"
import { ExternalLink, Globe, Handshake, Shield, Users } from "lucide-react"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI } from "@/lib/api"

export default async function PartenairesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const activeLang = lang as 'fr' | 'en' | 'es'
  
  // Fetch data from API
  const [partners, stats] = await Promise.all([
    fetchAPI('/partners/') || [],
    fetchAPI('/stats/') || []
  ]);

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const institutionalPartners = partners.filter((p: any) => p.category === 'partner');
  const collaborators = partners.filter((p: any) => p.category === 'collaborator');

  const t = {
    title: lang === 'en' ? 'Our Strategic Network' : lang === 'es' ? 'Nuestra Red Estratégica' : 'Notre Réseau Stratégique',
    subtitle: lang === 'en'
      ? 'Building a future of peace through solid and diverse alliances.'
      : lang === 'es'
      ? 'Construyendo un futuro de paz a través de alianzas sólidas y diversas.'
      : 'Construire un avenir de paix à travers des alliances solides et diversifiées.',
    breadcrumb: lang === 'en' ? 'Partners' : lang === 'es' ? 'Socios' : 'Partenaires',
    partnersTitle: lang === 'en' ? 'Institutional Partners' : lang === 'es' ? 'Socios Institucionales' : 'Partenaires Institutionnels',
    collaboratorsTitle: lang === 'en' ? 'Operational Collaborators' : lang === 'es' ? 'Colaboradores Operativos' : 'Collaborateurs Opérationnels',
    visitSite: lang === 'en' ? 'Visit website' : lang === 'es' ? 'Visitar sitio web' : 'Visiter le site',
    becomePartner: lang === 'en' ? 'Join our movement' : lang === 'es' ? 'Únase a nuestro movimiento' : 'Rejoignez notre mouvement',
    becomeText: lang === 'en'
      ? 'Collaborate with ARMMK to strengthen the impact of memory and reconciliation.'
      : lang === 'es'
      ? 'Colabore con ARMMK para fortalecer el impacto de la memoria y la reconciliación.'
      : 'Collaborez avec l\'ARMMK pour renforcer l\'impact de la mémoire et de la réconciliation.',
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

      {/* Partenaires Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#F8F6F2] rounded-bl-full -z-10 opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block text-[#D32F2F] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Impact & Vision
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#002D62] leading-tight">
                {t.partnersTitle}
              </h2>
            </div>
            <div className="h-px flex-1 bg-[#002D62]/10 hidden md:block mb-4" />
          </div>

          {institutionalPartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {institutionalPartners.map((p: any) => (
                <div
                  key={p.id}
                  className="group relative bg-white rounded-2xl border border-gray-100 p-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,45,98,0.1)] hover:-translate-y-2 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#002D62]/[0.02] rounded-bl-full transition-all duration-500 group-hover:bg-[#D32F2F]/5" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-[#002D62] flex items-center justify-center mb-8 shadow-lg shadow-[#002D62]/20 transition-transform duration-500 group-hover:rotate-[10deg]">
                      <Shield size={26} className="text-white" />
                    </div>
                    <h3 className="font-serif font-bold text-[#002D62] text-2xl mb-2 transition-colors duration-300 group-hover:text-[#D32F2F]">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D32F2F] bg-[#D32F2F]/5 px-3 py-1 rounded-full border border-[#D32F2F]/10">
                        {p.type}
                      </span>
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">{p.country}</span>
                    </div>
                    <div 
                      className="prose prose-sm max-w-none text-gray-500 text-sm leading-relaxed flex-1 mb-8"
                      dangerouslySetInnerHTML={{ __html: getField(p, 'description') }}
                    />
                    {p.href && p.href !== "#" && (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#002D62] hover:text-[#D32F2F] transition-all duration-300 group/link"
                      >
                        {t.visitSite}
                        <ExternalLink size={14} className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
               <p className="text-gray-400 italic font-serif">En attente de nouveaux partenaires institutionnels...</p>
            </div>
          )}
        </div>
      </section>

      {/* Collaborateurs Section */}
      <section className="py-24 bg-[#F8F6F2] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="inline-block text-[#002D62] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Terrain & Proximité
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#002D62] leading-tight">
                {t.collaboratorsTitle}
              </h2>
            </div>
          </div>

          {collaborators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {collaborators.map((p: any) => (
                <div 
                  key={p.id} 
                  className="flex flex-col sm:flex-row items-center gap-6 bg-white rounded-xl p-6 border border-white transition-all duration-300 hover:shadow-xl group"
                >
                  <div className="w-20 h-20 shrink-0 rounded-full bg-[#F8F6F2] flex items-center justify-center border border-gray-100 transition-colors duration-500 group-hover:bg-[#002D62]/5">
                    <Handshake size={30} className="text-[#002D62]/40 group-hover:text-[#D32F2F] transition-colors" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                      <h3 className="font-serif font-bold text-[#002D62] text-xl transition-colors group-hover:text-[#D32F2F]">{p.name}</h3>
                      <span className="text-[10px] font-bold text-[#002D62]/40 border border-[#002D62]/10 px-2 py-0.5 rounded uppercase">{p.country}</span>
                    </div>
                    <div 
                      className="prose prose-sm max-w-none text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4"
                      dangerouslySetInnerHTML={{ __html: getField(p, 'description') }}
                    />
                    {p.href && p.href !== "#" && (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#002D62] hover:text-[#D32F2F] transition-colors uppercase tracking-widest">
                        {t.visitSite} <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white/50 rounded-xl border border-gray-200 border-dashed">
               <p className="text-gray-400 italic font-serif">Aucun collaborateur opérationnel répertorié.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Banner / Dynamic Stats */}
      {stats.length > 0 && (
        <section className="py-16 bg-[#002D62] border-y border-white/5 relative overflow-hidden">
          {/* Subtle light effect */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-wrap justify-around gap-12 text-center">
              {stats.map((s: any, i: number) => (
                <div key={s.id || i} className="space-y-2 group">
                  <div className="text-4xl md:text-5xl font-bold text-white font-serif transition-transform duration-500 group-hover:scale-110 group-hover:text-blue-200">
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-white/60 font-bold max-w-[150px] mx-auto leading-tight">
                    {getField(s, 'label')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[#002D62] transition-transform origin-left duration-700 skew-x-[-12deg] translate-x-[70%]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-white rounded-3xl p-12 md:p-20 shadow-2xl border border-gray-100 flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-[#D32F2F] mb-10" />
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-[#002D62] mb-6 leading-tight">
              {t.becomePartner}
            </h3>
            <p className="text-gray-500 mb-10 text-lg max-w-2xl leading-relaxed">
              {t.becomeText}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="group relative inline-flex items-center gap-3 bg-[#002D62] hover:bg-[#D32F2F] text-white font-bold text-sm uppercase tracking-widest px-10 py-5 rounded-full transition-all duration-500 overflow-hidden shadow-xl"
            >
              <span className="relative z-10">{t.contactUs}</span>
              <Users size={18} className="relative z-10 transition-transform group-hover:scale-125" />
              <div className="absolute inset-0 bg-[#D32F2F] transition-transform duration-500 translate-y-full group-hover:translate-y-0" />
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}
