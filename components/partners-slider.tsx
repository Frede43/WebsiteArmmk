import { fetchAPI, getMediaUrl } from "@/lib/api";
import { Shield } from "lucide-react";

export default async function PartnersSlider({ lang = 'fr' }: { lang: string }) {
  const partners = await fetchAPI('/partners/') || [];
  
  // On ne prend que les partenaires institutionnels pour le slider principal
  // Et on double la liste pour l'effet de défilement infini
  const sliderPartners = [...partners, ...partners];

  if (partners.length === 0) return null;

  const t = {
    title: lang === 'en' ? 'Our Strategic Partners' : lang === 'es' ? 'Nuestros Socios Estratégicos' : 'Nos Partenaires Stratégiques',
  }

  return (
    <section className="py-12 bg-white border-t border-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2">{t.title}</h2>
        <div className="w-10 h-0.5 bg-[#D32F2F] mx-auto" />
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {sliderPartners.map((p: any, i: number) => (
            <div 
              key={`${p.id}-${i}`} 
              className="mx-10 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-40 hover:opacity-100"
            >
              {p.image ? (
                <img 
                  src={getMediaUrl(p.image)} 
                  alt={p.name} 
                  className="h-12 md:h-16 w-auto object-contain"
                />
              ) : (
                <div className="flex items-center gap-3">
                  <Shield size={24} className="text-[#002D62]" />
                  <span className="font-serif font-bold text-[#002D62] text-sm">{p.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
