import { fetchAPI, getMediaUrl } from "@/lib/api";
import { Shield } from "lucide-react";

export default async function PartnersSlider({ lang = 'fr' }: { lang: string }) {
  const partners = await fetchAPI('/partners/') || [];
  
  if (partners.length === 0) return null;

  // Pour un effet de défilement infini fluide, surtout sur mobile avec peu de partenaires,
  // on répète la liste plusieurs fois pour remplir l'espace.
  const repetitions = partners.length < 5 ? 4 : 2;
  const sliderPartners = Array(repetitions).fill(partners).flat();

  const t = {
    title: lang === 'en' ? 'Our Strategic Partners' : lang === 'es' ? 'Nuestros Socios Estratégicos' : 'Nos Partenaires Stratégiques',
  }

  return (
    <section className="py-12 bg-white border-t border-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-2">{t.title}</h2>
        <div className="w-10 h-0.5 bg-[#D32F2F] mx-auto" />
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* Le conteneur doit avoir une hauteur minimale pour éviter de disparaître sur mobile */}
        <div className="animate-marquee whitespace-nowrap flex items-center min-h-[80px]">
          {sliderPartners.map((p: any, i: number) => (
            <div 
              key={`${p.id}-${i}`} 
              className="mx-6 md:mx-12 shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-50 hover:opacity-100"
            >
              {p.image ? (
                <img 
                  src={getMediaUrl(p.image)} 
                  alt={p.name} 
                  className="h-10 md:h-16 w-auto object-contain max-w-[120px] md:max-w-none"
                />
              ) : (
                <div className="flex items-center gap-2 md:gap-3 px-4 py-2 rounded-lg bg-gray-50/50 border border-gray-100">
                  <Shield size={18} className="text-[#002D62] md:w-6 md:h-6" />
                  <span className="font-serif font-bold text-[#002D62] text-xs md:text-sm whitespace-nowrap">{p.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
