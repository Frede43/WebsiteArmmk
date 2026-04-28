import { getStats } from "@/lib/api"

export default async function StatsBanner() {
  const stats = await getStats();
  return (
    <section className="bg-[#001a3d] py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D32F2F] to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-6">
        {stats.map((s: any) => (
          <div key={s.label} className="text-center group transition-transform duration-500 hover:scale-105">
            <p className="font-serif text-4xl sm:text-5xl font-bold text-[#D32F2F] drop-shadow-[0_2px_10px_rgba(211,47,47,0.2)] mb-2">
              {s.value}
            </p>
            <div className="h-0.5 w-8 bg-white/10 mx-auto mb-3 group-hover:w-12 group-hover:bg-[#D32F2F] transition-all duration-500" />
            <p className="text-white font-bold text-xs uppercase tracking-widest">{s.label}</p>
            <p className="text-white/40 text-[10px] mt-1.5 font-medium">{s.sub || "Donnée vérifiée"}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
