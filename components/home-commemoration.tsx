import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { getCommemorationSection, getMediaUrl } from "@/lib/api"

export default async function HomeCommemoration() {
  const data = await getCommemorationSection();
  
  if (!data || !data.title) return null;

  return (
    <section className="relative py-24 overflow-hidden">
      <Image
        src={getMediaUrl(data.image) || "/images/commemoration.jpg"}
        alt={data.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#002D62]/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="text-white max-w-xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#D32F2F] bg-white/10 px-3 py-1 rounded-full mb-4">
            Commémoration annuelle
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-balance leading-tight mb-5">
            {data.title}
          </h2>
          <p className="text-white/75 leading-relaxed mb-6">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 text-sm text-white/80 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#D32F2F]" />
              <span>{data.date_text}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#D32F2F]" />
              <span>{data.location}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/commemorations"
              className="bg-[#D32F2F] hover:bg-red-700 text-white font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded transition-colors text-center"
            >
              Programme complet
            </Link>
            <Link
              href="/massacre"
              className="border border-white/50 hover:border-white text-white font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded transition-colors text-center"
            >
              L&apos;histoire du massacre
            </Link>
          </div>
        </div>

        {/* Countdown-style card */}
        <div className="bg-white rounded-lg p-8 text-center shadow-2xl min-w-64">
          <p className="text-xs font-bold uppercase tracking-widest text-[#D32F2F] mb-2">
            Prochaine commémoration
          </p>
          <div className="font-serif text-[#002D62] mb-1">
            <p className="text-5xl font-bold">{data.countdown_day}</p>
            <p className="text-xl font-semibold">{data.countdown_month_year}</p>
          </div>
          <div className="h-px bg-border my-4" />
          <p className="text-muted-foreground text-xs leading-relaxed mb-5">
            Soyez présents pour rendre hommage aux victimes et soutenir les rescapés.
          </p>
          <Link
            href="/commemorations"
            className="block w-full bg-[#002D62] hover:bg-[#001a3d] text-white text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors"
          >
            Je participe
          </Link>
        </div>
      </div>
    </section>
  )
}
