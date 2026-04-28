import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Heart, Shield, Scale, Handshake } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageShell from "@/components/page-shell"
import { fetchAPI, getMediaUrl } from "@/lib/api"
import { TeamCarousel } from "@/components/team-carousel"



const iconMap: Record<string, any> = { Heart, Scale, Handshake, Shield }

export default async function AProposPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const activeLang = lang as 'fr' | 'en' | 'es'
  const values = await fetchAPI('/values/') || [];
  const team = await fetchAPI('/team/') || [];
  const config = await fetchAPI('/config/');

  const getField = (obj: any, field: string) => {
    if (!obj) return ""
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const t = {
    title: lang === 'en' ? 'About ARMMK' : lang === 'es' ? 'Sobre ARMMK' : 'À propos de l\'ARMMK',
    breadcrumb: lang === 'en' ? 'About' : lang === 'es' ? 'Sobre nosotros' : 'À propos',
    historyBadge: lang === 'en' ? 'Our history' : lang === 'es' ? 'Nuestra historia' : 'Notre histoire',
    massacreLink: lang === 'en' ? 'History of the massacre' : lang === 'es' ? 'La historia de la masacre' : 'L\'histoire du massacre',
    foundedBadge: lang === 'en' ? 'Founded in 2007 · Fizi, South Kivu, DRC' : lang === 'es' ? 'Fundada en 2007 · Fizi, Kivu del Sur, RDC' : 'Fondée en 2007 · Fizi, Sud-Kivu, RDC',
    missionTitle: lang === 'en' ? 'Our Mission' : lang === 'es' ? 'Nuestra Misión' : 'Notre Mission',
    visionTitle: lang === 'en' ? 'Our Vision' : lang === 'es' ? 'Nuestra Visión' : 'Notre Vision',
    valuesBadge: lang === 'en' ? 'What we believe in' : lang === 'es' ? 'En lo que creemos' : 'Ce en quoi nous croyons',
    valuesTitle: lang === 'en' ? 'Our values' : lang === 'es' ? 'Nuestros valores' : 'Nos valeurs',
    teamBadge: lang === 'en' ? 'The people behind the association' : lang === 'es' ? 'Las personas detrás de la asociación' : 'Les personnes derrière l\'association',
    teamTitle: lang === 'en' ? 'Our office' : lang === 'es' ? 'Nuestra oficina' : 'Notre bureau',
    defaultShort: lang === 'en' 
      ? "Founded in 2007 by survivors, the Association of Survivors of the Makobola Massacres acts for memory, justice, and reconciliation in Fizi, South Kivu."
      : lang === 'es'
      ? "Fundada en 2007 por sobrevivientes, la Asociación de Sobrevivientes de las Masacres de Makobola actúa por la memoria, la justicia y la reconciliación en Fizi, Kivu del Sur."
      : "Fondée en 2007 par des rescapés, l'Association des Rescapés des Massacres de Makobola agit pour la mémoire, la justice et la réconciliation à Fizi, Sud-Kivu.",
    defaultMission: lang === 'en'
      ? "Preserve the memory of the victims of the Makobola massacre, defend the rights of survivors, support orphans, and promote lasting inter-ethnic reconciliation within the communities of Fizi, South Kivu, so that such crimes never happen again."
      : lang === 'es'
      ? "Preservar la memoria de las víctimas de la masacre de Makobola, defender los derechos de los sobrevivientes, apoyar a los huérfanos y promover una reconciliación interétnica duradera dentro de las comunidades de Fizi, Kivu del Sur, para que tales crímenes nunca vuelvan a ocurrir."
      : "Préserver la mémoire des victimes du massacre de Makobola, défendre les droits des rescapés, accompagner les orphelins et promouvoir la réconciliation inter-ethnique durable au sein des communautés de Fizi, Sud-Kivu, pour que de tels crimes ne se reproduisent jamais.",
    defaultVision: lang === 'en'
      ? "A Fizi territory where all communities coexist in peace, where the memory of the massacres is recognized and taught, and where survivors and orphans live in dignity, supported by a strong civil society and an effective rule of law."
      : lang === 'es'
      ? "Un territorio de Fizi donde todas las comunidades conviven en paz, donde se reconoce y enseña la memoria de las masacres, y donde los sobrevivientes y huérfanos viven con dignidad, apoyados por una sociedad civil fuerte y un estado de derecho efectivo."
      : "Un territoire de Fizi où toutes les communautés cohabitent en paix, où la mémoire des massacres est reconnue et enseignée, et où les rescapés et orphelins vivent dans la dignité, soutenus par une société civile forte et un État de droit effectif.",
  }

  return (
    <>
      <PageShell
        title={t.title}
        subtitle={getField(config, 'about_text') || t.defaultShort}
        image={config?.about_history_image ? getMediaUrl(config.about_history_image) : "/images/about-armmk.jpg"}
        breadcrumbs={[{ label: t.breadcrumb }]}
      />

      {/* Histoire */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              {t.historyBadge}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62] mb-6 text-balance">
              {getField(config, 'about_history_title') || (lang === 'fr' ? "Née de la douleur, portée par la dignité" : "Born from pain, carried by dignity")}
            </h2>
            <div className="space-y-4 text-foreground/75 leading-relaxed text-sm">
              {getField(config, 'about_history_content') ? (
                <div dangerouslySetInnerHTML={{ __html: getField(config, 'about_history_content').replace(/\n/g, '<br/>') }} />
              ) : (
                <div className="space-y-4">
                  {lang === 'fr' ? (
                    <>
                      <p>Dans la nuit du 30 décembre 1998 au 2 janvier 1999, plus de 500 civils ont été massacrés à Makobola...</p>
                      <p>Face au silence et à l'oubli, un groupe de rescapés a fondé en 2007 l'ARMMK...</p>
                    </>
                  ) : (
                    <p>Default history content in {lang} placeholder...</p>
                  )}
                </div>
              )}
            </div>
            <Link
              href={`/${lang}/massacre`}
              className="mt-8 inline-flex items-center gap-2 bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded transition-colors"
            >
              {t.massacreLink} &rarr;
            </Link>
          </div>
          <div className="relative h-80 lg:h-[440px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src={config?.about_history_image ? getMediaUrl(config.about_history_image) : "/images/about-armmk.jpg"}
              alt="ARMMK"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#002D62]/80 to-transparent">
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest">
                {t.foundedBadge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#002D62] text-white rounded-lg p-10">
            <Target size={32} className="text-[#D32F2F] mb-5" />
            <h3 className="font-serif text-2xl font-bold mb-4">{t.missionTitle}</h3>
            <p className="text-white/75 leading-relaxed">
              {getField(config, 'mission_text') || t.defaultMission}
            </p>
          </div>
          <div className="bg-white border border-border rounded-lg p-10">
            <Eye size={32} className="text-[#D32F2F] mb-5" />
            <h3 className="font-serif text-2xl font-bold text-[#002D62] mb-4">{t.visionTitle}</h3>
            <p className="text-foreground/70 leading-relaxed">
              {getField(config, 'vision_text') || t.defaultVision}
            </p>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              {t.valuesBadge}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">{t.valuesTitle}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v: any) => {
              const Icon = iconMap[v.label] || Heart
              return (
                <div key={v.id || v.label} className="text-center p-6 border border-border rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[#002D62]/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-[#002D62]" />
                  </div>
                  <h4 className="font-serif font-bold text-[#002D62] text-base mb-2">{getField(v, 'label')}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{getField(v, 'desc')}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-16 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-3 block">
              {t.teamBadge}
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002D62]">{t.teamTitle}</h2>
          </div>
          <TeamCarousel team={team} lang={lang} />
        </div>
      </section>

      <Footer lang={lang} />
    </>
  )
}
