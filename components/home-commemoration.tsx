import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { getCommemorationSection, getMediaUrl } from "@/lib/api"

interface HomeCommemorationProps {
  lang?: string;
}

export default async function HomeCommemoration({ lang = 'fr' }: HomeCommemorationProps) {
  const data = await getCommemorationSection();
  
  if (!data || !data.title) return null;

  const getField = (obj: any, field: string) => {
    if (lang === 'fr') return obj[field]
    const translated = obj[`${field}_${lang}`]
    return translated || obj[field]
  }

  const t = {
    badge: lang === 'en' ? 'Annual Commemoration' : lang === 'es' ? 'Conmemoración anual' : 'Commémoration annuelle',
    program: lang === 'en' ? 'Full program' : lang === 'es' ? 'Programa completo' : 'Programme complet',
    history: lang === 'en' ? 'History of the massacre' : lang === 'es' ? 'La historia de la masacre' : 'L\'histoire du massacre',
    nextCommemoration: lang === 'en' ? 'Next Commemoration' : lang === 'es' ? 'Próxima conmemoración' : 'Prochaine commémoration',
    ctaDesc: lang === 'en' 
      ? 'Be present to honor the victims and support the survivors.'
      : lang === 'es'
      ? 'Estad presentes para honrar a las víctimas y apoyar a los sobrevivientes.'
      : 'Soyez présents pour rendre hommage aux victimes et soutenir les rescapés.',
    participate: lang === 'en' ? 'I will participate' : lang === 'es' ? 'Participaré' : 'Je participe',
  }

  return (
    <section className="relative py-24 overflow-hidden">
      <Image
        src={getMediaUrl(data.image) || "/images/commemoration.jpg"}
        alt={getField(data, 'title')}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#002D62]/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="text-white max-w-xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D32F2F] bg-white/10 px-3 py-1 rounded-full mb-4">
            {t.badge}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance leading-tight mb-5">
            {getField(data, 'title')}
          </h2>
          <div 
            className="prose prose-invert prose-sm max-w-none text-white/75 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: getField(data, 'description') }}
          />
          <div className="flex flex-col sm:flex-row gap-5 text-sm text-white/80 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#D32F2F]" />
              <span>{getField(data, 'date_text')}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#D32F2F]" />
              <span>{getField(data, 'location')}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${lang}/commemorations`}
              className="bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded transition-colors text-center"
            >
              {t.program}
            </Link>
            <Link
              href={`/${lang}/massacre`}
              className="border border-white/50 hover:border-white text-white font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded transition-colors text-center"
            >
              {t.history}
            </Link>
          </div>
        </div>

        {/* Countdown-style card */}
        <div className="bg-white rounded-lg p-8 text-center shadow-2xl min-w-64">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-2">
            {t.nextCommemoration}
          </p>
          <div className="font-serif text-[#002D62] mb-1">
            <p className="text-5xl font-bold">{data.countdown_day}</p>
            <p className="text-xl font-semibold">{getField(data, 'countdown_month_year')}</p>
          </div>
          <div className="h-px bg-border my-4" />
          <p className="text-muted-foreground text-xs leading-relaxed mb-5">
            {t.ctaDesc}
          </p>
          <Link
            href={`/${lang}/commemorations`}
            className="block w-full bg-[#002D62] hover:bg-[#001a3d] text-white text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors"
          >
            {t.participate}
          </Link>
        </div>
      </div>
    </section>
  )
}
