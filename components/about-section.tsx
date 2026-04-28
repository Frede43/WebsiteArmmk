import { Shield, Eye, Target } from "lucide-react"

const pillars = [
  {
    icon: Shield,
    title: "Mission",
    description:
      "Assurer le plaidoyer auprès des survivants et surveiller toutes les activités engagées dans la résolution des défis auxquels font face les survivants.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "Être une organisation de référence nationale et internationale sur les questions de prévention du génocide, de préservation de la mémoire du génocide, et de lutte contre toute idéologie génocidaire.",
  },
  {
    icon: Target,
    title: "Objectifs",
    description:
      "Nos axes principaux : la consolidation de la paix, le soutien aux survivants du génocide, la préservation de la mémoire et la promotion de la réconciliation nationale.",
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[var(--gold)] font-sans text-xs uppercase tracking-[0.3em] font-semibold">
            Qui sommes-nous
          </span>
          <h2 className="font-serif text-foreground text-3xl md:text-4xl font-bold mt-3 text-balance">
            À propos d&apos;IBUKA
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-0.5 bg-[var(--gold)]" />
            <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
            <div className="w-12 h-0.5 bg-[var(--gold)]" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group bg-card border border-border rounded-sm p-8 hover:border-[var(--gold)] transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-[var(--navy)] rounded-sm mb-6 group-hover:bg-[var(--gold)] transition-colors duration-300">
                <pillar.icon
                  size={22}
                  className="text-[var(--gold)] group-hover:text-[var(--navy)] transition-colors duration-300"
                />
              </div>
              <h3 className="font-serif text-foreground text-xl font-bold mb-3">
                {pillar.title}
              </h3>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Themes banner */}
        <div className="mt-16 bg-[var(--navy)] rounded-sm px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[var(--gold)] font-sans text-xs uppercase tracking-[0.3em] font-semibold mb-1">
              Nos thèmes prioritaires
            </p>
            <h3 className="text-white font-serif text-xl md:text-2xl font-bold">
              Ensemble pour ne jamais oublier
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              "Consolidation de la paix",
              "Soutien aux survivants",
              "Mémoire du génocide",
              "Prévention",
              "Réconciliation",
            ].map((theme) => (
              <span
                key={theme}
                className="border border-[var(--gold)]/50 text-white/80 text-xs font-sans px-4 py-2 rounded-sm hover:bg-[var(--gold)]/10 transition-colors"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
